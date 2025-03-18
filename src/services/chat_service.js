import apiClient from "./apiClient";

export const getUserQueryAnswer = async (request_body) => {
    try {
        const response = await apiClient.post('/api/ai/ai_chat', request_body)
        if (response.status === 200){
            const query_answer = await response.data
            return query_answer
        }
        else {
            throw new Error("Failed to fetch the answer");
        }
    }
    catch (error) {
        throw error
    }
}