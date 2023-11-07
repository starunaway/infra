import { Injectable } from '@nestjs/common';
import { CreateScmVersionDto } from './dto/create-scm-version.dto';
import { UpdateScmVersionDto } from './dto/update-scm-version.dto';

@Injectable()
export class ScmVersionService {
  create(createScmVersionDto: CreateScmVersionDto) {
    return 'This action adds a new scmVersion';
  }

  findAll() {
    return `This action returns all scmVersion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} scmVersion`;
  }

  update(id: number, updateScmVersionDto: UpdateScmVersionDto) {
    return `This action updates a #${id} scmVersion`;
  }

  remove(id: number) {
    return `This action removes a #${id} scmVersion`;
  }
}
