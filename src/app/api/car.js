
import Api from "../utils/axios/axios";

export const saveCar = async (car_model, price, phone, city, pictures) => {
    console.log(`savecar model, price, phone, selectedCity`, car_model, price, phone, city, pictures);
    try {
        return await Api.post(
            "/car/add",
            {
                car_model,
                price,
                phone,
                city,
                pictures
            }
        ).then(response => {
            return response;
        })
            .catch(error => {
                return error;
            });
    } catch (error) {
        console.log(error);
    }
}
