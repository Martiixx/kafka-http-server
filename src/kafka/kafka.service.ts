import { Injectable } from '@nestjs/common';
import { Kafka, logLevel } from 'kafkajs';
import { KafKaRequest } from './domain/kafka-request';

@Injectable()
export class KafkaService {
    private kafka: Kafka;

    constructor() {
    this.kafka = new Kafka({
      clientId: 'your-client-id',
      brokers: ['kafka-broker-1:9092', 'kafka-broker-2:9092'],
      logLevel: logLevel.INFO,
    });
  }

  async produceMessage(kafkaRequest: KafKaRequest): Promise<void> {
    const { topic, message } = kafkaRequest;

    const producer = this.kafka.producer();
    await producer.connect();
    await producer.send({
      topic,
      messages: [{ value: JSON.stringify(message) }],
    });
    await producer.disconnect();
  }

  async consumeMessages(topic: string): Promise<void> {
    const consumer = this.kafka.consumer({ groupId: 'your-group-id' });

    await consumer.connect();
    await consumer.subscribe({ topic });
    await consumer.run({
      eachMessage: async ({ message }) => {
        console.log(`Received message: ${message.value.toString()}`);
      },
    });
  }
}
