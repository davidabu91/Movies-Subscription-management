import axios from 'axios';
import { herukoStartUrl, localStartsUrl, herukoDestroyUrl, localdestroyUrl, localCinemaWSUrl, herukoCinemaWSUrl } from './webServicesUrls';

function startData(key) {
    return new Promise((resolve, reject) => {
        axios.post(`${herukoStartUrl}/${key}` || `${localStartsUrl}/${key}`)
            .then(res => resolve(res.data))
            .catch(err => reject(err))
    })
}

function destroyData(key) {
    return new Promise((resolve, reject) => {
        axios.delete(`${herukoDestroyUrl}/${key}` || `${localdestroyUrl}/${key}`)
            .then(res => {
                resolve(res.data);
                startData(key);
            })
            .catch(err => reject(err))
    })

}

async function checkData(key) {
    let res = await axios(`${herukoCinemaWSUrl}/${key}` || `${localCinemaWSUrl}/${key}`)
    if (res.status === 200 && res.data.length > 0) {
        return true;
    } else if (res.status !== 200) {
        return res.status;
    } else {
        return false;
    }
}

export async function initialDataApp() {
    let dataMembers = await checkData('members');
    let dataMovies = await checkData('movies');

    console.log(dataMembers);
    console.log(dataMovies);

    dataMembers ? destroyData('members') : startData('members');
    dataMovies ? destroyData('movies') : startData('movies');
}