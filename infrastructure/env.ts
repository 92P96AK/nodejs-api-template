require('dotenv').config()

function loadFromEnv(key) {
  if (typeof process.env[key] !== 'undefined') {
    return process.env[key]
  }
  throw new Error(`process.env doesn't have the key ${key}`)
}

export const config = {
  port: parseInt(loadFromEnv('PORT') || '9000'),
  baseUrl: loadFromEnv('BASE_URL'),
  devMode: loadFromEnv('NODE_ENV') === 'development',
  databaseUrl: loadFromEnv('DATABASE_URL'),
  redis: {
    host: loadFromEnv('REDIS_HOST'),
    port: loadFromEnv('REDIS_PORT'),
    password: loadFromEnv('REDIS_PASSWORD'),
  },
  jwtSecret: loadFromEnv('JWT_SECRET') || 'This is Secret',
  tokenValidationDays: parseInt(loadFromEnv('TOKEN_VALID_DAYS')!) || 200,
  maxDurationSecond: parseInt(loadFromEnv('MAX_DURATION_SECONDS') || '180'),
  admin: {
    email: loadFromEnv('ADMIN_EMAIL'),
    password: loadFromEnv('ADMIN_PASSWORD'),
  },
}
