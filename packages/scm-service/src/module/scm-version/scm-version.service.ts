import { Injectable } from '@nestjs/common';
import { CreateScmVersionDto } from './dto/create-scm-version.dto';
import { UpdateScmVersionDto } from './dto/update-scm-version.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ScmVersionEntity } from './entities/scm-version.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ScmVersionService {
  constructor(
    @InjectRepository(ScmVersionEntity)
    private readonly scmVersionRepository: Repository<ScmVersionEntity>
  ) {}
  async create(createScmVersionDto: CreateScmVersionDto) {
    const { parentId } = createScmVersionDto;

    // 运行事务
    await this.scmVersionRepository.manager.transaction(async (entityManager) => {
      // 获取具有相同parentId的现有版本的数量
      const count = await entityManager.count(ScmVersionEntity, { where: { parentId } });

      createScmVersionDto.verName = (count + 1).toString();
      // 保存新的ScmVersionEntity
      await entityManager.save(createScmVersionDto);
    });
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
