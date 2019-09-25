const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({  
  username: {type: String, required: true },
  email: {type: String, required: true },
  password: {type: String, required: true },
  token: {type: String },
  connected: {type: Boolean, default: false},
  privateChats: [{ type: Schema.Types.ObjectId, ref: 'Room' }],
  socket: String,
  notifications: [{ type: Schema.Types.ObjectId, ref: 'Room' }],
},
{
    timestamps: true
}
)

const User = mongoose.model('User', userSchema);
module.exports = User;