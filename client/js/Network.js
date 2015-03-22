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
            shape: "dot",
            radius: 40,
            color: {
                background: "rgb(207, 242, 255)",
                border: "gray",
                highlight: {
                    background: "rgb(247, 222, 225)",
                    border: "red"
                }
            },
            fontStrokeWidth: 4
        },
        edges: {
            fontFill: "transparent",
            fontStrokeWidth: 2,
            style: "arrow",
            color: {
                color: "lightgray",
                highlight: "red"
            },
            fontColor: "black",
            widthMin: 0.5,
            widthMax: 2
        },
        smoothCurves: false,
        tooltip: {
            delay: 200,
            fontSize: 12,
            color: {
                background: "#fff"
            }
        },
        keyboard: {
            speed: {
                x: 10,
                y: 10,
                zoom: 0.02
            },
            bindToWindow: true
        },
        //hierarchicalLayout: {
        //    enabled: true,
        //    levelSeparation: 400,
        //    nodeSpacing: 600,
        //    direction: "LD",
        //    layout: "direction"
        //},
        //physics: {
        //    hierarchicalRepulsion: {
        //        centralGravity: 0,
        //        springConstant: 0.01,
        //        nodeDistance: 150,
        //        damping: 0.1
        //    }
        //}
        physics: {
            barnesHut: {
                enabled: true,
                gravitationalConstant: -300000,
                centralGravity: 0,
                springLength: 500,
                springConstant: 0.04,
                damping: 0.3
            }
        }
    };

    this.network = new vis.Network(this._container, this.NETWORK_DATA, options);

    //this.network.moveTo({
    //    scale: 1,
    //    animation: true,
    //    easingFunction: "easeInOutQuad",
    //    duration: 500
    //});

    window.addEventListener("resize", function () {
        self.network.redraw();
    });

    this.network.on("doubleClick", function (e) {
        if (!self.NETWORK_DATA.nodes[e["nodes"][0]]) return; // nothing selected
        window.open(self.NETWORK_DATA.nodes[e["nodes"][0]]["link"], "_blank"); // array issue (alpha)
    });

    this.network.focusOnNode(this.NETWORK_DATA.theCoolestNode, {
        scale: 1.3,
        animation: true,
        duration: 1,
        easingFunction: "easeInOutQuad"
    })

};