import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ThreadCategory } from 'features/thread-categories/thread-category.entity';
import { ThreadCategoryRepository } from 'features/thread-categories/thread-category.repository';
import { ThreadCategoryService } from 'features/thread-categories/thread-category.service';
import { ThreadCategoryController } from 'features/thread-categories/thread-category.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ThreadCategory])],
  controllers: [ThreadCategoryController],
  providers: [ThreadCategoryService, ThreadCategoryRepository],
})
export class ThreadCategoryModule {}
