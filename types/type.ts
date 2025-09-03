import "dotenv/config"
interface AppConfig {
  port: number | string;
  apiUrl: string;
  accessKey: string;
  refreshKey: string;
  dbUrl: string;
  accessKeyExpire: string;
  refreshKeyExpire: string
}

export const config: AppConfig = {
  port: process.env.PORT || "",
  apiUrl: process.env.API_URL || "/api/v1",
  accessKey: process.env.ACCESS_KEY || "",
  refreshKey: process.env.REFRESH_KEY || "",
  dbUrl: process.env.DATABASE_URL || "",
  accessKeyExpire: process.env.ACCESS_KEY_EXPIRE || "",
  refreshKeyExpire: process.env.REFRESH_KEY_EXPIRE || ""
};