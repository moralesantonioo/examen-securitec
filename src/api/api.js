import axios from 'axios';
import { URL_API, HEADERS } from "./urlApi";

class apiService {
    getDataContacts(){
        return axios.get(`${URL_API}/contacts/clients/`, HEADERS)
    }

    getDetailsContact(){
        return axios.get(`${URL_API}/contacts/clients/2670/`, HEADERS)
    }

    getDataCellphone(){
        return axios.get(`${URL_API}/contacts/clients/2670/phones/`, HEADERS)
    }

    getDataAddresses(){
        return axios.get(`${URL_API}/contacts/clients/2670/addresses/`, HEADERS)
    }
}

export default new apiService()