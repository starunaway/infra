import { PartialType } from '@nestjs/mapped-types';
import { ScmEntity } from '../entities/scm.entity';

export class UpdateScmDto extends PartialType(ScmEntity) {}
