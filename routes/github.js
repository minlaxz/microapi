const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const returnBody = "Eh this is github route";
    const returnHeaders = {
        'Content-Type': 'text/plain',
        'Content-Length': Buffer.byteLength(returnBody)
    }
    res.set(returnHeaders);
    res.status(200).send(returnBody);
})

router.get('/:param', async (req, res) => {
    const data = {
        params: req.params,
        query: req.query
    }
    res.status(200).type('json').send(data);
});

module.exports = router;