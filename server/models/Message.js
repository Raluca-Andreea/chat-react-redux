const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const messageSchema = new Schema({  
  message: String ,
  user: { type: Schema.Types.ObjectId, ref: 'User' }
},
{
    timestamps: true
})


const Message = mongoose.model('User', messageSchema);
module.exports = Message;