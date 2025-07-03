import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { loggerConfig } from './logger.config';
import { CustomLoggerService } from './logger.service';

@Module({
  imports: [
    WinstonModule.forRoot(loggerConfig),
  ],
  providers: [CustomLoggerService],
  exports: [WinstonModule, CustomLoggerService],
})
export class LoggerModule {} 