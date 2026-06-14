const { and, Op } = require('sequelize');
const {UserSubject} = require('../models/Models');

const addUserSubject = async (values) => {
    try {
        const answer = await UserSubject.create(values);
        return "user subCategory added";
    }
    catch (err) {
        console.log(err);
        return err;
    }
}


const getUsers = async (subjectId) => {
    try {
        const answer = await UserSubject.findAll({where:{SubjectId:subjectId}});
        return answer;
    }
    catch (err) {
        return err;
    }
}

const getSubjects = async (userId) => {
    try {
        const answer = await UserSubject.findAll({where:{UserId:userId}});
        return answer;
    }
    catch (err) {
        return err;
    }
}

const removeUserSubject = async (userId,subjectId) => {
    try {
        const answer = await UserSubject.destroy({where:{userId,subjectId:{[Op.in]:subjectId}}});
        if(!answer){
            throw new Error("error with removing, please check the details and try again");
        }
        console.log(answer);
        return 'subject deleted from user';
    }
    catch (err) {
        return err;
    }
}

module.exports = PostRepo = {
    addUserSubject,getUsers,getSubjects,removeUserSubject
}