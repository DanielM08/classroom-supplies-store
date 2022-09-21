import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import {
  CoursesService,
  EnrollmentsService,
  StudentsService,
} from '../services';
import { PurchaseController } from './controllers/purchases.controller';

// HTTP (MVC)
// Nest trata os receptores de mensagens do kafka também como controllers

@Module({
  imports: [DatabaseModule],
  controllers: [PurchaseController],
  providers: [StudentsService, CoursesService, EnrollmentsService],
})
export class MessagingModule {}
