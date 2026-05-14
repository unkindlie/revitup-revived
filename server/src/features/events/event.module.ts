import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Event } from 'features/events/event.entity';
import { EventController } from 'features/events/event.controller';
import { EventService } from 'features/events/event.service';
import { EventRepository } from 'features/events/event.repository';
import { ImageModule } from 'features/images/image.module';

@Module({
  imports: [TypeOrmModule.forFeature([Event]), ImageModule],
  controllers: [EventController],
  providers: [EventService, EventRepository],
  exports: [],
})
export class EventModule {}
