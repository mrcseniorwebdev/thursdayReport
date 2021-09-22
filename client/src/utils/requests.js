import axios from 'axios'

export const appLogout = async () => {
    try {
        const response = await axios.get('/auth/logout')
        return response
    }
    catch (error) {
        console.log(error)
        return 0
    }
}

export const generateReport = async (Data) => {
    try {
        const response = await axios.post('https://0f60-8-18-52-2.ngrok.io/api/report', Data)
        return response
    }
    catch (error) {
        console.log(error)
        return 0
    }
}