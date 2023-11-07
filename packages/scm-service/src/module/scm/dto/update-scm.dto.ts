import { PartialType } from '@nestjs/mapped-types';
import { CreateScmDto } from './create-scm.dto';

export class UpdateScmDto extends PartialType(CreateScmDto) {}
