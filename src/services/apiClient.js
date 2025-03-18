// src/services/apiClient.js
import axios from 'axios';
import Cookies from 'js-cookie';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers['Content-Type'] = "application/json";
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// apiClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     console.log("Full Error Object:", error); // Add this line
//     if (error.response) {
//         console.log("Backend Error Response:", error.response.data); // Add this line
//         if (error.response.data && error.response.data.status_code === 401 && error.response.data.response === "Token has Expired") {
//             console.log("The Token Got Expired.")
//             Cookies.remove('authToken');
//             window.location.href = '/?tokenExpired=true'; // Redirect with query parameter
//             return Promise.reject(error);
//         }
//     }
//     return Promise.reject(error);
//   }
// );

apiClient.interceptors.response.use(
    (response) => {
      if (response.data && response.data.status_code === 401) {
        Cookies.remove('authToken');
        window.location.href = '/?tokenExpired=true';
        return Promise.reject({ response: response }); // Reject with the response
      }
      return response;
    },
    (error) => {
      return Promise.reject(error); // Pass other errors through
    }
  );
  

export default apiClient;