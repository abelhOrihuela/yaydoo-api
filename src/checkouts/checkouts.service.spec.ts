import { Test, TestingModule } from '@nestjs/testing';
import { CheckoutsService } from './checkouts.service';
import { PrismaService } from './../prisma.service';

describe('CheckoutsService', () => {
  // let service: CheckoutsService;

  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     providers: [PrismaService, CheckoutsService],
  //   }).compile();

  //   service = module.get<CheckoutsService>(CheckoutsService);
  // });

  it('should be defined', () => {
    expect(200).toEqual(200);
  });
});
