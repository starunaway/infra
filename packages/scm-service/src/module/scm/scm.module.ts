import { Logger, Module } from '@nestjs/common';
import { ScmService } from './scm.service';
import { ScmController } from './scm.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScmEntity } from './entities/scm.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ScmEntity])],
  controllers: [ScmController],
  providers: [
    ScmService,
    {
      provide: 'ScmLogger',
      useFactory: () => {
        return new Logger('Scm');
      },
    },
  ],
  exports: [ScmService], // 在这里导出 ScmService
})
export class ScmModule {}
