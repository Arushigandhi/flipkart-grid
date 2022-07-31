import mongoose from "mongoose";

export interface SoldProductDoc extends mongoose.Document {
  sellerId: mongoose.Types.ObjectId;
  product: mongoose.Types.ObjectId;
  buyerEmail: string;
  buyerName: string;
  sno: string;
  phoneNumber: string;
  warrantyPeriod: number;
  hasWarranty: boolean;
}

const SoldProductSchema = new mongoose.Schema({
  sellerId: {
    type: mongoose.Types.ObjectId,
  },
  product: {
    type: mongoose.Types.ObjectId,
  },
  buyerEmail: {
    type: String,
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  },
  buyerName: {
    type: String,
  },
  sno: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  warrantyPeriod: {
    type: Number,
    default: 6,
  },
  hasWarranty: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model<SoldProductDoc>("SoldProduct", SoldProductSchema);
