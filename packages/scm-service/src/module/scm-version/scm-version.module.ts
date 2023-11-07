import { Module } from '@nestjs/common';
import { ScmVersionService } from './scm-version.service';
import { ScmVersionController } from './scm-version.controller';

@Module({
  controllers: [ScmVersionController],
  providers: [ScmVersionService]
})
export class ScmVersionModule {}
