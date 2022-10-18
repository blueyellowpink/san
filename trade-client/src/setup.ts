import { config } from 'dotenv';
import { resolve } from 'path';

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
    config({
        path: resolve(process.cwd(), '.env'),
    });
}
