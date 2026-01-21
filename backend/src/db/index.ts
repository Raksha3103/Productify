import {drizzle} from 'drizzle-orm/postgres-js';
import {Pool} from "pg";
import * as schema from "./schema";
import { ENV } from '../config/env';


if (!ENV.DB_URL){
    throw new Error("Database connection string is not defined in environment variables");
}
const pool=new Pool({connectionString:ENV.DB_URL});
pool.on("connect",()=>{
    console.log("Connected to the database successfully");
});
export const db=drizzle({client:pool,schema});
//connection pool is a cache of database connections that are kept open and reused
//opening closing connection is slow instead of creating a new connection for each request we reuse existing ones
//databases limit concurrent connections a pool manages a fixed number of connections and shares them across requests


