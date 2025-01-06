import 'dotenv/config';

import * as joi from 'joi';

interface EnvVars {
    PORT: number;
    DB_URL: string;
}

const envsSchema = joi.object({
    PORT: joi.number().required(),
    DB_URL: joi.string().required()
}).unknown().required();

const { error, value } = envsSchema.validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
    PORT: envVars.PORT,
    DB_URL: envVars.DB_URL
}