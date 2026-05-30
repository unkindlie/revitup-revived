import { Controller, Get, Query } from '@nestjs/common';

import { SearchService } from 'features/search/search.service';

@Controller('search')
export class SearchController {
  constructor(private service: SearchService) {}

  @Get()
  async search(@Query('q') q: string) {
    const items = await this.service.search(q);
    return { items };
  }
}
