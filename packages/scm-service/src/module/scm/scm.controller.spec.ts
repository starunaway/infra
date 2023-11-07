import { Test, TestingModule } from '@nestjs/testing';
import { ScmController } from './scm.controller';
import { ScmService } from './scm.service';

describe('ScmController', () => {
  let controller: ScmController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScmController],
      providers: [ScmService],
    }).compile();

    controller = module.get<ScmController>(ScmController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
