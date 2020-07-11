const MAIN_URL = 'https://www.amiiboapi.com/api/';

export default class AmiiboApi {
    fetchAmiibos() {
        return fetch(`${MAIN_URL}amiibo`)
            .then(response => response.json())
            .catch();
    }

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

    fetchAmiiboByCharacter(character) {
        return fetch(`${MAIN_URL}amiibo/?character=${character}`)
            .then(response => response.json())
            .catch();
    }

    fetchGameSeries() {
        return fetch(`${MAIN_URL}gameseries`)
            .then(response => response.json())
            .catch();
    }

    fetchCharacters() {
        return fetch(`${MAIN_URL}character`)
            .then(response => response.json())
            .catch();
    }
}
