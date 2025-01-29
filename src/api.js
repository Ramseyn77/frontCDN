import axios from 'axios'

const API_BASE_URL =  'http://localhost:8000'

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type":"application/json"
    }
})

export const fetchData = async (endpoint) => {
    try {
        const response = await api.get(endpoint)
        return response.data
    } catch (error) {
        console.error('Erreur lors de la requète GET:, error')
        throw error
    }
}

export const postData = async (endpoint, data=null) => {
    if (data === null) {
        try {
            const response = await api.post(endpoint)
            return response
        } catch (error) {
            console.error('Erreur lors de la requète POST:, error')
            throw error
        }
    }else {
        try {
            const response = await api.post(endpoint, data, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
            })
            return response
        } catch (error) {
            console.error('Erreur lors de la requète GET:, error')
            throw error
        }
    }
}

export default api