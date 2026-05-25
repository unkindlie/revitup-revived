import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CircuitEntity } from 'features/circuits/circuit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CircuitEntity])],
})
export class CircuitModule {}
