import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CustomerService } from '../../../services/customer.service';
import { PurchasesService } from '../../../services/purchases.service';
import { AuthUser, CurrentUser } from '../../auth/current-user';
import { Customer } from '../models/customer';

@Resolver(() => Customer)
export class CustomerResolver {
  constructor(
    private customersService: CustomerService,
    private purchasesService: PurchasesService,
  ) {}

  @Query(() => Customer)
  me(@CurrentUser() user: AuthUser) {
    return this.customersService.getCustomerByAuthId(user.sub);
  }

  @ResolveField()
  purchases(@Parent() customer: Customer) {
    return this.purchasesService.listAllFromCustomer(customer.id);
  }
}
