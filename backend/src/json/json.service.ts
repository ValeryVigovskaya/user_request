import { Injectable } from '@nestjs/common';
import { join } from 'path';
import * as fs from 'fs';
import { Request } from '../requests/entities/request.entity';
import { v4 as uuidv4 } from 'uuid';
import { CreateRequestDto } from 'src/requests/dto/create-request.dto';
import { TStatuses } from 'src/utils/types';

@Injectable()
export class JsonService {
  private data: string;
  private counter: number;
  private filePath: string;
  constructor() {
    this.filePath = join(process.cwd(), 'data/data.json');
    this.data = '';
    this.counter = 1;
  }
  //описание метода чтения json файла
  async read(): Promise<Request[] | null> {
    try {
      //читается файл и записыватся в переменную
      const data = await fs.promises.readFile(this.filePath, 'utf8');
      this.data = data;
      //значение парсится до массива объектов
      const existingData: Request[] = JSON.parse(data)['requests'] || [];
      //если массив не пустой, то номер обращения запишется в переменную в зависимости от последнего
      if (existingData) {
        this.counter = existingData[existingData.length - 1].requestNumber + 1;
      } else {
        this.counter = this.counter + 1; //иначе просто будет начало с единицы
      }
      return existingData;
    } catch (error) {
      if (
        error instanceof SyntaxError &&
        error.message === 'Unexpected end of JSON input'
      ) {
        return []; //при ошибке, если файл пустой, возвращается пустой массив
      } else {
        throw error;
      }
    }
  }
  //преобразование данных, чтобы подгружались как в бд
  convertData(newObject: CreateRequestDto) {
    return {
      id: uuidv4(), //чтобы id было уникальным использую библиотеку
      createdAt: new Date(),
      requestNumber: this.counter,
      type: newObject.type,
      caption: newObject.caption,
      username: newObject.username,
      img: newObject.img || null,
      status: 'В очереди' as TStatuses,
    };
  }
  //описание метода записи нового объекта
  async write(newObject: CreateRequestDto): Promise<Request> {
    //вызывается метод чтения файла
    let existingData: Request[] = await this.read();
    //конвертируется переданный объект с дополнением свойств, которые предполагается, добавлены через бд
    const convertData = this.convertData(newObject);
    //записали в массив
    existingData.push(convertData);

    const dataToWrite = {
      requests: existingData,
    };
    //запускается запись в файл
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(dataToWrite));
      // Обновляем данные в памяти после записи в файл, чтобы на фронте после закрытия формы обновлялся список обращений
      existingData = dataToWrite.requests;
    } catch (error) {
      throw error;
    }
    // Возвращаем сохраненный объект, который был добавлен в массив
    return convertData;
  }
}
