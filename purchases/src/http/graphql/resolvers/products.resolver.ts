import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductService } from '../../../services/products.service';
import { CreateProductInput } from '../inputs/create-product-input';
import { Product } from '../models/product';

//GraphQL (Fortemente tipado) <-> REST

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private productsService: ProductService) {}

  @Query(() => [Product])
  // @UseGuards(AuthorizationGuard)
  products() {
    return this.productsService.listAllProducts();
  }

  @Mutation(() => Product)
  createProduct(@Args('data') data: CreateProductInput) {
    return this.productsService.createProduct(data);
  }
}
