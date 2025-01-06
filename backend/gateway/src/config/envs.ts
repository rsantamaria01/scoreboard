import 'dotenv/config';

import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  DB_URL: string;
  HOST: string;

  USER_MICROSERVICE_HOST: string;
  USER_MICROSERVICE_PORT: number;
  GAME_MICROSERVICE_HOST: string;
  GAME_MICROSERVICE_PORT: number;
}

const envsSchema = joi
  .object({
    PORT: joi.number().default(3000),
    DB_URL: joi.string().required(),
    HOST: joi.string().default('localhost'),

    USER_MICROSERVICE_HOST: joi.string().default('localhost'),
    USER_MICROSERVICE_PORT: joi.number().required(),
    GAME_MICROSERVICE_HOST: joi.string().default('localhost'),
    GAME_MICROSERVICE_PORT: joi.number().required(),
  })
  .unknown()
  .required();

const { error, value } = envsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  PORT: envVars.PORT,
  DB_URL: envVars.DB_URL,
  HOST: envVars.HOST,

  USER_MICROSERVICE_HOST: envVars.USER_MICROSERVICE_HOST,
  USER_MICROSERVICE_PORT: envVars.USER_MICROSERVICE_PORT,
  GAME_MICROSERVICE_HOST: envVars.GAME_MICROSERVICE_HOST,
  GAME_MICROSERVICE_PORT: envVars.GAME_MICROSERVICE_PORT,
};
