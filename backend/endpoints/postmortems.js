const { Router } = require('express');
const postmortemRouter = Router();
const { createPostmortem, getPostmortems, getPostmortem, updatePostmortem } = require('../db/postmortems');

postmortemRouter.post('/', async (req, res) => {
    try {
        const postmortem = req.body;
        console.table(postmortem);
        
        const postmortemCreated = await createPostmortem(postmortem);
        if (postmortemCreated) {
            res.status(201).jsonp({ id: postmortemCreated._id });
        }
    } catch (error) {
        res.status(400).jsonp({ msg: error.message })
    }
});

postmortemRouter.get('/', async (req, res) => {
    try {
        const postmortems = await getPostmortems();
        if (postmortems) {
            res.status(200).jsonp({ postmortems: postmortems });
        } else {
            res.status(401).jsonp({ error: 'There was an error on the getPostmortems() call' });
        }
    } catch (error) {
        res.status(500).jsonp({ error: 'There was an error while getting the Postmortems' });
    }
});

postmortemRouter.get('/:id', async (req, res) => {
    try {
        const postmortemId = req.params.id;
        const postmortemFound = await getPostmortem(postmortemId);
        if (postmortemFound) {
            res.status(200).jsonp({ postmortems: postmortemFound });
        }
    } catch (error) {
        res.status(400).jsonp({ error: error.message });
    }
});

postmortemRouter.put('/:_id', async (req, res) => {
    try {
        const postmortemId = req.params;
        const postmortem = req.body;
        const postmortemUpdated = await updatePostmortem(postmortemId, postmortem);
        res.status(201).jsonp({ status: postmortemUpdated.status });
    } catch (error) {
        res.status(500).jsonp({ error: 'There was an error while updating the Postmortem' });
    }
});

module.exports = postmortemRouter;
