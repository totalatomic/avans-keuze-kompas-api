export interface EnvConfigModel {
  database: DatabaseConfig;
  listeningPort: Number;
  jwtSecret: string;
}

interface DatabaseConfig {
  url: string;
}