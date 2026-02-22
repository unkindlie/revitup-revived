import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Thread } from 'features/threads/thread.entity';
import { ThreadController } from 'features/threads/thread.controller';
import { ThreadService } from 'features/threads/thread.service';
import { ThreadRepository } from 'features/threads/thread.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Thread])],
  controllers: [ThreadController],
  providers: [ThreadService, ThreadRepository],
  exports: [],
})
export class ThreadModule {}
