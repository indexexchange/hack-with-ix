'use strict';

/**
 * Middleware for when the response is about to be sent. Executed when the
 * onHeaders event occurs. Logs details about the request and response.
 *
 * @module lib/handle-response
 */
var onHeaders = require('on-headers');
    /**
     * Adds an callback that's executed when headers are set.
     * Callback sets some headers and logs the response to Bunyan.
     * 
     * @param req {Object} request object
     * @param res {Object} response object
     * @param next {Function} callback
     */
module.exports = function () {
    return function handleResponse(req, res, next) {
        var start = process.hrtime();

        onHeaders(res, () => {
            var diff = process.hrtime(start),
                nano = diff[0] * 1e9 + diff[1],
                ms   = (nano / 1e6).toFixed(6) + 'ms',
                head = req.headers.origin;

            if (head) {
                res.setHeader('Access-Control-Allow-Origin', head);
            }
            res.setHeader('Access-Control-Allow-Credentials', 'true');
            res.setHeader('X-Response-Time', ms);
        });

        next();
    };
};
