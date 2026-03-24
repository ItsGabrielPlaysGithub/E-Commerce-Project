import { Module } from '@nestjs/common';
import { PaymongoService } from './paymongo.service';
import { PaymongoController } from './paymongo.controller';

@Module({
  providers: [PaymongoService],
  controllers: [PaymongoController],
  exports: [PaymongoService], // Export for use in other modules
})
export class PaymongoModule {}
