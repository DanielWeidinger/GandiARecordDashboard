import axios from 'axios';
import config, { getRoute } from './config'

axios.defaults.headers.common['Authorization'] = config.API_KEY


export const getAllARecords = (cb) => {
    axios.get(getRoute("records"), {
        params: {
            "rrset_type": "A"
        }
    })
    .then((res) => cb(res))
    .catch(e => console.log(e))
}

export const addARecord = (record, cb) => {
    axios.post(getRoute("records"), 
        {
           "rrset_name": record.name,
           "rrset_type": "A",
           "rrset_values": record.values
        })
    .then((res) => cb(res, null))
    .catch(e => cb(null, e))
}

export const updateARecord = (record, cb) => {
    axios.put(getRoute("records/" + record.name), {
        "items": [
            {
            "rrset_type": "A",
            "rrset_values": record.values
            }
        ]
    })
    .then((res) => cb(res, null))
    .catch(e => cb(null, e))
}

export const deleteARecord = (record, cb) => {
    axios.delete(getRoute("records/" + record.name))
    .then((res) => cb(res, null))
    .catch(e => cb(null, e))
}
