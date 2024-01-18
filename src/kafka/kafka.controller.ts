import { Controller, Get } from '@nestjs/common';
import { KafkaService } from './kafka.service';
import { KafkaRequestMapper } from './mapper/kafka-request.mapper';
import { BodyRequestDto } from './dto/body-request.dto';

@Controller('kafka-client')
export class KafkaController {
  constructor(private readonly kafkaService: KafkaService) {}

  @Get('produce')
  async produceMessage(bodyRequestDto: BodyRequestDto): Promise<string> {
    // map the dto into the domain
    const kafkaRequest = KafkaRequestMapper.toKafkaRequest(bodyRequestDto);
    await this.kafkaService.produceMessage(kafkaRequest);
    return 'Message produced';
  }

  @Get('consume')
  async consumeMessages(): Promise<string> {
    await this.kafkaService.consumeMessages('your-topic');
    return 'Listening for messages';
  }
}