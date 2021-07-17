import axios from "axios";

const getRoom = (id) => {
    return new Promise((resolve, reject) => axios.get(`/rooms/${id}`).then(resp => resolve(resp.data)).catch(reject))
}

const createRoom = (name, password) => {
    return new Promise((resolve, reject) => axios.post('/rooms', {name, password}).then(resp => resolve(resp.data)).catch(reject))
}

const joinRoom = (id, name) => {
    return new Promise((resolve, reject) => axios.post(`/rooms/${id}/join`, {name}).then(resp => resolve(resp.data)).catch(reject))
}

export {getRoom, createRoom, joinRoom}
