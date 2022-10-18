import fs from 'fs'
import readline from 'readline'

export const createProducerConfigMap = config => {
    if (Object.prototype.hasOwnProperty.call(config, 'security.protocol')) {
        return {
            'bootstrap.servers': config['bootstrap.servers'],
            'sasl.username': config['sasl.username'],
            'sasl.password': config['sasl.password'],
            'security.protocol': config['security.protocol'],
            'sasl.mechanisms': config['sasl.mechanisms'],
            dr_msg_cb: true,
        }
    } else {
        return {
            'bootstrap.servers': config['bootstrap.servers'],
            dr_msg_cb: true,
        }
    }
}

export const createConsumerConfigMap = config => {
    if (Object.prototype.hasOwnProperty.call(config, 'security.protocol')) {
        return {
            'bootstrap.servers': config['bootstrap.servers'],
            'sasl.username': config['sasl.username'],
            'sasl.password': config['sasl.password'],
            'security.protocol': config['security.protocol'],
            'sasl.mechanisms': config['sasl.mechanisms'],
        }
    } else {
        return {
            'bootstrap.servers': config['bootstrap.servers'],
            'enable.auto.commit': false,
        }
    }
}

const readAllLines = (path: string) => {
    const lines = []
    const allFileContents = fs.readFileSync(path, 'utf-8')
    allFileContents.split(/\r?\n/).forEach(line => {
        lines.push(line)
    })
    return lines
}

export const configFromPath = (path: string) => {
    const lines = readAllLines(path)

    return lines
        .filter(line => !/^\s*?#/.test(line))
        .map(line => line.split('=').map(s => s.trim()))
        .reduce((config, [k, v]) => {
            config[k] = v
            return config
        }, {})
}
