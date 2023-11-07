import { Injectable } from '@nestjs/common';
import { CreateScmDto } from './dto/create-scm.dto';
import { UpdateScmDto } from './dto/update-scm.dto';

@Injectable()
export class ScmService {
  create(createScmDto: CreateScmDto) {
    return 'This action adds a new scm';
  }

  findAll() {
    return `This action returns all scm`;
  }

  findOne(id: number) {
    return `This action returns a #${id} scm`;
  }

  update(id: number, updateScmDto: UpdateScmDto) {
    return `This action updates a #${id} scm`;
  }

  remove(id: number) {
    return `This action removes a #${id} scm`;
  }
}
