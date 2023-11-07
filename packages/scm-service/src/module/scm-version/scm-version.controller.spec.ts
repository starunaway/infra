import { Test, TestingModule } from '@nestjs/testing';
import { ScmVersionController } from './scm-version.controller';
import { ScmVersionService } from './scm-version.service';

describe('ScmVersionController', () => {
  let controller: ScmVersionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScmVersionController],
      providers: [ScmVersionService],
    }).compile();

    controller = module.get<ScmVersionController>(ScmVersionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
