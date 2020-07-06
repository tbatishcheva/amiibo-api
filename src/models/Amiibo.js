class Amiibo {
    /**
     * @type {string}
     */
    amiiboSeries;

    /**
     * @type {string}
     */
    character;

    /**
     * @type {string}
     */
    gameSeries;

    /**
     * @type {string}
     */
    head;

    /**
     * @type {string}
     */
    image;

    /**
     * @type {string}
     */
    name;

    /**
     * @type {Object.<string, string>}
     */
    release;

    /**
     * @type {string}
     */
    tail;

    /**
     * @type {string}
     */
    type;

    /**
     * @param {string} amiiboSeries
     * @param {string} character
     * @param {string} gameSeries
     * @param {string} head
     * @param {string} image
     * @param {string} name
     * @param {Object.<string, string>} release
     * @param {string} tail
     * @param {string} type
     */
    constructor({amiiboSeries,
                    character,
                    gameSeries,
                    head,
                    image,
                    name,
                    release,
                    tail,
                    type
    }) {
        this.amiiboSeries = amiiboSeries;
        this.character = character;
        this.gameSeries = gameSeries;
        this.head = head;
        this.image = image;
        this.name = name;
        this.release = release;
        this.tail = tail;
        this.type = type;
    }
}
