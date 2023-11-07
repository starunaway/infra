import { PartialType } from '@nestjs/mapped-types';
import { CreateScmVersionDto } from './create-scm-version.dto';

export class UpdateScmVersionDto extends PartialType(CreateScmVersionDto) {}
