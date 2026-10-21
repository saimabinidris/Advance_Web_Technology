import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { EnrollmentService } from '../enrollment/enrollment.service.js';

@Injectable()
export class NotificationService {
    constructor(@Inject(forwardRef(()=>EnrollmentService)) private enrollmentService:EnrollmentService){}
    
    sendNotification(studentName:string, message:string){
        return {}
    }
}
