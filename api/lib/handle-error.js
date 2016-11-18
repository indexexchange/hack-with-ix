'use strict';

/**
 * Application error handler. If processing of the request
 * was halted due to an error, log this and send a 500 page.
 *
 * @param err {Object} Error object
 * @param req {Object} Request object
 * @param res {Object} Response object
 * @param next {Function} Callback function
 */
module.exports = function errorHandler() {
    return function errorHandler(err, req, res, next) {
        if (res.statusCode < 400) { res.statusCode = 500; }

        let e = {
            name:    err.name,
            message: err.message,
            stack:   err.stack
        };

        Object.assign(e, err);

        res.json({ message: 'INTERNAL ERROR', error: e });
    };
};
