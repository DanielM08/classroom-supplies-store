import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ProductService } from '../../../services/products.service';
import { PurchasesService } from '../../../services/purchases.service';
import { CurrentUser } from '../../auth/current-user';
import { CreatePurchaseInput } from '../inputs/create-purchase-input';
import { Purchase } from '../models/purchase';

@Resolver(() => Purchase)
export class PurchasesResolver {
  constructor(
    private purchasesService: PurchasesService,
    private productsService: ProductService,
  ) {}

  @Query(() => [Purchase])
  // @UseGuards(AuthorizationGuard)
  purchases() {
    return this.purchasesService.listAllPurchases();
  }

  @ResolveField()
  product(@Parent() purchase: Purchase) {
    return this.productsService.getProductById(purchase.productId);
  }

  @Mutation(() => Purchase)
  createPurchase(@Args('data') data: CreatePurchaseInput, @CurrentUser() user) {
    return null;
  }
}
