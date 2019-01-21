const mongoose = require('mongoose');
const Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;

var User = new Schema({
    account:{
        name:{
            type:String,
            required:true,
            unique:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true,
            select:false
        }
    }
},{
    collection:'users'
})
module.exports = mongoose.model('User',User);