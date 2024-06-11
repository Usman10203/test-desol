
import Api from "../utils/axios/axios";

export const saveCar = async (formData) => {
    console.log(`saveCar formData:`, formData); // Log for debugging

    try {
        const response = await Api.post("/car/add", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return response; // Assuming the response contains success/error data
    } catch (error) {
        console.error('Error saving car:', error);
        throw error; // Re-throw the error for proper handling in the calling code
    }
};
