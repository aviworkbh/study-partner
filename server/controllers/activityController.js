
const { json } = require('sequelize');
const activityService = require('../services/activityService');

const reactToPost = async (req, res) => {
    try {
        const answer = await activityService.reactToPost(req);
        if (answer.message) {
            throw new Error(answer.message)
        }
        res.status(200).send(answer);
    }
    catch (err) {
        console.log(err.message);
        res.status(402).send(err.message);
    }
}

const confirmPost = async (req, res) => {
    try {
        const answer =await activityService.confirmPost(req);
        if(answer.message){
            throw new Error(answer.message)
        }
        res.status(200).send(answer);
    }
    catch (err) {
        console.log(err);
        res.status(401).send(err.message);
    }
}

const denyPost = async (req, res) => {
    try {
        const answer = await activityService.denyPost(req);
        if(answer.message){
            throw new Error(answer.message)
        }
        res.status(200).send(answer);
        
    }
    catch (err) {
        console.log(err);
        res.status(402).send(err);
    }
}

const rateUser = async (req, res) => {
    try {
        const answer = await activityService.rateUser(req)
        if (answer.message) {
            throw new Error(answer.message)
        }
        else{
            res.status(200).send(answer);
        }
        
    }
    catch (err) {
        console.log(err);
        res.status(402).send(err);
    }
}


module.exports = {
    reactToPost,
    confirmPost,
    denyPost,
    rateUser
}