import Vitals from '../models/Vitals.models.js';
import Patient from '../models/Patient.models.js';

export const vitalsResolvers = {
  Query: {
    vitals: async (_, { id }) => {
      return await Vitals.findById(id).populate('patientId');
    },
    allVitals: async () => {
      return await Vitals.find({}).populate('patientId');
    },
  },
  Mutation: {
    createVitals: async (
      _,
      { patient, bodyTemp, heartRate, bloodPressure, dateCaptured }
    ) => {
      const newVitals = new Vitals({
        patientId: patient,
        bodyTemp,
        heartRate,
        bloodPressure,
        dateCaptured,
      });
      return await newVitals.save();
    },
    updateVitals: async (
      _,
      { id, bodyTemp, heartRate, bloodPressure, dateCaptured }
    ) => {
      const updateObj = {};
      if (bodyTemp) updateObj.bodyTemp = bodyTemp;
      if (heartRate) updateObj.heartRate = heartRate;
      if (bloodPressure) updateObj.bloodPressure = bloodPressure;
      if (dateCaptured) updateObj.dateCaptured = dateCaptured;

      return await Vitals.findByIdAndUpdate(id, updateObj, { new: true });
    },
    deleteVitals: async (_, { id }) => {
      const deleted = await Vitals.findByIdAndDelete(id);
      return !!deleted;
    },
  },
  Vitals: {
    patient: async (parent) => {
      return await Patient.findById(parent.patientId);
    },
  },
};
