import mongoose from "mongoose";
import bcrypt from "bcryptjs";
export interface UserNotificationDoc {
  service: string;
  sno: string;
  address: string;
}
export interface UserDoc extends mongoose.Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  isSeller: boolean;
  MatchPassword(password: string): boolean;
  notifications: UserNotificationDoc[];
}

const UserSchema = new mongoose.Schema<UserDoc>({
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
  isSeller: {
    type: Boolean,
    default: false,
  },
  notifications: [
    {
      service: {
        type: String,
        default: "",
      },
      sno: {
        type: String,
        default: "",
      },
      address: {
        type: String,
        default: "",
      },
    },
  ],
});

UserSchema.pre<UserDoc>("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hashSync(this.password, 8);
});

UserSchema.methods.MatchPassword = async function (password: string) {
  const user = this as UserDoc;
  let isValid = await bcrypt.compare(password, user.password);
  return isValid;
};

export default mongoose.model<UserDoc>("User", UserSchema);
