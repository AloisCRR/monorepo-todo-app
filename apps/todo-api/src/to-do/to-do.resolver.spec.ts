import { Test, TestingModule } from '@nestjs/testing';
import { ToDoResolver } from './to-do.resolver';

describe('ToDoResolver', () => {
  let resolver: ToDoResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ToDoResolver]
    }).compile();

    resolver = module.get<ToDoResolver>(ToDoResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
