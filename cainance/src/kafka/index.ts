import {
    createProducerConfigMap,
    createConsumerConfigMap,
    configFromPath,
} from './utils'

const KafkaConfig = {
    configFromPath,
    createConsumerConfigMap,
    createProducerConfigMap,
}

export default KafkaConfig
