import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  // Remova o bloco datasource daqui se o erro persistir, 
  // pois o CLI lerá automaticamente do seu arquivo .env
});