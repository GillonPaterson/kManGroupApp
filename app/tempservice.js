const NodeCache = require("node-cache");
const myCache = new NodeCache();
const axios = require('axios').default;

exports.editJobRole = async(ID, role) => {
    try {
        console.log(role)
        const response = await axios.post('http://localhost:8080/api/editJobRole/' + ID, role);
        return response.data
    } catch (error) {
        return -1;
    }
}