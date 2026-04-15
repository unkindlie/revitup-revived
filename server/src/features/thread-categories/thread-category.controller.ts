import { Controller, Get } from '@nestjs/common';

import { ThreadCategoryService } from 'features/thread-categories/thread-category.service';

@Controller('thread-categories')
export class ThreadCategoryController {
  constructor(private service: ThreadCategoryService) {}

  @Get()
  async getThreadCategories() {
    return this.service.getThreadCategories();
  }
}
