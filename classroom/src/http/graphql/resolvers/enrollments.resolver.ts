import { UseGuards } from '@nestjs/common';
import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import {
  CoursesService,
  EnrollmentsService,
  StudentsService,
} from '../../../services';
import { AuthorizationGuard } from '../../auth/authorization.guard';
import { Enrollment } from '../models';

@Resolver(() => Enrollment)
export class EnrollmentResolver {
  constructor(
    private enrollmentsService: EnrollmentsService,
    private coursesService: CoursesService,
    private studentsService: StudentsService,
  ) {}

  @Query(() => [Enrollment])
  @UseGuards(AuthorizationGuard)
  students() {
    return this.enrollmentsService.listAllEnrollments();
  }

  @ResolveField()
  student(@Parent() enrollment: Enrollment) {
    return this.studentsService.getStudentById(enrollment.studentId);
  }

  @ResolveField()
  course(@Parent() enrollment: Enrollment) {
    return this.coursesService.getCustomerById(enrollment.courseId);
  }
}
