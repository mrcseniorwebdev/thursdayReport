import Axios from 'axios'

const axios = Axios.create({
    withCredentials: true
})

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

export const getUsers = async () => {
    try {
        const response = await axios.get(`/api/user`)
        return response
    }
    catch (err) {
        if (err.response.status === 401) {
            window.location.href = '/login'

        }
        console.error(err)
        return 0
    }
}
export const postUsers = async (data) => {
    try {
        const response = await axios.post(`/api/user`, data)
        return response
    }
    catch (err) {
        if (err.response.status === 401) {
            window.location.href = '/login'

        }
        console.error(err)
        return 0
    }
}
export const deleteUsers = async (id) => {
    try {
        const response = await axios.delete(`/api/user/${id}`)
        return response
    }
    catch (err) {
        if (err.response.status === 401) {
            window.location.href = '/login'

        }
        console.error(err)
        return 0
    }
}