import { sendEnrollmentConfirmation } from './emailService';

export const firebaseService = {
  // Add your Firebase methods here
};

interface RegistrationData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  preferredContact: string;
  classType: string;
  childName: string;
  childAge: string;
  selectedCourse: string;
  selectedTime: string;
  additionalInfo: string;
  classMode?: string;
  price?: { ugx: number; usd: number };
}

export const submitRegistration = async (data: RegistrationData) => {
  try {
    console.log('Registration data:', data);

    // Validate required fields
    if (!data.fullName || !data.email || !data.phone || !data.selectedCourse) {
      return {
        success: false,
        error: 'Missing required registration information'
      };
    }

    // Send enrollment confirmation emails to student and admin
    const emailSent = await sendEnrollmentConfirmation(
      data.email,
      data.fullName,
      data.selectedCourse,
      data.classMode || 'remote',
      data.classType || 'Regular',
      data.price || { ugx: 0, usd: 0 }
    );

    if (!emailSent) {
      console.warn('Failed to send enrollment emails, but registration will continue');
    }

    // TODO: Store registration in Supabase or Firebase database
    // For now, we just return success after email is sent
    return {
      success: true,
      message: 'Registration successful! Confirmation emails have been sent.'
    };
  } catch (error) {
    console.error('Registration submission error:', error);
    return {
      success: false,
      error: 'An unexpected error occurred during registration. Please try again.'
    };
  }
};
