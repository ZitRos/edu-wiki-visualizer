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

    var i,
        theCoolestNode = undefined,
        connectedNodes = {},
        nodeCoolFactors = {
            "undefined": 0
        };

    if (!serverData || !serverData.edges) {
        console.error("Unrecognised server data", serverData);
        return serverData;
    }

    for (i in serverData.edges) {

        connectedNodes[serverData.edges[i]["from"]] = null;
        connectedNodes[serverData.edges[i]["to"]] = null;

        // determine the coolest node
        if (!nodeCoolFactors.hasOwnProperty(serverData.edges[i]["from"]))
            nodeCoolFactors[serverData.edges[i]["from"]] = 0;
        nodeCoolFactors[serverData.edges[i]["from"]] += serverData.edges[i]["CF"];
        if (nodeCoolFactors[serverData.edges[i]["from"]] > nodeCoolFactors[theCoolestNode]) {
            theCoolestNode = serverData.edges[i]["from"];
        }

        serverData.edges[i]["label"] = Math.round(serverData.edges[i]["CF"]*100)/100;
        serverData.edges[i]["value"] = serverData.edges[i]["CF"];

    }

    for (i in serverData.nodes) {
        serverData.nodes[i]["label"] = (serverData.nodes[i]["label"] || "").replace(
            /_/g, " "
        );
        serverData.nodes[i]["radius"] =
            Math.max(Math.min(Math.sqrt((nodeCoolFactors[serverData.nodes[i]["id"]] || 0) + 2)*10, 40), 5);
    }

    serverData.theCoolestNode = theCoolestNode;
    serverData.numberOfConnectedNodes = (function () {
        var j, i = 0;
        for (j in connectedNodes) i++;
        return i;
    })();

    return serverData;

};