import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CourseService } from '../course/course.service.js';
import { NotificationService } from '../notification/notification.service.js';
import { inject } from 'vitest';

@Injectable()
export class EnrollmentService {
    constructor(
        private courseService: CourseService, 
        @Inject(forwardRef(()=>NotificationService))
        private notificationService: NotificationService    
    ){}
    enrollStudent(studentName:string,courseId:string){
        const course = this.courseService.getCourseById(courseId)
        const notification = this.notificationService.sendNotification(studentName,"Student enrolled successfully")
        return {
            message:'Student enrolled successfully',
            student: studentName,
            course: course,
            notification
        }
    }
    getEnrollments(){
        return{
            message:'All enrollments fetched',
            data:[]
        }
    }
}
