import axios from "axios";
import { postLoginEndpoint } from "@/helpers/constants";

export async function signIn(username, password) {
    const res = await axios.post(postLoginEndpoint,
    {
        username,
        password
    },
    {
        headers: {
        'Content-Type': 'application/json'
        }
    })

    return res;
}