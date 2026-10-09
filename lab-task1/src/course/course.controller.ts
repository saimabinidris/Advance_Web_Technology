import { Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import {CourseService} from './course.service.js';

@Controller('course')
export class CourseController {
    constructor(private readonly courseService: CourseService) {}
    @Get()
    getAllCourses(): string{
        return "";
    }
    @Post()
    createCourse(): string{
        return "";
    }
    @Get(":id")
    getCourseById(@Param('id') id: string): string{
        return "";
    }
    @Put(":id")
    updateCourse(@Param("id") id:string):string{
        return "";
    }
    @Patch(":id")
    patchCourse(@Param("id") id:string):string{
        return "";
    }
    @Delete(":id")
    deleteCourse(@Param("id") id:string):string{
        return "";
    }
}
