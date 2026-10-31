import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from './entities/products.entity.js';
import { ILike, Repository } from 'typeorm';
import { CreateProductDto } from './dtos/create-product.dto.js';
import { PartialUpdateProductDto } from './dtos/partial-update-product.dto.js';
import { UpdateProductDto } from './dtos/update-product.dto.js';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Products)
        private productsRepo:Repository<Products>
    ){}
    async create(dto:CreateProductDto){
        const product=this.productsRepo.create(dto)
        const saved=await this.productsRepo.save(product)
        return{
            message:"Product created successfully",
            data:saved
        }
    }
    async findAll(){
        const products = await this.productsRepo.find({
            order:{
                createdAt:'DESC'
            }
        })
        if(products.length==0){
            throw new NotFoundException('No products found')
        }
        return {
            message:'Products retrived successfully',
            count:products.length,
            data:products
        }
    }
    async findOne(id:number){
        const product = await this.productsRepo.findOneBy({id:id})
        if(!product){
            throw new NotFoundException('Product not found')
        }
        return {
            message:'Product retrived successfully',
            data:product
        }
    }
    async update(id:number,dto:PartialUpdateProductDto){
        const product=(await this.findOne(id)).data
        await this.productsRepo.update(id,dto)
        const updated = (await this.findOne(id)).data
        return{
            message:'Product updated successfully',
            data:updated
        }
    }
    async replace(id:number,dto:UpdateProductDto){
        await this.findOne(id)
        await this.productsRepo.update(id,dto)
        const replaced = await this.findOne(id)
        return{
            message:'Product replaced successfully',
            data:replaced
        }
    }
    async remove(id:number){
        const result = await this.productsRepo.delete(id)
        if(result.affected){
            return{
                message:'Product deleted successfully',
                id
            }
        }else{
            throw new NotFoundException(`Product with ID ${id} not found`)
        }
    }
    async findByCategory(category:string){
        const products = await this.productsRepo.find({
            where:{
                category:category
            }
        })
        return{
            message:`Products in category ${category}`,
            count:products.length,
            data:products
        }
    }
    async search(keyword:string){
        const products=await this.productsRepo.find({
            where:{
                name:ILike(`%${keyword}`)
            }
        })
        return{
            message:`Search result for ${keyword}`,
            count:products.length,
            data:products
        }
    }
    async toggleActive(id:number){
        const product=await this.productsRepo.findOneBy({id:id})
        if(!product){
            throw new NotFoundException('Product not found')
        }
        product.isActive = !product.isActive;
        const saved = await this.productsRepo.save(product)
        return{
            message:`Product is now ${saved.isActive?'active':'inactive'}`,
            data:saved
        }
    }
    
}
