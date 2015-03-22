/**
 * Server connector.
 * @param {string} requestURL
 * @constructor
 */
var DataSource = function (requestURL) {

    this.POST_URL = requestURL;

};

/**
 * Handles JSON from server.
 *
 * @param {string} url
 * @param {object} data
 * @param {function} callback
 * @private
 */
DataSource.prototype._post = function (url, data, callback) {

    var xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr["onreadystatechange"] = function () {

        if (xhr.readyState === 4 && xhr.status === 200) {
            try {
                callback(null, JSON.parse(xhr.responseText));
            } catch (e) {
                try { // handle JSON.parse bug
                    var temp = null;
                    eval("temp=" + xhr.responseText);
                    callback(null, temp);
                } catch (e) {
                    callback("Unable to parse server response: " + xhr.responseText);
                }
            }
        } else if (xhr.readyState === 4 && xhr.status !== 200) {
            callback(xhr.responseText + " (" + xhr.status + ": " + xhr.statusText + ")");
        }
    };

    // BASIC AUTH SNIPPET
    //if (data["USERNAME"] && data["PASSWORD"]) {
    //    xhr.setRequestHeader(
    //        "Authorization",
    //        "Basic " + btoa(data["USERNAME"] + ":" + data["PASSWORD"])
    //    );
    //}

    xhr.send(JSON.stringify(data));

};

/**
 * Request data required for rendering from server.
 * @param {DataSource~requestCallback} callback
 */
DataSource.prototype.requestData = function (callback) {

    this._post(this.POST_URL, {}, callback);

};

/**
 * This callback fires when data from server arrive.
 * @callback DataSource~requestCallback
 * @param {string|null} error
 * @param {*} data
 */

/**
 * This callback fires when data from server arrive.
 * @callback DataSource~postCallback
 * @param {string|null} error
 * @param {*} data
 */