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
    console.log('🔄 Processing registration for:', data.fullName);

    // Validate required fields
    if (!data.fullName || !data.email || !data.phone || !data.selectedCourse) {
      console.error('❌ Missing required registration fields');
      return {
        success: false,
        error: 'Missing required registration information'
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      console.error('❌ Invalid email format:', data.email);
      return {
        success: false,
        error: 'Invalid email address format'
      };
    }

    console.log('📧 Sending enrollment confirmation emails...');

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
      console.warn('⚠ Email sending had issues, but registration will continue');
      return {
        success: true,
        message: 'Registration submitted! We encountered a minor issue with email delivery. Our admin will contact you shortly.',
        partial: true
      };
    }

    console.log('✅ Registration completed successfully with all emails sent');

    // TODO: Store registration in Supabase or Firebase database
    // For now, we just return success after email is sent
    return {
      success: true,
      message: 'Registration successful! Confirmation emails have been sent to you and our admin team.'
    };
  } catch (error) {
    console.error('❌ Registration submission error:', error);
    return {
      success: false,
      error: 'An unexpected error occurred during registration. Please try again or contact support.'
    };
  }
};
