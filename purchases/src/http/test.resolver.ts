import { Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'src/database/prisma/prisma.service';

//GraphQL (Fortemente tipado) <-> REST

@Resolver()
export class TestResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => String)
  // @UseGuards(AuthorizationGuard)
  hello() {
    return 'Hello World';
  }
}
