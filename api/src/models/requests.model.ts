import mongoose from "mongoose";

export interface RequestDoc extends mongoose.Document {
  service: string;
  sno: string;
  address: string;
  buyerEmail: string;
  buyerName: string;
  sellerId: mongoose.Types.ObjectId;
  buyerId: mongoose.Types.ObjectId;
}

const RequestSchema = new mongoose.Schema({
  service: {
    type: String,
  },
  sno: {
    type: String,
  },
  address: {
    type: String,
  },
  buyerEmail: {
    type: String,
  },
  buyerName: {
    type: String,
  },
  sellerId: {
    type: mongoose.Types.ObjectId,
  },
  buyerId: {
    type: mongoose.Types.ObjectId,
  },
});

export default mongoose.model<RequestDoc>("Request", RequestSchema);