"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configFromPath = exports.createConfigMap = void 0;
const tslib_1 = require("tslib");
const fs_1 = tslib_1.__importDefault(require("fs"));
const createConfigMap = config => {
    if (config.hasOwnProperty('security.protocol')) {
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
            'bootstrap.servers': process.env.KAFKA_PRODUCER_BROKER ||
                config['bootstrap.servers'],
            dr_msg_cb: true,
        };
    }
};
exports.createConfigMap = createConfigMap;
const readAllLines = (path) => {
    let lines = [];
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