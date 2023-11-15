import { Logger, Module } from '@nestjs/common';
import { ScmVersionService } from './scm-version.service';
import { ScmVersionController } from './scm-version.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScmVersionEntity } from './entities/scm-version.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ScmVersionEntity])],
  controllers: [ScmVersionController],
  providers: [
    ScmVersionService,
    {
      provide: 'ScmVersionLogger',
      useFactory: () => {
        return new Logger('ScmVersion');
      },
    },
  ],
  exports: [ScmVersionService],
})
export class ScmVersionModule {}
