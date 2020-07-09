const MAIN_URL = 'https://www.amiiboapi.com/api/';

export default class AmiiboApi {
    fetchAmiibos() {
        return fetch(`${MAIN_URL}amiibo/?amiiboSeries=Animal%20Crossing`)
            .then(response => response.json());
    }

    fetchGameSeries() {
        return fetch(`${MAIN_URL}gameseries`)
            .then(response => response.json());
    }
}
