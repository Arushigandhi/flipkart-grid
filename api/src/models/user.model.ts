import mongoose from "mongoose";
import bcrypt from "bcryptjs";

export interface UserDoc extends mongoose.Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  seller: boolean;
}

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
  },
  seller: {
    type: Boolean,
    default: false,
  },
});

UserSchema.pre<UserDoc>("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hashSync(this.password, 8);
});

UserSchema.methods.MatchPassword = async function (password: string) {
  const user = this as UserDoc;
  return await bcrypt.compareSync(password, user.password);
};

// export default mongoose.model<UserDoc>("User", UserSchema);
module.exports = mongoose.model("user", UserSchema);
// {
//     "firstName": "arushi",
//     "lastName":"gandhi",
//     "email":"arushi.gandhi@gmail.com",
//     "password":"arushig02",
//     "phoneNumber":"9323017320",
//     "seller":"false"
// }
