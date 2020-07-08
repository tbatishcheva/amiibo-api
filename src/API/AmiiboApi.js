export default class AmiiboApi {
    fetchAmiibos() {
        return fetch('https://www.amiiboapi.com/api/amiibo/?amiiboSeries=Animal%20Crossing')
            .then(response => response.json());
    }
}
