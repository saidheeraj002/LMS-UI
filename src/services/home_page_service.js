import apiClient from "./apiClient";

export const getLogedInUserDetails = async () => {
    try {
        const response = await apiClient.get('/api/general_endpoints/home_data')   
        if (response.status === 200) {
            const user_result = await response.data;
            console.log("user_result", user_result)
            return user_result
          }
          else {
              throw new Error('Failed to fetch data.');
          }
    }
    catch (error) {
        throw error
    }
};

export const getClassSubjectDetails = async(grade) => {
    console.log("grade", grade);
    try {
        const response = await apiClient.get(`/api/subjects/class_subjects_list/${grade}`)
        if (response.status === 200) {
            const subject_details = await response.data;
            return subject_details
        }
        else {
            throw new Error('Failed to fetch Data');
        }
    }
    catch (error) {
        throw error
    }
}
