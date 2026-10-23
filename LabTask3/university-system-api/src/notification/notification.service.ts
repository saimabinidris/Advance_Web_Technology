import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { EnrollmentService } from '../enrollment/enrollment.service.js';

@Injectable()
export class NotificationService {
    constructor(
 @Inject(forwardRef(() => EnrollmentService))
 private enrollmentService: EnrollmentService,
) {}
    
    sendNotification(studentName:string, message:string){
        return {
            message: 'Notification sent successfully',
            student: studentName,
            notification: message
        }
    }

    checkEnrollmentAndNotify(studentName:string, courseId:string){
        const enrollments = this.enrollmentService.getEnrollments()
        const notification = this.sendNotification(
            studentName,
            `Enrollment information checked for course ${courseId}.`,
        );

        return {
            message: 'Enrollment checked and notification sent',
            student: studentName,
            courseId,
            enrollments,
            notification,
        };
    }
}
