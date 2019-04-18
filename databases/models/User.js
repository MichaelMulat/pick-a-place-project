const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt")


// Create document 
const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  imageurl: {
    type: String,
    default: "http://i68.tinypic.com/2igogmq.jpg"
  },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  date: { type: Date, default: Date.now },
  events: [
    {
      type: Schema.Types.ObjectId,
      ref: "Event"
    }
  ]
});


userSchema.methods = {
  checkPassword: function (password) {
    return bcrypt.compareSync(password, this.password)
  },
  hashPassword: password => {
    return bcrypt.hashSync(password, 10)
  }
}

userSchema.pre("save", function(next) {
  if (!this.password) {
    console.log("models/user.js =======NO PASSWORD PROVIDED=======");
    next();
  } else {
    console.log("models/user.js hashPassword in pre save");
    this.password = this.hashPassword(this.password);
    next();
  }
});


const User = mongoose.model("User", userSchema);


module.exports = User;
