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
  extensionPrice: number;
}

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  isPublic: {
    type: Boolean,
    default: true,
  },
  sellerId: {
    type: mongoose.Types.ObjectId,
  },
  description: {
    type: String,
  },
  quantity: {
    type: Number,
    default: 0,
  },
  sellPrice: {
    type: Number,
  },
  warrantyExtensionPrice: {
    type: Number,
  },
  releaseDate: {
    type: Date,
    default: new Date(Date.now()),
  },
  images: {
    type: [String],
  },
  extensionPrice: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model<ProductDoc>("Product", ProductSchema);
