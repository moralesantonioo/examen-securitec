import axios from 'axios';
import { URL_API, HEADERS } from "./urlApi";

class apiService {
    getDataContacts(){
        return axios.get(`${URL_API}/contacts/clients/`, HEADERS)
    }

    getDetailsContact(){
        return axios.get(`${URL_API}/contacts/clients/2670/`, HEADERS)
    }
}

export default new apiService()