import { Module } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { RequestsController } from './requests.controller';
import { Request } from './entities/request.entity';
import { JsonService } from 'src/json/json.service';

@Module({
  imports: [Request],
  controllers: [RequestsController],
  providers: [RequestsService, JsonService],
})
export class RequestsModule {}
