import { Controller, Get, Param, Query } from '@nestjs/common';

import { PaginatedQuery } from 'common/types/pagination.type';

import { DisciplineService } from 'features/disciplines/discipline.service';

@Controller('disciplines')
export class DisciplineController {
  constructor(private service: DisciplineService) {}

  @Get()
  async getDisciplines(@Query() query: PaginatedQuery) {
    return this.service.getDisciplines();
  }

  @Get(':code')
  async getDisciplineByCode(@Param('code') code: string) {
    return this.service.getDisciplineByCode(code);
  }
}
