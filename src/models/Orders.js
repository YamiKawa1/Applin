import { Schema, model } from 'mongoose';

const orderSchema = new Schema({
  id: { type: Number, unique: true, required: true },
  skus: [{
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
  }],
});

export const Orders = model('Orders', orderSchema);