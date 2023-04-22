import mongoose, { Schema, model } from 'mongoose';

const vitalsSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true,
  },
  bodyTemp: {
    type: Number,
    required: true,
  },
  heartRate: {
    type: Number,
    required: true,
  },
  bloodPressure: {
    type: String,
    required: true,
  },
  dateCaptured: {
    type: Date,
    default: Date.now,
  },
});

const Vitals = model('Vitals', vitalsSchema);
export default Vitals;