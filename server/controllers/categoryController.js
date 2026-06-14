const CategoryService = require('../services/CategoryService');

const getAllCategories = async (req, res) => {
    try {
        const answer = await CategoryService.getAllCategories();
        res.status(200).send(answer);
    }
    catch (err) {
        res.status(401).send(err);
    }
}

module.exports ={
    getAllCategories,
    
}