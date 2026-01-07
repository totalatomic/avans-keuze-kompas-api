import { EnvConfigModel } from "./env.config.model";

export const envConfiguration = (): EnvConfigModel => ({
  database: {
    url: process.env.MONGODB_URI || ''
  },
  listeningPort: parseInt(process.env.LISTENING_PORT || '3000'),
  jwtSecret: process.env.JWT_SECRET || ''
});  