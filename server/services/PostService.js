const { Error } = require('sequelize');
const PostRepo = require('../repositories/postRepo');
const {convertToReadingPossibility} = require('../utilities/adjustingData/adjustungPostData');
const addPost = async (reqBody) => {
    try {
        const { email, userId, auther_name, category, sub_category, post, date, time_from, time_to } = reqBody;
        const PostDetails = { email, userId, auther_name, category, sub_category, post, date: date, time_from: time_from, time_to: time_to };
        const answer = await PostRepo.addPost(PostDetails);

        return answer;
    }
    catch (err) {
        console.log(err);
        return err;
    }
}

const getPosts = async () => {
    try {
        const result = await PostRepo.getPosts();
        if(!result){
            throw new Error("fail to get posts or not found any posts");
        }
        answer = result.map((post) => {
            return convertToReadingPossibility(post)
        })
        return answer;
    }
    catch (err) {
        console.log(err);
        return err;
    }
}

const updatePost = async (reqBody) => {

    try {
        const { id, newPost, newDate, newTime_from, newTime_to } = reqBody;
        const updatedValues = {
            post: newPost || undefined,
            date: newDate || undefined,
            time_from: newTime_from || undefined,
            time_to: newTime_to || undefined
        }
        const answer = await PostRepo.updatePost(id, updatedValues);
        return answer;
    }
    catch (err) {
        return err;
    }
}

const deletePost = async (reqBody) => {
    const { id } = reqBody
    try {
        const answer = await PostRepo.deletePost(id);
        return answer;
    }
    catch (err) {
        console.log(err);
        return err;
    }
}

module.exports = PostService = {
    addPost,
    getPosts,
    updatePost,
    deletePost,

}

