import { useParams, useNavigate } from "react-router-dom";

const topicsData = {
  1: [{ id: 101, name: "Algebra" }, { id: 102, name: "Calculus" }, { id: 103, name: "Geometry" }],
  2: [{ id: 201, name: "Mechanics" }, { id: 202, name: "Optics" }],
  3: [{ id: 301, name: "Organic Chemistry" }, { id: 302, name: "Inorganic Chemistry" }],
};

const Topics = () => {
  const { subjectId } = useParams();
  const navigate = useNavigate();
  const topics = topicsData[subjectId] || [];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Select a Topic</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {topics.map((topic) => (
          <div
            key={topic.id}
            className="p-4 border rounded cursor-pointer hover:bg-gray-100"
            onClick={() => navigate(`/chat/${subjectId}/${topic.id}`)}
          >
            <h3 className="text-lg font-semibold">{topic.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Topics;
