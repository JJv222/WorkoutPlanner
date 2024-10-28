import axios from "axios";
import { API_BASE_URL } from "../../utils/constants";

export async function fetchData(expointUrl: string, params = {}) {
    try{
        const response = await axios.get(API_BASE_URL + expointUrl,{params});
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}