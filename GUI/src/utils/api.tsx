import axios from "axios";

export async function fetchData(expointUrl: string, params = {}) {
  try {
    const response = await axios.get(expointUrl, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function postData(expointUrl: string, data = {}) {
  try {
    const response = await axios.post(expointUrl, data);
    return response.data;
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
}
