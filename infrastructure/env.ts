require('dotenv').config();

function loadFromEnv(key) {
  if (typeof process.env[key] !== 'undefined') {
    return process.env[key];
  }
  throw new Error(`process.env doesn't have the key ${key}`);
}

export const config = {
  port: loadFromEnv('PORT'),
  baseUrl: loadFromEnv('BASE_URL'),
  devMode: loadFromEnv('NODE_ENV') === 'development',
  databaseUrl: loadFromEnv("DATABASE_URL"),
  adminUser: {
    id: loadFromEnv('ADMIN_USER_ID'),
  },
  cloudflare: {
    email: loadFromEnv('CLOUDFLARE_EMAIL'),
    authKey: loadFromEnv('CLOUDFLARE_AUTH_KEY'),
    accountId: loadFromEnv('CLOUDFLARE_ACCOUNT_ID'),
    apiToken: loadFromEnv('CLOUDFLARE_API_TOKEN'),
    hookSecret: loadFromEnv('CLOUDFLARE_HOOK_SECRET'),
    imageWoker: loadFromEnv('CLOUDFLARE_WORKER_URL')
  },
  aws: {
    accessKeyId: loadFromEnv('AWS_ACCESS_KEY_ID'),
    secretAccessKey: loadFromEnv('AWS_SECRET_ACCESS_KEY'),
    uploadBucket: loadFromEnv('AWS_UPLOAD_BUCKET'),
    queueUrl: loadFromEnv('AWS_QUEUE_URL'),
    bucketURL: loadFromEnv('S3_BUCKET_URL')
  },
  database: {
    host: loadFromEnv('DATABASE_HOST'),
    port: loadFromEnv('DATABASE_PORT'),
    name: loadFromEnv('DATABASE_NAME'),
    username: loadFromEnv('DATABASE_USERNAME'),
    password: loadFromEnv('DATABASE_PASSWORD'),
  },
  google: {
    androidClientId: loadFromEnv('GOOGLE_ANDROID_CLIENT_ID'),
    expoClientId: loadFromEnv('GOOGLE_EXPO_CLIENT_ID'),
    iosClientId: loadFromEnv('GOOGLE_IOS_CLIENT_ID'),
    webClientId: loadFromEnv('GOOGLE_WEB_CLIENT_ID'),
  },
  apple: {
    clientId: loadFromEnv('APPLE_CLIENT_ID'),
  },
  nft: {
    price: {
      minimum: 5_00,
      maximum: 10000_00, // in cents
    },
    quantity: {
      minimum: 1,
      maximum: 50,
    },
    transferDuration: loadFromEnv('NFT_TRANSFER_DURATION'),
  },
  payments: {
    apple: {
      iapSecret: loadFromEnv('APPLE_IAP_SECRET'),
    },
    google: {
      clientEmail: loadFromEnv('GOOGLE_SERVICE_EMAIL'),
      privateKey: loadFromEnv('GOOGLE_SERVICE_KEY'),
      appPackageName: loadFromEnv('GOOGLE_APP_PACKAGE_NAME'),
    },
  },
  redis: {
    host: loadFromEnv('REDIS_HOST'),
    port: loadFromEnv('REDIS_PORT'),
    password: loadFromEnv('REDIS_PASSWORD'),
  },
  iapEnvironment: loadFromEnv('IAP_ENVIRONMENT'),
  ses: {
    otpSourceEmail: loadFromEnv('OTP_SOURCE_EMAIL')
  }
};
