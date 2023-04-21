import Patient from '../models/Patient.models.js';
import User from '../models/User.models.js';

const findPatientByEmail = async (email) => {
  const user = await User.findOne({ email });
  if (!user) return null;

  const patient = await Patient.findOne({ user: user._id });
  return patient;
};

export const patientResolver = {
  Patient: {
    birthdate: (parent) =>
      new Date(parent.birthdate).toISOString().split('T')[0],
    email: async (parent) => {
      const user = await User.findById(parent.user);
      return user.email;
    },
  },
  Query: {
    getPatients: async () => {
      return await Patient.find().populate('user', 'email');
    },
    getPatient: async (_, { id }) => {
      return await Patient.findById(id).populate('user', 'email');
    },
  },
  Mutation: {
    createPatient: async (_, { input }) => {
      const { email, ...patientData } = input;

      const existingPatient = await findPatientByEmail(email);

      if (existingPatient) {
        throw new Error('Patient with this email already exists.');
      }

      const user = await User.findOne({ email });

      if (!user) {
        throw new Error('User not found. The provided email does not exist.');
      }

      const patient = new Patient({
        user: user._id,
        email: user.email,
        ...patientData,
      });

      await patient.save();

      return patient;
    },
    updatePatient: async (_, { id, input }) => {
      const existingPatient = await findPatientByEmail(input.email);

      if (existingPatient && existingPatient.id !== id) {
        throw new Error('Patient with this email already exists.');
      }

      const user = await User.findOne({ email: input.email });

      if (!user) {
        throw new Error('User not found. The provided email does not exist.');
      }

      const updatedInput = { ...input, user: user._id };

      const patient = await Patient.findByIdAndUpdate(id, updatedInput, {
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
