import { HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { CreateScmDto } from './dto/create-scm.dto';
import { UpdateScmDto } from './dto/update-scm.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ScmEntity } from './entities/scm.entity';
import { QueryFailedError, Repository } from 'typeorm';

import { validate } from 'class-validator';
import { ApiException } from 'src/common/filter/http-exception/api.exception';
import { ApiErrorCode } from 'src/common/enums/api-error-code.enum';

@Injectable()
export class ScmService {
  constructor(
    @InjectRepository(ScmEntity)
    private scmRepository: Repository<ScmEntity>,
    @Inject('ScmLogger') private readonly logger: Logger
  ) {}

  async create(createScmDto: CreateScmDto) {
    this.logger.log('createScmDto', createScmDto);
    try {
      await this.scmRepository.save(createScmDto);
    } catch (error) {
      this.logger.error(error);
      if (error instanceof QueryFailedError) {
        // 如果是QueryFailedError，那么可能是因为违反了唯一约束
        throw new ApiException('name 重复', ApiErrorCode.DuplicateException, HttpStatus.OK);
      } else {
        // 如果是其他类型的错误，重新抛出
        throw new ApiException(error.message, ApiErrorCode.DuplicateException, HttpStatus.OK);
      }
    }
  }

  findAll() {
    return `This action returns all scm`;
  }

  async findOne(scm: string) {
    const scmItem = await this.scmRepository.findOne({
      where: {
        name: scm,
      },
    });
    this.logger.log(scm, scmItem);

    if (!scmItem) {
      throw new ApiException(
        `Scm with name ${scm} not found`,
        ApiErrorCode.ScmNotFound,
        HttpStatus.OK
      );
    }

    return scmItem;
  }

  update(id: number, updateScmDto: UpdateScmDto) {
    return `This action updates a #${id} scm`;
  }

  remove(id: number) {
    return `This action removes a #${id} scm`;
  }
}
