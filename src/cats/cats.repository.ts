import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cat } from './cat.schema';
import { CatRequestDto } from './dto/cats.request.dto';

@Injectable()
export class CatsRepository {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  async findCatByIdWithoutPassword(catId: string): Promise<Cat | null> {
    const cat = await this.catModel.findById(catId).select('-password');
    // select 는 원하는것만 고를수 있음 -는 컬럼을 빼는것임
    // 'email name' 이렇게 하면 email , name 두개를 가져옴
    return cat;
  }
  async findCatByEmail(email: string): Promise<Cat | null> {
    const cat = await this.catModel.findOne({ email });
    return cat;
  }

  async existsByEmail(email: string): Promise<any> {
    const result = await this.catModel.exists({ email });
    return result;
  }

  async create(cat: CatRequestDto): Promise<Cat> {
    return await this.catModel.create(cat);
  }
}
