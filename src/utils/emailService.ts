import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

// Initialize EmailJS with your public key
emailjs.init("oeEXDVnhS6KGxOa_e");

export interface EmailTemplateParams {
  to_name: string;
  to_email: string;
  course_title: string;
  class_type: string;
  class_mode: string;
  student_name?: string;
  student_age?: string;
  parent_name?: string;
  contact?: string;
  education?: string;
  previous_coding?: string;
  [key: string]: string | undefined;  // Index signature to make it compatible with Record<string, unknown>
}

const ADMIN_EMAIL = 'walkerchristopherr549@gmail.com';

export const sendRegistrationEmail = async (templateParams: EmailTemplateParams): Promise<EmailJSResponseStatus | null> => {
  try {
    const result = await emailjs.send(
      'service_5yvw3kl',  // Your EmailJS service ID
      'template_9qfpbxm', // Your EmailJS template ID
      templateParams,
      'oeEXDVnhS6KGxOa_e' // Your EmailJS public key
    );
    console.log('Email sent successfully:', result);
    return result;
  } catch (error) {
    console.error('Failed to send email:', error);
    return null;
  }
};

export const sendEnrollmentConfirmation = async (
  studentEmail: string,
  studentName: string,
  courseTitle: string,
  classMode: string,
  classType: string,
  price: { ugx: number; usd: number }
): Promise<boolean> => {
  let studentEmailSent = false;
  let adminEmailSent = false;

  try {
    const nextSteps = [
      '1. You will receive a welcome email with detailed course materials',
      '2. Join orientation session 48 hours before your first class',
      '3. Complete payment to secure your enrollment',
      '4. Receive class schedule and mentorship details',
      '5. Start learning with our expert instructors'
    ].join('\n');

    const classScheduleInfo = classMode === 'remote'
      ? 'Online via Zoom/Google Meet - Flexible timing'
      : classMode === 'physical'
      ? 'In-person at GiiT Campus - Scheduled sessions'
      : 'Flexible - Combination of online and in-person';

    // Send to student
    const studentParams = {
      to_name: studentName,
      to_email: studentEmail,
      course_title: courseTitle,
      class_type: classType,
      class_mode: classScheduleInfo,
      student_name: studentName,
      contact: studentEmail,
      price_ugx: price.ugx.toString(),
      price_usd: price.usd.toString(),
      next_steps: nextSteps,
      email_type: 'student_confirmation'
    };

    try {
      const studentResult = await emailjs.send(
        'service_5yvw3kl',
        'template_9qfpbxm',
        studentParams,
        'oeEXDVnhS6KGxOa_e'
      );
      studentEmailSent = true;
      console.log('✓ Student confirmation email sent successfully to:', studentEmail, studentResult);
    } catch (studentError) {
      console.error('✗ Failed to send student confirmation email:', studentError);
    }

    // Send to admin
    const adminParams = {
      to_name: 'GiiT Admin',
      to_email: ADMIN_EMAIL,
      course_title: courseTitle,
      class_type: classType,
      class_mode: classScheduleInfo,
      student_name: studentName,
      student_email: studentEmail,
      contact: studentEmail,
      price_ugx: price.ugx.toString(),
      price_usd: price.usd.toString(),
      next_steps: `New enrollment from ${studentName} (${studentEmail}) for ${courseTitle}`,
      email_type: 'admin_notification'
    };

    try {
      const adminResult = await emailjs.send(
        'service_5yvw3kl',
        'template_9qfpbxm',
        adminParams,
        'oeEXDVnhS6KGxOa_e'
      );
      adminEmailSent = true;
      console.log('✓ Admin notification email sent successfully to:', ADMIN_EMAIL, adminResult);
    } catch (adminError) {
      console.error('✗ Failed to send admin notification email:', adminError);
    }

    if (studentEmailSent && adminEmailSent) {
      console.log('✓ All emails sent successfully');
      return true;
    } else if (studentEmailSent || adminEmailSent) {
      console.warn('⚠ Partial email delivery: Student=' + studentEmailSent + ', Admin=' + adminEmailSent);
      return true; // Still consider it a success if at least one email was sent
    } else {
      console.error('✗ No emails were sent');
      return false;
    }
  } catch (error) {
    console.error('Failed to send enrollment confirmation:', error);
    return false;
  }
};
