import { Body, Controller, Get, Post, Query } from '@nestjs/common';

import { SearchService } from 'features/search/search.service';

@Controller('search')
export class SearchController {
  constructor(private service: SearchService) {}

  @Get()
  async search(@Query('q') q: string) {
    return await this.service.search(q);
  }

  @Post('items')
  async fetchItems(
    @Body()
    body: {
      items: Array<{
        type: 'article' | 'event' | 'discipline';
        id: number;
      }>;
    },
  ) {
    return await this.service.fetchItems(body.items ?? []);
  }
}
