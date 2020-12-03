const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    _id :  mongoose.Schema.Types.ObjectId,
    email:{type:String,required:true,minlength:1,
    unique:true,
     match: /^[A-Z0-9_'%=+!`#~$*?^{}&|-]+([\.][A-Z0-9_'%=+!`#~$*?^{}&|-]+)*@[A-Z0-9-]+(\.[A-Z0-9-]+)+$/},
    password:{type:String,required:true,minlength:1}

})

module.exports = mongoose.model('User', userSchema)