const PostRepo = require('../repositories/postRepo');
const { convertToReadingPossibility } = require('../utilities/post/adjustungPostData');

const addPost = async (reqBody) => {
    try {
        const { email, userId, auther_name, category, sub_category, post, date_from, date_to, time_from, time_to, days } = reqBody;
        const PostDetails = { email, userId, auther_name, category, sub_category, post, date_from, date_to, time_from, time_to, days };
        const answer = await PostRepo.addPost(PostDetails);

        return answer;
    }
    catch (err) {
        console.log(err);
        return err;
    }
}

const getPost = async (req) => {
    try {
        const { id } = req.body;
        const result = await PostRepo.getPost(id);
        if (!result) {
            throw new Error("fail to get post or post not found ");
        }
        return convertToReadingPossibility(result)
    }
    catch (err) {
        console.log(err);
        return err;
    }
}

const getPosts = async () => {
    try {
        const result = await PostRepo.getPosts();
        if(result.message){
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

const deletePost = async (req) => {
    const { id } = req.body;
    console.log('id serv >> ' ,id);
    try {
        const answer = await PostRepo.deletePost(id);
        if(answer.message !==undefined){
            throw new Error(answer.message)
        }
        return answer;
    }
    catch (err) {
        console.log(err);
        return err;
    }
}

module.exports = PostService = {
    addPost,
    getPost,
    getPosts,
    updatePost,
    deletePost,
}

