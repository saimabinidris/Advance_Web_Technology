import { Body, Controller, Delete, Get, Param, Patch, Post, Put,ParseIntPipe, UseInterceptors, ParseFilePipe, MaxFileSizeValidator, UploadedFile } from '@nestjs/common';
import {CourseService} from './course.service.js'
import { CreateCourseDto } from './dto/create-course.dto.js';
import { UpdateCourseDto } from './dto/update-course.dto.js';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { promises as fs } from 'fs';


@Controller('course')
export class CourseController {
    constructor(private readonly courseService: CourseService) {}
    
    @Get()
    getAllCourses(){
        return this.courseService.getAllCourses();
    }
    @Post() 
    createCourse(@Body() dto:CreateCourseDto){
        return this.courseService.createCourse(dto);
    }
    @Get(":id")
    getCourseById(@Param('id') id: number){
        return this.courseService.getCourseById(id);
    }
    @Put(":id")
    updateCourse(@Param("id") id:number, @Body() dto:UpdateCourseDto){
        return this.courseService.updateCourse(id,dto);
    }
    @Patch(":id")
    patchCourse(@Param("id") id:number, @Body() dto:UpdateCourseDto){
        return this.courseService.patchCourse(id, dto);
    }
    @Delete(":id")
    deleteCourse(@Param("id") id:number){
        return this.courseService.deleteCourse(id);
    }

    @Post(":id/upload")
    @UseInterceptors(
    FileInterceptor('file', {
        storage: diskStorage({
          destination: './uploads',
          filename: (req, file, cb) => {
            const fileName = Date.now() + file.originalname;
            cb(null, fileName);
          },
        }),
    }),
    )
  async uploadCourseMaterial(
    @Param('id') id: number,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 1024 * 1024 * 2,
          }),
        ],
      }),
    )
    file: Express.Multer.File,) 
    {
        const fileName = Date.now() + file.originalname;
        const path = `./uploads/${fileName}`;
        await fs.writeFile(path, file.buffer);

        console.log(file.originalname);
        console.log(file.mimetype);
        console.log(file.size);
    }
}
