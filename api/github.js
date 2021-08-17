const express = require('express');
const cors = require('cors');
const router = express.Router();
const axios = require('axios');

async function gatherResponse(response) {
    const { headers } = response
    const contentType = headers.get("content-type") || ""
    if (contentType.includes("application/json")) {
        const data = await response.json()
        return data.commit.sha
    }
    else if (contentType.includes("application/text")) {
        return response.text()
    }
    else if (contentType.includes("text/html")) {
        return response.text()
    }
    else {
        return response.text()
    }
}
router.use(cors({
    origin: ['https://minlaxz.github.io', 'http://localhost:3000'],
    methods: 'GET',
    headers: ['Content-Type', 'Accept, X-Requested-With']
}))

router.get('/', async (req, res) => {
    const returnBody = { message: "Eh this is github route" };
    res.status(200).json(returnBody);
})

router.get('/:action', async (req, res) => {
    if (req.params.action === 'lastcommit') {
        let { user, repo, branch } = req.query;
        !user && (user = "minlaxz")
        !branch && (branch = "main")
        !repo && res.status(400).json({ message: "repo is required" });
        const url = `https://api.github.com/repos/${user}/${repo}/branches/${branch}`
        const response = await axios.get(url, {
            headers: { 'User-Agent': 'curl/7.68.0' }
        })
        if (response.status === 200) {
            const returnBody = {
                ghUser: user,
                ghRepo: repo,
                ghBranch: branch,
                data: response.data.commit.sha
            }
            res.status(200).json(returnBody)
        } else {
            console.log(response.data)
            res.status(response.status).send(null)
        }
    } else {
        res.status(400).json({ message: `I don't know ${req.params.action} params` })
    }

});

module.exports = router;