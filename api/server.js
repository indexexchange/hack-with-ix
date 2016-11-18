'use strict';

const express = require('express'),
      kraken  = require('kraken-js'),
      app     = express(),
      PORT    = process.env.PORT || 8000,
      TIMEOUT = 30000;

app.use('/', kraken({}));
app.listen(PORT, () => console.log('[LIFECYCLE]: listening on port %d', PORT));

process.on('SIGTERM', function () {
    console.log('[LIFECYCLE]: got SIGTERM, waiting for connections to close');
    server.close(process.exit);

    setTimeout(() => {
        console.log('[LIFECYCLE]: timed out waiting for connections to close');
        process.exit();
    }, TIMEOUT);
});
