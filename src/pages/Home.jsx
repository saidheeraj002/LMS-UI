import React, {useState, useEffect} from 'react';
import Header from './Header';
import Footer from './Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareRootVariable, faAtom, faFlask } from '@fortawesome/free-solid-svg-icons';
import { getLogedInUserDetails, getClassSubjectDetails } from '../services/home_page_service';
import apiClient from '../services/apiClient';
import { useNavigate } from 'react-router-dom';


function HomePage({ token, onLogout }) {
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);  

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const userData = await getLogedInUserDetails();
        setData(userData);
      }
      catch(error) {
        setError("An Error occured.");
        console.error("Fetch Error:", error);
      }
      finally {
        setLoading(false);
      }
    }; fetchData();
  }, [token]);

  const handleStartChat = (subject) => {
    if (!selectedTopic) {
      alert("Please select the topic of a subject before starting chat.")
      return;
    }
    setSelectedSubject(subject);
    console.log("selectedSubject", selectedSubject);
    console.log("selectedTopic", selectedTopic);
    navigate(`/chat?subject=${encodeURIComponent(JSON.stringify(subject))}&topic=${encodeURIComponent(selectedTopic)}`);
  };

  const handleTopicChange = (event) => {
    setSelectedTopic(event.target.value);
  };


  return (
    <div className="h-full text-base-content">
      <div id="root" className="flex flex-col min-h-screen bg-neutral-50">
        <Header onLogout={onLogout} token={token} data={data} />
        <main id="main" className="container mx-auto px-4 py-8 flex-grow">
        <section id="welcome" className="mb-12">
            <h1 className="text-3xl mb-4">Welcome {data?.username}</h1>
            <p className='text-neutral-600'>Class: {data?.grade}</p>
            <p className="text-neutral-600 mb-8">
              Select a Topic from the subjects listed and start learning
            </p>
          </section>
          {/* <section id="class-selection" className="mb-12">
            <h2 className="text-2xl mb-6">Select Your Class</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg border hover:shadow-lg transition">
                <h3 className="text-xl mb-2">Class 9</h3>
                <p className="text-neutral-600 mb-4">Foundation for higher education</p>
                <button className="w-full bg-neutral-900 text-white py-2 rounded-md">
                  Select
                </button>
              </div>
              <div className="bg-white p-6 rounded-lg border hover:shadow-lg transition">
                <h3 className="text-xl mb-2">Class 10</h3>
                <p className="text-neutral-600 mb-4">Prepare for board exams</p>
                <button className="w-full bg-neutral-900 text-white py-2 rounded-md">
                  Select
                </button>
              </div>
              <div className="bg-white p-6 rounded-lg border hover:shadow-lg transition">
                <h3 className="text-xl mb-2">Class 11</h3>
                <p className="text-neutral-600 mb-4">Advanced concepts</p>
                <button className="w-full bg-neutral-900 text-white py-2 rounded-md">
                  Select
                </button>
              </div>
            </div>
          </section> */}
          <section id="subject-selection" className="mb-12">
            <h2 className="text-2xl mb-6">Available Subjects</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data && data.subjects.map((subject, subjectIndex) => (
              <div key={subjectIndex} className="bg-white p-6 rounded-lg border hover:shadow-lg transition">
                <div className="flex items-center mb-4">
                  <FontAwesomeIcon icon={faSquareRootVariable} className="text-2xl mr-3" />
                  <h3 className="text-xl">{subject.title}</h3>
                </div>
                <p className="text-neutral-600 mb-4">{subject.description}</p>
                <div className='mb-4'>
                  <select className='w-full p-2 border rounded-md bg-white' onChange={handleTopicChange}>
                    <option>Select Topic</option>
                    {subject.topics.map((topic, topicIndex) => (
                      <option key={topicIndex} value={topic}>{topic}</option>
                    ))}
                  </select>
                </div>
                <button className="w-full bg-neutral-900 text-white py-2 rounded-md" onClick={() => handleStartChat(subject.title)}>Start Chat</button>
              </div>
            ))}
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default HomePage;

