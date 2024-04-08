import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';
import { TTypes } from 'src/utils/types';

export class CreateRequestDto {
  @IsString()
  @Length(2, 30)
  @IsNotEmpty()
  username: string;

  @IsString()
  type: TTypes;

  @IsString()
  @Length(50, 3000)
  @IsNotEmpty()
  caption: string;

  @IsUrl()
  @IsOptional()
  img: string[];
}
