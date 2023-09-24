const Users = require("../../models/users-model")

function validateSwimId(req, res, next){
    const { swimId } = req.params
    Users.find({})
    .then((users)=>{
        let isValidId = false
        users.forEach((user)=>{
            return user.swims.forEach((swim)=>{
                if(swim._id.toString() === swimId){
                    return isValidId = true
                }
            })
        })
        if(isValidId){
            next()
        } else{
            res.status(400).send({msg : "invalid swimId"})
        }
    })
}


module.exports = {validateSwimId}