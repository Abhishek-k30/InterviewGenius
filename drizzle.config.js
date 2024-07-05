/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./utils/schema.js",
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://mockInterview_owner:Txk2loswG1YI@ep-empty-math-a1yu0jox.ap-southeast-1.aws.neon.tech/mockInterview?sslmode=require',
  }
};