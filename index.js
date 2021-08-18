const express = require('express');
const githubRoute = require('./api/github');
const cors = require('cors');

const app = express();
app.use(express.json());
const base = '/api';
const apiVersion = '/v1';

app.get('/', cors(), async (req, res) => {
    res.status(200).send('Hello World!');
});

app.get(`${base}`, async (req, res) => {
    res.status(302).redirect(`${base}${apiVersion}`);
})

app.get(`${base}${apiVersion}`, async (req, res) => {
    res.status(302).redirect(`${base}${apiVersion}/doc`);
})

app.get(`${base}${apiVersion}/doc`, async (req, res) => {
    res.status(200).send('Documentation');
})

app.use(`${base}${apiVersion}/github`, githubRoute);


app.get("*", async (req, res) => {
    res.status(404).send('Not Found');
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
})

module.exports = app;