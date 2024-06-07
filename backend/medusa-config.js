const dotenv = require("dotenv");

let ENV_FILE_NAME = "";
switch (process.env.NODE_ENV) {
  case "production":
    ENV_FILE_NAME = ".env.production";
    break;
  case "staging":
    ENV_FILE_NAME = ".env.staging";
    break;
  case "test":
    ENV_FILE_NAME = ".env.test";
    break;a
  case "development":
  default:
    ENV_FILE_NAME = ".env.local";
    break;
}

try {
  dotenv.config({ path: process.cwd() + "/" + ENV_FILE_NAME });
} catch (e) {}

// CORS when consuming Medusa from admin
const ADMIN_CORS = process.env.ADMIN_CORS || "http://localhost:7000,http://localhost:7001";

// CORS to avoid issues when consuming Medusa from a client
const STORE_CORS = process.env.STORE_CORS || "http://localhost:8000";

// Database URL (here we use a local database called medusa-development)
const DATABASE_URL =
  process.env.DATABASE_URL || "postgres://localhost/medusa-store";

// Medusa uses Redis, so this needs configuration as well
const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";

// Stripe keys
const STRIPE_API_KEY = process.env.STRIPE_API_KEY || "";
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || "";

const plugins = [
  `medusa-fulfillment-manual`,
  `medusa-payment-manual`,
  {
    resolve: `@medusajs/file-local`,
    options: {
      upload_dir: "uploads",
    },
  },
  {
  resolve: `medusa-payment-stripe`,
  options: {
      api_key: process.env.STRIPE_API_KEY,
      webhook_secret: process.env.STRIPE_WEBHOOK_SECRET,
   },
  }
];
/* Uncomment to add redis modules */
/*
const modules = {
  eventBus: {
    resolve: "@medusajs/event-bus-redis",
    options: {
      redisUrl: process.env.REDIS_URL
    }
  },
  cacheService: {
    resolve: "@medusajs/cache-redis",
    options: {
      redisUrl: process.env.REDIS_URL
    }
  },
};
*/
/** @type {import('@medusajs/medusa').ConfigModule["projectConfig"]} */
const projectConfig = {
  jwt_secret: process.env.JWT_SECRET,
  cookie_secret: process.env.COOKIE_SECRET,
  store_cors: STORE_CORS,
  database_url: DATABASE_URL,
  admin_cors: ADMIN_CORS,
 // redis_url: process.env.REDIS_URL
};

/** @type {import('@medusajs/medusa').ConfigModule} */
module.exports = {
  projectConfig,
  plugins,
  //modules,
};
