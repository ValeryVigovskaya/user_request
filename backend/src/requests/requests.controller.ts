import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpCode,
  Query,
  UseFilters,
} from '@nestjs/common';
import { RequestsService } from './requests.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { AllExceptionsFilter } from 'src/interceptors/exceptions-filter';

const PAGE_SIZE = 5;

@UseFilters(AllExceptionsFilter)
@Controller('requests')
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  @Post()
  @HttpCode(201)
  create(@Body() request: CreateRequestDto) {
    return this.requestsService.create(request);
  }

  @Get()
  findAll() {
    return this.requestsService.findAll();
  }

  @Get('/page')
  async findPage(@Query('page') page: number) {
    const { objectsOnPage, totalCount } = await this.requestsService.findPage(
      page,
      PAGE_SIZE,
    );
    return { objectsOnPage, totalCount };
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.requestsService.findOne(id);
  }
}
