/**
 * Main controller. Creates on page load.
 * @constructor
 * @container {HTMLElement}
 */
var Engine = function (container) {

    this.network = new Network(container);
    this.dataSource = new DataSource(this.getUrlFromAnchor() || "/test");
    this.converter = new Converter();

    this.init();

};

Engine.prototype.init = function () {

    var self = this,
        data, el = document.getElementById("headSubLabel");

    this.dataSource.requestData(function (error, serverData) {

        if (error) {
            console.error(error);
        } else {
            self.network.setup(data = self.converter.parseVis(serverData));
            if (el) el.textContent = "Количествово страниц: " + data.numberOfConnectedNodes;
        }

    });

};

/**
 * Return URL if found in anchor.
 * @returns {string}
 */
Engine.prototype.getUrlFromAnchor = function () {

    var url = location.hash.slice(1);

    if (location.hash[0] !== "#") return "";

    return url;

};