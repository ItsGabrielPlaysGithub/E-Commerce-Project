import { Field, InputType } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsEmail,
  MinLength,
  MaxLength,
} from 'class-validator';

@InputType()
export class LoginDto {
  @Field()
  @IsNotEmpty()
  @IsString()
  @IsEmail({}, { message: 'Invalid email format' })
  @MaxLength(255)
  emailAddress: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  @MaxLength(255)
  password: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  role?: string;
}
