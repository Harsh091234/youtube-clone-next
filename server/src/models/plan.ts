import { Schema, model, Document } from "mongoose";

export interface IPlan extends Document {
  name: string;
  dailyDownloadLimit: number;
  isUnlimited: boolean;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

const PlanSchema = new Schema<IPlan>(
  {
    name: {
      type: String,
      default: "free",
      
      trim: true,
    },

    dailyDownloadLimit: {
      type: Number,
      required: true,
      default: 1,
    },

    isUnlimited: {
      type: Boolean,
      default: false,
    },

    price: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

export default model<IPlan>("Plan", PlanSchema);
