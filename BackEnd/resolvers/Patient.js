import Patient from '../models/Patient.models.js';

export const patientResolver = {
  Patient: {
    birthdate: (parent) =>
      new Date(parent.birthdate).toISOString().split('T')[0],
  },
  Query: {
    getPatients: async () => {
      const patients = await Patient.find();
      return patients;
    },
    getPatient: async (_, { id }) => {
      return await Patient.findById(id);
    },
  },
  Mutation: {
    createPatient: async (_, { input }) => {
      const existingPatient = await Patient.findOne({ email: input.email });

      if (existingPatient) {
        throw new Error('Patient with this email already exists.');
      }

      const patient = new Patient({ ...input });

      await patient.save();

      return patient;
    },
    updatePatient: async (_, { id, input }) => {
      const patient = await Patient.findByIdAndUpdate(id, input, {
        new: true,
      });

      if (!patient) {
        throw new Error('Patient not found');
      }

      return patient;
    },
    deletePatient: async (_, { id }) => {
      const patient = await Patient.findByIdAndDelete(id);

      if (!patient) {
        throw new Error('Patient not found');
      }

      return 'Patient deleted successfully';
    },
  },
};
