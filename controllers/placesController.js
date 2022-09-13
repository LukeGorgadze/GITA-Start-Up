const CommentListModel = require("../models/CommentListModel")


module.exports.getComments = async (req, res, next) => {

    const { id } = req.body.data
    console.log(id)
    console.log(req.body)
    // const condition = { id:id }
    // console.log(id)
    const cList = await CommentListModel.findOneOrCreate(id)
    if (cList) {
        console.log("Success Getting")
        res.status(200).send(cList)
    } else {
        // res.status(500).send("ERROR in gettingComments")
        res.status(200).send({codeLuke:"NotGut"})
    }


}
module.exports.addComment = async (req, res, next) => {

    const { id, comment } = req.body.data
    const cList = await CommentListModel.addComments(id, comment)
    if (cList) {
        console.log("Success Adding")
        res.status(200).send(cList)
    }
    else {
        res.status(500).send("ERROR in addingComments")
    }

} 