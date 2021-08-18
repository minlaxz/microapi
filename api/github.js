const express = require('express');
const cors = require('cors');
const axios = require('axios');

const router = express.Router();

router.use(cors({
    origin: ['https://minlaxz.github.io', 'http://localhost:3000', 'https://*.octocat.tk'],
    methods: 'GET',
    headers: ['Content-Type', 'Accept, X-Requested-With']
}))

// error handler middleware
router.use((error, req, res, next) => {
    // if (!error.statusCode) error.statusCode = 500;
    // if (error.statusCode === 301) {
    //     return res.status(301).redirect('/not-found');
    // }
    // return res.status(error.statusCode).json({ message: error.message.toString() });
    return res.status(error.status || 500).send({
        error: {
            status : error.status || 500,
            message: error.message || 'Internal Server Error'
        },
    });
});

router.use('/:action', (req, res, next) => {
    if (req.params.action === 'lastcommit') {
        let { repo } = req.query
        if (!repo) {
            return res.status(400).json({ message: "Missing repo parameter" })
        }
        next()
    }
})

router.get('/', async (req, res) => {
    const returnBody = { message: "Eh this is github route" };
    res.status(200).json(returnBody);
})

router.get('/:action', async (req, res, next) => {
    if (req.params.action === 'lastcommit') {
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
        catch (error){
            next(error);
        }
    } else {
        return res.status(400).json({ message: `I don't know ${req.params.action} params` })
    }

});

module.exports = router;