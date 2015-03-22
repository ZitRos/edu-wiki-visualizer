/**
 * Converts server output to Network input.
 * @constructor
 */
var Converter = function () {



};

/**
 * Prepares data for Network input.
 * @param {*} serverData - data got from server.
 */
Converter.prototype.parseVis = function (serverData) {

    var i;

    if (!serverData || !serverData.edges) {
        console.error("Unrecognised server data", serverData);
        return serverData;
    }

    for (i in serverData.edges) {
        serverData.edges[i]["label"] = serverData.edges[i]["CF"];
    }

    return serverData;

};