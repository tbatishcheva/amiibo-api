const MAIN_URL = 'https://www.amiiboapi.com/api/';

export default class AmiiboApi {
  fetchAmiibos() {
    return fetch(`${MAIN_URL}amiibo`)
      .then((response) => response.json())
      .catch();
  }

  /**
   * @param {string} params
   * @returns {Promise}
   */
  fetchAmiibosByParams(params) {
    return fetch(`${MAIN_URL}amiibo/?${params}`)
      .then((response) => response.json())
      .catch();
  }

  /**
   * @param {string} amiiboSeries
   * @returns {Promise}
   * */
  fetchAmiiboSeries(amiiboSeries) {
    return fetch(
      `${MAIN_URL}amiibo/?amiiboSeries=${amiiboSeries}`,
    )
      .then((response) => response.json())
      .catch();
  }

  /**
   * @param {string} gameseries
   * @returns {Promise}
   */
  fetchGameAmiiboSeries(gameseries) {
    return fetch(`${MAIN_URL}amiibo/?gameseries=${gameseries}`)
      .then((response) => response.json())
      .catch();
  }

  /**
   * @param {string} character
   * @returns {Promise}
   */
  fetchAmiiboByCharacter(character) {
    return fetch(`${MAIN_URL}amiibo/?character=${character}`)
      .then((response) => response.json())
      .catch();
  }

  fetchGameSeries() {
    return fetch(`${MAIN_URL}gameseries`)
      .then((response) => response.json())
      .catch();
  }

  fetchCharacters() {
    return fetch(`${MAIN_URL}character`)
      .then((response) => response.json())
      .catch();
  }
}
