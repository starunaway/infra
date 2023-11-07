import { Module } from '@nestjs/common';
import { ScmService } from './scm.service';
import { ScmController } from './scm.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScmEntity } from './entities/scm.entity';
import { ScmVersionEntity } from 'src/module/scm-version/entities/scm-version.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ScmEntity, ScmVersionEntity])],
  controllers: [ScmController],
  providers: [ScmService],
})
export class ScmModule {}
