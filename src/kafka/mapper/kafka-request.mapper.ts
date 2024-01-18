import { KafKaRequest } from "../domain/kafka-request";
import { BodyRequestDto } from "../dto/body-request.dto";

export class KafkaRequestMapper {

    static toKafkaRequest(bodyRequestDto: BodyRequestDto): KafKaRequest {
        const kafkaRequest = new KafKaRequest();
        kafkaRequest.topic = bodyRequestDto.topic;
        kafkaRequest.message = bodyRequestDto.message;
        return kafkaRequest;
    }
}