import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema'
const sql = neon(`postgresql://mockInterview_owner:Txk2loswG1YI@ep-empty-math-a1yu0jox.ap-southeast-1.aws.neon.tech/mockInterview?sslmode=require`
);
export const db = drizzle(sql, { schema });