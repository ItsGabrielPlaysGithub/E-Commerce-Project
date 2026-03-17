import { InputType, PartialType } from '@nestjs/graphql';
import { CreateProductDto } from './create.products';

@InputType()
export class UpdateProductDto extends PartialType(CreateProductDto) {
}
