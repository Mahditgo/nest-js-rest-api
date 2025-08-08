import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { EmployeeModule } from './employee/employee.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from "@nestjs/core";
import { MyLoggerModule } from './my-logger/my-logger.module';

@Module({
  imports: [
    DatabaseModule,
    EmployeeModule,
    ThrottlerModule.forRoot([{
      ttl : 60000,
      limit : 10
    }]),
    MyLoggerModule

  ],
  controllers: [AppController],
  providers: [AppService, {
    provide : APP_GUARD,
    useClass : ThrottlerGuard
  }],
})
export class AppModule {}
