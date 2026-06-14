const {Op} = require('sequelize');
const Models = require('../../models/Models');


const removeOldPosts = async () => {
    const date = new Date().getTime();
    await Models.PostModel.destroy({ where: { date_to: { [Op.lt]: date } } })
    console.log('remove old posts');
}

module.exports = removeOldPosts;