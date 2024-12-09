import axios from "axios";
import { getProductsListEndpoint } from "@/helpers/constants";

export async function getAllProducts({ limit }) {
    const res = await axios.get(`${getProductsListEndpoint}?limit=${limit}`); 

    return res;
}