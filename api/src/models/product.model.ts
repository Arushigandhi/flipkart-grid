import mongoose from "mongoose";

export interface ProductDoc extends mongoose.Document {
  name: string;
  isPublic: boolean;
  sellerId: mongoose.Types.ObjectId;
  description: string;
  quantity: number;
  sellPrice: number;
  releaseDate: Date;
  images: string;
}

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  isPublic: {
    type: Boolean,
    required: true,
    default: true,
  },
  sellerId: {
    type: mongoose.Types.ObjectId,
  },
  description: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 0,
  },
  sellPrice: {
    type: Number,
    required: true,
  },
  releaseDate: {
    type: Date,
    required: true,
    default: new Date(Date.now()),
  },
  images: {
    type: [String],
  },
});

export default mongoose.model<ProductDoc>("Product", ProductSchema);
