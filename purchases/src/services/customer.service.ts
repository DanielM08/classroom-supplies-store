import { Injectable } from '@nestjs/common';

import { PrismaService } from '../database/prisma/prisma.service';

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}

  async getCustomerByAuthId(authUserId: string) {
    return this.prisma.customer.findUnique({
      where: {
        authUserId,
      },
    });
  }

  async createCustomer(authUserId: string) {
    return this.prisma.customer.create({
      data: {
        authUserId,
      },
    });
  }
}
