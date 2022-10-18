"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const path_1 = require("path");
/* const getDotEnvPath: (nodeEnv: string, envFile: string) => string = (
    nodeEnv,
    envFile
) => {
    const baseProject: string = process.cwd();

    if (envFile) return resolve(baseProject, envFile);

    if (nodeEnv === 'prod') return resolve(baseProject, '.env.prod');
    if (nodeEnv === 'dev') return resolve(baseProject, '.env.dev');

    return resolve(baseProject, '.env.local');
}; */
if (process.env.NODE_ENV != 'prod') {
    /* const dotEnvPath: string = getDotEnvPath(
        process.env.NODE_ENV,
        process.env.ENV_FILE
    ); */
    // console.log(dotEnvPath);
    (0, dotenv_1.config)({
        path: (0, path_1.resolve)(process.cwd(), '.env'),
    });
}
//# sourceMappingURL=setup.js.map