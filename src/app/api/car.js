
import Api from "../utils/axios/axios";

export const saveCar = async (formData) => {
    console.log(`saveCar formData:`, formData);

    try {
        const response = await Api.post("/car/add", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return response;
    } catch (error) {
        console.error('Error saving car:', error);
        throw error;
    }
};
