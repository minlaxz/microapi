const express = require('express');
const githubRoute = require('./routes/github');

const app = express();

app.use(express.json());

app.get('/', async (req, res) => {
    res.status(200).send('Hello World!');
});

app.use('/api/v1/github', githubRoute);


app.listen(3000, () => {
    console.log(`Example app listening on port 3000!`);
})

module.exports = app;