export interface User {
  id: string;
  username: string;
  password: string;
}

import { MongoClient, Database } from 'https://deno.land/x/mongo@v0.8.0/mod.ts';

let db: Database;

export function connect() {
  const client = new MongoClient();
  client.connectWithUri(
    'mongoURL'
  );

  db = client.database('users');
}

export function getDb() {
  return db;
}
