import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import 'multer';

import { PaginatedQuery } from 'common/types/pagination.type';

import { Roles } from 'features/auth/decorators/roles.decorator';
import { AccessTokenGuard } from 'features/auth/guards/access-token.guard';
import { EventCreateDto, EventUpdateDto } from 'features/events/dto';
import { EventService } from 'features/events/event.service';
import { UserRole } from 'features/user/enums/user-role.enum';

@Controller('events')
export class EventController {
  constructor(private service: EventService) {}

  @Get()
  async getEvents(@Query() routeQuery: PaginatedQuery) {
    const [events, totalCount] = await this.service.getEvents(routeQuery);

    return {
      items: events,
      totalCount,
      query: {
        ...routeQuery,
        totalPages: Math.ceil(totalCount / (routeQuery.take ?? 1)),
      },
    };
  }

  @Get(':id')
  async getEventById(@Param('id', ParseIntPipe) id: number) {
    return this.service.getEventById(id);
  }

  @Post()
  @Roles([UserRole.ADMIN])
  @UseGuards(AccessTokenGuard)
  @UseInterceptors(FileInterceptor('mainImage'))
  async createEvent(
    @Body() body: EventCreateDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    await this.service.createEvent(body, file);

    return { message: 'Event created successfully' };
  }

  @Patch()
  @Roles([UserRole.ADMIN])
  @UseGuards(AccessTokenGuard)
  async updateEvent(@Body() body: EventUpdateDto) {
    await this.service.updateEvent(body);

    return { message: 'Event updated successfully' };
  }

  @Delete()
  @Roles([UserRole.ADMIN])
  @UseGuards(AccessTokenGuard)
  async deleteEvent(@Body('id', ParseIntPipe) id: number) {
    await this.service.deleteEvent(id);

    return { message: 'Event deleted successfully' };
  }
}
