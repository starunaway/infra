import { Test, TestingModule } from '@nestjs/testing';
import { ScmVersionService } from './scm-version.service';

describe('ScmVersionService', () => {
  let service: ScmVersionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScmVersionService],
    }).compile();

    service = module.get<ScmVersionService>(ScmVersionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
