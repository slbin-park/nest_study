import { CatsService } from './cats.service';
import {
  Controller,
  Delete,
  Get,
  HttpException,
  Patch,
  Post,
  Put,
  UseFilters,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/http-exception.filter';

@Controller('cats')
export class CatsController {
  constructor(private readonly CatsService: CatsService) {}

  @Get()
  @UseFilters(HttpExceptionFilter)
  getAllCat() {
    throw new HttpException('api is broken', 401);
    return 'all cat';
  }

  @Get(':id')
  getOneCat() {
    return 'one cat';
  }

  @Post()
  createCate() {
    return 'create cat';
  }

  @Put(':id')
  updateCat() {
    return 'update cat';
  }

  @Patch(':id')
  updatePartialCat() {
    return '--update';
  }

  @Delete(':id')
  deleteCat() {
    return 'delete service';
  }
}
