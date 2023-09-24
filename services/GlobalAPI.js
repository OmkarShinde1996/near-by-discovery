const { default: axios } = require("axios");

const getNearbyPlaces = (value) => axios.get('/api/search-by-text?q='+value)

export default {
    getNearbyPlaces
}

