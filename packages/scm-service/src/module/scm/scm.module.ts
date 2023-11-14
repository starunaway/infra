import { Module } from '@nestjs/common';
import { ScmService } from './scm.service';
import { ScmController } from './scm.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScmEntity } from './entities/scm.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ScmEntity])],
  controllers: [ScmController],
  providers: [ScmService],
  exports: [ScmService], // 在这里导出 ScmService
})
export class ScmModule {}
