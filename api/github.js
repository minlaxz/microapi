const express = require('express');
const cors = require('cors');
const axios = require('axios');

const router = express.Router();

router.use(cors({
    origin: ['https://minlaxz.github.io', 'http://localhost:3000', 'https://*.octocat.tk'],
    methods: 'GET',
    headers: ['Content-Type', 'Accept, X-Requested-With']
}))

router.use('/:action', (req, res, next) => {
    if (req.params.action === 'lastcommit') {
        let { repo } = req.query
        if (!repo) {
            // throw new Error('BROKEN')
            const error = new Error('Missing repo query');
            error.status = 400;
            next(error);
        } else{
            next();
        }
    } else {
        const error = new Error(`Invalid action : ${req.params.action}`);
        error.status = 400;
        next(error);
    }
});

router.get('/', async (req, res) => {
    const returnBody = { message: "Eh this is github route" };
    res.status(200).json(returnBody);
});

router.get('/:action', async (req, res, next) => {
    let { user, repo, branch } = req.query;
    !user && (user = "minlaxz")
    !branch && (branch = "main")
    const url = `https://api.github.com/repos/${user}/${repo}/branches/${branch}`
    try {
        const response = await axios.get(url, {
            headers: { 'User-Agent': 'curl/7.68.0' }
        });
        const returnBody = {
            ghUser: user,
            ghRepo: repo,
            ghBranch: branch,
            data: response.data.commit.sha
        }
        return res.status(200).json(returnBody)
    }
    catch (error) {
        if (!error.status) error.status = 404
        next(error);
    }

});

// error handler middleware
router.use((error, req, res, next) => {
    console.error(error.stack)
    if (res.headersSent) {
        return next(error)
    }
    res.status(error.status || 500).send({
        error: {
            status: error.status || 500,
            message: error.message || 'Internal Server Error'
        },
    });
});

module.exports = router;