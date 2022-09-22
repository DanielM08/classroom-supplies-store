import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductService } from '../../../services/products.service';
import { AuthorizationGuard } from '../../auth/authorization.guard';
import { CreateProductInput } from '../inputs/create-product-input';
import { Product } from '../models/product';

//GraphQL (Fortemente tipado) <-> REST

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private productsService: ProductService) {}

  @Query(() => [Product])
  products() {
    return this.productsService.listAllProducts();
  }

  @Mutation(() => Product)
  createProduct(@Args('data') data: CreateProductInput) {
    return this.productsService.createProduct(data);
  }
}
