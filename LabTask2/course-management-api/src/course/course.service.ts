import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto.js';
import { UpdateCourseDto } from './dto/update-course.dto.js';

@Injectable()
export class CourseService {
    getAllCourses(){
        return {
            message: 'All courses fetched successfully',
            data: []
        }
    }
    getCourseById(id:number){
        return {
            message: "Course fetched successfully",
            id:id
        };
    }

    createCourse(dto: CreateCourseDto){
        return {
            message:"Course created successfully",
            data: dto
        }
    }
    updateCourse(id:number,dto: UpdateCourseDto){
        return {
            message: "Course updated successfully",
            id:id,
            data:dto
        };
    }
    patchCourse(id:number, dto:UpdateCourseDto){
        return {
            message:"Course patched successfully",
            id:id,
            updatedFields:Object.keys(dto)
        };
    }
    deleteCourse(id:number){
        return {
            message:"Course deleted successfully"
        };
    }

}
