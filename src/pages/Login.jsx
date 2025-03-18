// import React from "react";
// import "@fortawesome/fontawesome-free/css/all.min.css"; // Import FontAwesome styles

// const LoginPage = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();
//   const handleLogin = (e) => { // Add 'e' for the event
//     e.preventDefault(); // Prevent default form submission
//     // Simulate login logic (replace with actual authentication)
//     // Here you would normally check credentials, etc.

//     navigate('/home');
//   };
//   return (
//     <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4 w-screen">
//       <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
//         {/* Logo Section */}
//         <div className="text-center">
//           <div className="flex justify-center mb-4">
//             <i className="fa-solid fa-graduation-cap text-4xl text-neutral-700"></i>
//           </div>
//           <h1 className="text-2xl text-neutral-900 mb-2">Learning Management System</h1>
//           <p className="text-neutral-600">Sign in to your account</p>
//         </div>

//         {/* Form Section */}
//         <form className="mt-8 space-y-6" onSubmit={handleLogin}>
//           <div className="space-y-4">
//             <div>
//               <label htmlFor="email" className="block text-sm text-neutral-700">
//                 Email address
//               </label>
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 required
//                 className="appearance-none block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500"
//               />
//             </div>
//             <div>
//               <label htmlFor="password" className="block text-sm text-neutral-700">
//                 Password
//               </label>
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 required
//                 className="appearance-none block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500"
//               />
//             </div>
//           </div>

//           {/* Remember Me & Forgot Password */}
//           <div className="flex items-center justify-between">
//             <div className="flex items-center">
//               <input
//                 id="remember-me"
//                 name="remember-me"
//                 type="checkbox"
//                 className="h-4 w-4 text-neutral-600 focus:ring-neutral-500 border-neutral-300 rounded"
//               />
//               <label htmlFor="remember-me" className="ml-2 block text-sm text-neutral-700">
//                 Remember me
//               </label>
//             </div>
//             <div className="text-sm">
//               <span className="text-neutral-600 hover:text-neutral-500 cursor-pointer">
//                 Forgot your password?
//               </span>
//             </div>
//           </div>

//           {/* Sign In Button */}
//           <div>
//             <button
//               type="submit"
//               className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm text-white bg-neutral-800 hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500"
//               >
//               Sign in
//             </button>
//           </div>
//         </form>

//         {/* Sign Up Link */}
//         <div className="text-center text-sm">
//           <p className="text-neutral-600">
//             Don't have an account?{" "}
//             <span className="text-neutral-800 hover:text-neutral-700 cursor-pointer">
//               Sign up
//             </span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import apiClient from '../services/apiClient';

function Login({setToken}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');


  const handleLogin = async (e) => { // Add 'e' for the event
    e.preventDefault(); // Prevent default form submission
    setError('');

    try {
      const login_response = await apiClient.post('/api/auth/login', { email, password });
      console.log("login_response", login_response);
      if (login_response.status === 200) {
        const access_token = login_response.data.access_token;
        setToken(access_token);
        navigate('/home');
      }
      else {
          throw new Error('Failed to fetch data.');
      }
    }
    catch (error) {
      throw error
    }

    // try {
    //   const response = await fetch('http://127.0.0.1:8000/api/auth/login', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ email, password }),
    //   });
    //   console.log("response", response);

    //   if (response.ok) {
    //     const data = await response.json();
    //     console.log("data", data)
    //     // setToken(data.access_token);
    //     // navigate('/home')
    //   }
    //   else {
    //     const errorData = await response.json();
    //     setError(errorData.message || 'Login Failed. Please check your credentials.');
    //   }
    // }
    // catch (err) {
    //   setError('An Error Occured during Login.');
    //   console.error('Login error:', err);
    // }
    // // navigate('/home');
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4  w-screen">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <FontAwesomeIcon icon={faGraduationCap} className="text-4xl text-neutral-700" />
          </div>
          <h1 className="text-2xl text-neutral-900 mb-2">Learning Management System</h1>
          <p className="text-neutral-600">Sign in to your account</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}> {/* Corrected event handler */}
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm text-neutral-700">Email address</label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm text-neutral-700">Password</label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div>
            <button
              type="submit" // Use 'submit' to trigger the form's onSubmit
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm text-white bg-neutral-800 hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;