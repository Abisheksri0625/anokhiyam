// Notification service for RPA integration
class NotificationService {
  constructor() {
    // Use import.meta.env instead of process.env for Vite
    this.emailApiUrl = import.meta.env.VITE_EMAIL_API_URL;
    this.smsApiUrl = import.meta.env.VITE_SMS_API_URL;
    this.apiKey = import.meta.env.VITE_NOTIFICATION_API_KEY;
  }

  // Send email notification
  async sendEmail(data) {
    try {
      console.log('Sending Email:', data);
      return { success: true, message: 'Email sent (mock)' };
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }

  // Send SMS notification
  async sendSMS(data) {
    try {
      console.log('Sending SMS:', data);
      return { success: true, message: 'SMS sent (mock)' };
    } catch (error) {
      console.error('Error sending SMS:', error);
      throw error;
    }
  }

  // Send admission acceptance notification
  async sendAcceptanceNotification(applicationData) {
    const emailData = {
      email: applicationData.email,
      subject: `Admission Confirmed - ${applicationData.institutionName}`,
      htmlContent: this.getAcceptanceEmailTemplate(applicationData),
      textContent: this.getAcceptanceTextTemplate(applicationData)
    };

    const smsData = {
      phone: applicationData.phone,
      message: `CONGRATULATIONS ${applicationData.fullName}! Your admission for ${applicationData.selectedCourse} at ${applicationData.institutionName} is CONFIRMED. Application ID: ${applicationData.applicationId}. Check email for details. Welcome aboard!`
    };

    return Promise.all([this.sendEmail(emailData), this.sendSMS(smsData)]);
  }

  // Send admission rejection notification
  async sendRejectionNotification(applicationData, reason) {
    const emailData = {
      email: applicationData.email,
      subject: `Admission Application Update - ${applicationData.institutionName}`,
      htmlContent: this.getRejectionEmailTemplate(applicationData, reason),
      textContent: this.getRejectionTextTemplate(applicationData, reason)
    };

    const smsData = {
      phone: applicationData.phone,
      message: `Dear ${applicationData.fullName}, your application ${applicationData.applicationId} for ${applicationData.selectedCourse} at ${applicationData.institutionName} was not accepted. Reason: ${reason}. Check email for details & next steps.`
    };

    return Promise.all([this.sendEmail(emailData), this.sendSMS(smsData)]);
  }

  // Email templates
  getAcceptanceEmailTemplate(data) {
    return `<h2>Congratulations! Admission Confirmed</h2><p>Dear ${data.fullName},</p><p>We are delighted to inform you that your application (${data.applicationId}) for <strong>${data.selectedCourse}</strong> at <strong>${data.institutionName}</strong> has been <strong>ACCEPTED</strong>.</p><h3>Next Steps:</h3><ol><li>Complete fee payment within 7 days</li><li>Submit original documents to the admissions office</li><li>Attend the orientation session (details will follow)</li></ol><p>Welcome to ${data.institutionName}! We look forward to your journey with us.</p><p>Best regards,<br>Admissions Team<br>${data.institutionName}</p>`;
  }

  getRejectionEmailTemplate(data, reason) {
    return `<h2>Admission Application Update</h2><p>Dear ${data.fullName},</p><p>Thank you for your interest in ${data.institutionName}. After careful review, we regret to inform you that your application (${data.applicationId}) for <strong>${data.selectedCourse}</strong> has not been accepted.</p><p><strong>Reason:</strong> ${reason}</p><h3>We encourage you to:</h3><ol><li>Apply for other available courses</li><li>Consider reapplying next academic year</li><li>Contact our admissions office for guidance</li></ol><p>Thank you for considering ${data.institutionName}.</p><p>Best regards,<br>Admissions Team<br>${data.institutionName}</p>`;
  }

  getAcceptanceTextTemplate(data) {
    return `Congratulations ${data.fullName}! Your admission for ${data.selectedCourse} at ${data.institutionName} is confirmed. Application ID: ${data.applicationId}. Complete fee payment within 7 days and submit original documents. Welcome aboard!`;
  }

  getRejectionTextTemplate(data, reason) {
    return `Dear ${data.fullName}, your application ${data.applicationId} for ${data.selectedCourse} at ${data.institutionName} was not accepted. Reason: ${reason}. Please check your email for complete details and next steps.`;
  }
}

export const notificationService = new NotificationService();
export default notificationService;
