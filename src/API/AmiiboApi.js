const MAIN_URL = 'https://www.amiiboapi.com/api/';

export default class AmiiboApi {
    fetchAmiiboSeries(amiiboSeries) {
        return fetch(`${MAIN_URL}amiibo/?amiiboSeries=${amiiboSeries}`)
            .then(response => response.json())
            .catch();
    }

    fetchGameAmiiboSeries(gameseries) {
        return fetch(`${MAIN_URL}amiibo/?gameseries=${gameseries}`)
            .then(response => response.json())
            .catch();
    }

    fetchGameSeries() {
        return fetch(`${MAIN_URL}gameseries`)
            .then(response => response.json())
            .catch();
    }
}
