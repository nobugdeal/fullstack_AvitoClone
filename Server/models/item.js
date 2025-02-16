import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  image: { type: String, required: false },
  type: { type: String, required: true },

  propertyType: { type: String },
  area: { type: Number },
  rooms: { type: Number },

  brand: { type: String },
  model: { type: String },
  year: { type: Number },
  mileage: { type: Number },

  serviceType: { type: String },
  experience: { type: Number },
  workSchedule: { type: String },

  price: { type: Number, required: true },

  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const Item = mongoose.model('Item', itemSchema);
export default Item;
