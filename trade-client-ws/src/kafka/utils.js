"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configFromPath = exports.createConsumerConfigMap = exports.createProducerConfigMap = void 0;
const tslib_1 = require("tslib");
const fs_1 = tslib_1.__importDefault(require("fs"));
const createProducerConfigMap = config => {
    if (Object.prototype.hasOwnProperty.call(config, 'security.protocol')) {
        return {
            'bootstrap.servers': config['bootstrap.servers'],
            'sasl.username': config['sasl.username'],
            'sasl.password': config['sasl.password'],
            'security.protocol': config['security.protocol'],
            'sasl.mechanisms': config['sasl.mechanisms'],
            dr_msg_cb: true,
        };
    }
    else {
        return {
            'bootstrap.servers': config['bootstrap.servers'],
            dr_msg_cb: true,
        };
    }
};
exports.createProducerConfigMap = createProducerConfigMap;
const createConsumerConfigMap = config => {
    if (Object.prototype.hasOwnProperty.call(config, 'security.protocol')) {
        return {
            'bootstrap.servers': config['bootstrap.servers'],
            'sasl.username': config['sasl.username'],
            'sasl.password': config['sasl.password'],
            'security.protocol': config['security.protocol'],
            'sasl.mechanisms': config['sasl.mechanisms'],
        };
    }
    else {
        return {
            'bootstrap.servers': config['bootstrap.servers'],
            'enable.auto.commit': false,
        };
    }
};
exports.createConsumerConfigMap = createConsumerConfigMap;
const readAllLines = (path) => {
    const lines = [];
    const allFileContents = fs_1.default.readFileSync(path, 'utf-8');
    allFileContents.split(/\r?\n/).forEach(line => {
        lines.push(line);
    });
    return lines;
};
const configFromPath = (path) => {
    const lines = readAllLines(path);
    return lines
        .filter(line => !/^\s*?#/.test(line))
        .map(line => line.split('=').map(s => s.trim()))
        .reduce((config, [k, v]) => {
        config[k] = v;
        return config;
    }, {});
};
exports.configFromPath = configFromPath;
//# sourceMappingURL=utils.js.map