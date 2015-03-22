/**
 * Network controller.
 * @constructor
 * @param {HTMLElement} container
 */
var Network = function (container) {

    /**
     * @type {HTMLElement}
     * @private
     */
    this._container = container;

    /**
     * @type {Network}
     */
    this.network = null;

    this.NETWORK_DATA = null;

};

/**
 * Render data.
 * @param data - Prepared data.
 */
Network.prototype.setup = function (data) {

    var self = this;

    if (this.network) {
        console.warn("Network already set up.");
        return;
    }

    this.NETWORK_DATA = data;

    //var nodes = [
    //    {id: 1, label: 'Node 1'},
    //    {id: 2, label: 'Node 2'},
    //    {id: 3, label: 'Node 3'},
    //    {id: 4, label: 'Node 4'},
    //    {id: 5, label: 'Node 5'}
    //];
    //
    //// create an array with edges
    //var edges = [
    //    {from: 1, to: 2, label: "mesh" },
    //    {from: 1, to: 3},
    //    {from: 2, to: 4},
    //    {from: 2, to: 5}
    //];
    //
    //// create a network
    //var data= {
    //    nodes: nodes,
    //    edges: edges
    //};

    var options = {
        nodes: {
            shape: "circle"
        },
        edges: {
            fontFill: "transparent",
            fontStrokeWidth: 1
        },
        tooltip: {
            delay: 200,
            fontSize: 12,
            color: {
                background: "#fff"
            }
        }
    };

    this.network = new vis.Network(this._container, this.NETWORK_DATA, options);

    window.addEventListener("resize", function () {
        self.network.redraw();
    });

    this.network.on("doubleClick", function (e) {
        if (!self.NETWORK_DATA.nodes[e["nodes"][0]]) return; // nothing selected
        window.open(self.NETWORK_DATA.nodes[e["nodes"][0]]["link"], "_blank"); // array issue (alpha)
    });

};