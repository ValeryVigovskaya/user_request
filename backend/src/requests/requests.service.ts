import { Injectable } from '@nestjs/common';
import { Request } from './entities/request.entity';
import { JsonService } from 'src/json/json.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { NotFoundExceptionCustom } from 'src/errors/not-found';

@Injectable()
export class RequestsService {
  constructor(private readonly jsonService: JsonService) {}

  async findAll(): Promise<Request[] | null> {
    const requests = await this.jsonService.read();
    return requests;
  }

  async create(createRequestDto: CreateRequestDto): Promise<Request> {
    //записали значение в массив
    return await this.jsonService.write(createRequestDto);
  }

  async findOne(id: number): Promise<Request> {
    const requests = await this.findAll();
    const request = requests.find((item) => item.id === id);
    if (!request) {
      throw new NotFoundExceptionCustom('Запрашиваемое обращение не найдено');
    }
    return request;
  }
  //метод для пагинации
  async findPage(
    page: number,
    pageSize: number,
  ): Promise<{
    objectsOnPage: Request[];
    totalCount: number;
  }> {
    //сначала находим число всех элементов массива
    const allObjects = await this.findAll();
    //найдем начальную и конечные indeксы
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    //отрезали от старта до конечного значения
    const objectsOnPage = allObjects.slice(start, end);
    return {
      objectsOnPage: objectsOnPage,
      totalCount: allObjects.length,
    };
  }
}
