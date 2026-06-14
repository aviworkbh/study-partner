const userSubjectRepo = require('../repositories/userSubjectRepo');

const addUserSubject = async (req) => {
    try {
        const { userId, subjectId } = req.body;
        const answer = await userSubjectRepo.addUserSubject({ UserId: userId, SubjectId: subjectId });
        return answer;
    }
    catch (err) {
        console.log(err);
        return err;
    }
}

const getUsers = async (reqBody) => {
    try {
        const { subjectId } = reqBody;
        const answer = await userSubjectRepo.getUsers(subjectId);
        return answer;
    }
    catch (err) {
        console.log(err);
        return err;
    }
}

const getSubjects = async (reqBody) => {
    try {
        const { userId } = reqBody;
        const answer = await userSubjectRepo.getSubjects(userId);
        return answer;
    }
    catch (err) {
        console.log(err);
        return err;
    }
}

const removeUserSubject = async (req) => {
    try {
        const { userId, subjectId } = req.body;
        const answer = await userSubjectRepo.removeUserSubject(userId, subjectId)
        return answer
    }
    catch (err) {
        console.log('service error >>', err);
        return err;
    }
}

module.exports = {
    addUserSubject, getUsers, getSubjects, removeUserSubject
}