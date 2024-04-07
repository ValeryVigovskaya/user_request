import { Module } from '@nestjs/common';
import { RequestsModule } from './requests/requests.module';
import { JsonModule } from './json/json.module';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

@Module({
  imports: [
    RequestsModule,
    JsonModule,
    WinstonModule.forRoot({
      levels: {
        critical_error: 0,
        error: 1,
        special_warning: 2,
        another_log_level: 3,
        info: 4,
      },
      transports: [
        new winston.transports.Console({ format: winston.format.simple() }),
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
      ],
    }),
  ],
  providers: [],
})
export class AppModule {}
