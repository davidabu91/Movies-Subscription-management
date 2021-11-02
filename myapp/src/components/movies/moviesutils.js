import axios from 'axios'

const herukoUrl = "https://cinema-ws.herokuapp.com/api/movies"

export function getAll() {
    return new Promise((resolve, reject) => {
        console.log("get movies list from movies db")
        axios(herukoUrl || 'http://localhost:9000/api/movies')
            .then(res => resolve(res.data))
            .catch(err => reject(err))

    })
}

export function get() {
    return new Promise((resolve, reject) => {

    })
}

export function add() {
    return new Promise((resolve, reject) => {

    })
}

export function deleteItem(id) {
    return new Promise((resolve, reject) => {
        console.log('delete item from movies db')
        axios.delete(herukoUrl || 'http://localhost:9000/api/movies/' + id)
            .then(res => console.log(res.data, "deleted"))
            .catch(err => console.log(err))
    })
}

export function edit() {
    return new Promise((resolve, reject) => {

    })
}