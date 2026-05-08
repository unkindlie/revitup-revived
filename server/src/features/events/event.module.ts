import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Event } from 'features/events/event.entity';
import { EventController } from 'features/events/events.controller';
import { EventService } from 'features/events/event.service';
import { EventRepository } from 'features/events/event.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Event])],
  controllers: [EventController],
  providers: [EventService, EventRepository],
  exports: [],
})
export class EventModule {}
