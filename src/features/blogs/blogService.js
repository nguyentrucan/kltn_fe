import axios from "axios"
import { base_url, config } from "../../utils/axiosConfig";

const getBlogs = async () => {
    const response = await axios.get(`${base_url}blog/`);
    if (response.data) {
        return response.data
    }
}

const getBlog = async (_id) => {
    const response = await axios.get(`${base_url}blog/${_id}`);
    if (response.data) {
        return response.data
    }
}

export const blogService = {
    getBlogs,
    getBlog,
}