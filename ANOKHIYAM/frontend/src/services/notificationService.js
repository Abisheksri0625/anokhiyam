import { collection, addDoc, updateDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../config/firebase';

export const notificationService = {
  // Queue SMS notification
  async queueSMS(studentId, institutionCode, phone, message) {
    try {
      await addDoc(collection(db, 'notifications'), {
        studentId,
        institutionCode,
        type: 'sms',
        recipient: phone,
        message,
        status: 'pending',
        createdAt: new Date(),
        attempts: 0
      });
      console.log('SMS notification queued for:', phone);
      return { success: true };
    } catch (error) {
      console.error('Error queuing SMS:', error);
      throw error;
    }
  },

  // Queue Email notification
  async queueEmail(studentId, institutionCode, email, message, subject = 'Admission Update') {
    try {
      await addDoc(collection(db, 'notifications'), {
        studentId,
        institutionCode,
        type: 'email',
        recipient: email,
        message,
        subject,
        status: 'pending',
        createdAt: new Date(),
        attempts: 0
      });
      console.log('Email notification queued for:', email);
      return { success: true };
    } catch (error) {
      console.error('Error queuing email:', error);
      throw error;
    }
  },

  // Send acceptance notifications
  async sendAcceptanceNotifications(application) {
    const { personalInfo, contactInfo, uid, institutionCode } = application;
    
    const smsMessage = `🎉 Congratulations ${personalInfo.firstName}! Your admission application has been ACCEPTED. Please visit the college within 7 days for fee payment and document verification. Contact: +91-XXXXXXXXXX`;
    
    const emailMessage = `
Dear ${personalInfo.firstName} ${personalInfo.lastName},

Congratulations! We are pleased to inform you that your admission application has been ACCEPTED.

Next Steps:
1. Visit the college within 7 days for fee payment
2. Bring all original documents for verification
3. Complete the admission formalities

College Address: [Your College Address]
Contact: +91-XXXXXXXXXX
Email: admissions@college.edu

We look forward to welcoming you to our institution.

Best regards,
Admission Committee
    `;

    // Send SMS
    if (contactInfo.studentPhone) {
      await this.queueSMS(uid, institutionCode, contactInfo.studentPhone, smsMessage);
    }

    // Send Email
    if (contactInfo.studentEmail) {
      await this.queueEmail(uid, institutionCode, contactInfo.studentEmail, emailMessage, 'Admission Accepted - Action Required');
    }

    // Notify parents if available
    if (contactInfo.fatherPhone) {
      const parentSMS = `Your ward ${personalInfo.firstName} ${personalInfo.lastName} has been accepted for admission. Please visit college within 7 days.`;
      await this.queueSMS(uid, institutionCode, contactInfo.fatherPhone, parentSMS);
    }
  },

  // Send rejection notifications
  async sendRejectionNotifications(application, reason = 'Limited seats available') {
    const { personalInfo, contactInfo, uid, institutionCode } = application;
    
    const smsMessage = `Dear ${personalInfo.firstName}, we regret to inform you that your admission application has been rejected due to ${reason}. Thank you for your interest in our institution.`;
    
    const emailMessage = `
Dear ${personalInfo.firstName} ${personalInfo.lastName},

We regret to inform you that your admission application has been rejected.

Reason: ${reason}

We received a large number of applications this year, and due to limited seats, we were unable to offer admission to all qualified candidates.

We appreciate your interest in our institution and wish you success in your future endeavors.

Best regards,
Admission Committee
    `;

    // Send SMS
    if (contactInfo.studentPhone) {
      await this.queueSMS(uid, institutionCode, contactInfo.studentPhone, smsMessage);
    }

    // Send Email
    if (contactInfo.studentEmail) {
      await this.queueEmail(uid, institutionCode, contactInfo.studentEmail, emailMessage, 'Admission Application Status');
    }
  },

  // Process notification queue (this would be called by a background service)
  async processNotificationQueue() {
    try {
      const q = query(
        collection(db, 'notifications'),
        where('status', '==', 'pending')
      );
      
      const querySnapshot = await getDocs(q);
      const notifications = [];
      querySnapshot.forEach((doc) => {
        notifications.push({ id: doc.id, ...doc.data() });
      });

      console.log(`Processing ${notifications.length} pending notifications`);

      // In a real application, you would integrate with actual SMS/Email services here
      // For demo purposes, we'll just mark them as sent
      for (const notification of notifications) {
        await updateDoc(doc(db, 'notifications', notification.id), {
          status: 'sent',
          sentAt: new Date(),
          attempts: notification.attempts + 1
        });
        
        // Simulate sending delay
        console.log(`${notification.type.toUpperCase()} sent to ${notification.recipient}: ${notification.message.substring(0, 50)}...`);
      }

      return { processed: notifications.length };
    } catch (error) {
      console.error('Error processing notifications:', error);
      throw error;
    }
  }
};
