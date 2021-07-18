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

const getParticipant = (roomId, participantId) => {
    return new Promise((resolve, reject) => axios.get(`/rooms/${roomId}/participants/${participantId}`).then(resp => resolve(resp.data)).catch(reject))
}

const concludeRoom = (id, password) => {
    return new Promise((resolve, reject) => axios.post(`/rooms/${id}/conclude`, {password}).then(resp => resolve(resp.data)).catch(reject))
}

const restartRoom = (id, password) => {
    return new Promise((resolve, reject) => axios.post(`/rooms/${id}/restart`, {password}).then(resp => resolve(resp.data)).catch(reject))
}

const castVote = (roomId, participantId, vote) => {
    return new Promise((resolve, reject) => axios.post(`/rooms/${roomId}/participants/${participantId}/vote`, {vote}).then(resp => resolve(resp.data)).catch(reject))
}

export {getRoom, createRoom, joinRoom, castVote, concludeRoom, restartRoom, getParticipant}
