const Models = require('../models/Models');

const getAllcategories = async()=>{
    try {
        const answer = await Models.CategoryModel.findAll({include:Models.SubjectModel});
        return answer;
    }
    catch (err) {
        return err;
    }
}




module.exports = categoryRepo ={
    getAllcategories
}