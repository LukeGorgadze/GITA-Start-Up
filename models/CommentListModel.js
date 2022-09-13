const mongoose = require("mongoose")
const bcrypt = require("bcrypt")


const commentListSchema = new mongoose.Schema({
    id: {
        type: String,

    },
    comments: [{
        username: String,
        date: String,
        text: String,
        rating: Number,
    }]

})

commentListSchema.statics.findOneOrCreate = async function (id) {
    const self = this
    // self.findOne(condition, (err, result) => {
    //     return result ? callback(err, result) : self.create(condition, (err, result) => { return callback(err, result) })
    // })
    const commentList = await self.findOne({id:id})
        .then((cList) => {
            if (!cList) {
                // return self.create({id:id})
                return null
            }
            else {
                return cList
            }
        })
    return commentList
}
commentListSchema.statics.addComments = async function (id,comments) {
    const self = this
    const commentList = await self.findOne({id:id})
        .then((cList) => {
            if (!cList) {
                return self.create({id:id,comments:comments})
            }
            else {
                cList.comments.push(comments)
                cList.save()
                return cList
            }
        })
    return commentList
}

module.exports = mongoose.model("CommentList", commentListSchema);