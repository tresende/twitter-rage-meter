require('dotenv').config()
const express = require('express');
const load = require('express-load');
const bodyParser = require('body-parser');
const cors = require('cors');

module.exports = () => {
    const app = express();
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(cors())
    load('routes', {
            cwd: 'app'
        })
        .into(app);
    return app;
}