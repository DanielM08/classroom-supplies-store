import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import {
  CoursesService,
  EnrollmentsService,
  StudentsService,
} from '../../services';

export interface PurchaseCreatedPayload {
  customer: Customer;
  product: Product;
}

export interface Customer {
  authUserId: string;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
}

@Controller()
export class PurchaseController {
  constructor(
    private studentsService: StudentsService,
    private coursesService: CoursesService,
    private enrollmentsServices: EnrollmentsService,
  ) {}

  @EventPattern('purchases.new-purchase')
  async purchaseCreated(@Payload() payload: PurchaseCreatedPayload) {
    let student = await this.studentsService.getStudentByAuthId(
      payload.customer.authUserId,
    );

    if (!student) {
      student = await this.studentsService.createStudent({
        authUserId: payload.customer.authUserId,
      });
    }

    let course = await this.coursesService.getCustomerBySlug(
      payload.product.slug,
    );

    if (!course) {
      course = await this.coursesService.createCourse({
        slug: payload.product.slug,
        title: payload.product.title,
      });
    }

    await this.enrollmentsServices.createEnrollment({
      courseId: course.id,
      studentId: student.id,
    });
  }
}
