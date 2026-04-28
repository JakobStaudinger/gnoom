import { Db, MongoClient } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server-core';
import { AnyObject } from '../types/object';

export class DatabaseInstance {
  public readonly db: Db;

  private constructor(
    public readonly server: MongoMemoryServer,
    public readonly client: MongoClient
  ) {
    this.db = this.client.db('Test');
  }

  public static async new() {
    const server = new MongoMemoryServer();
    await server.start();
    const client = new MongoClient(server.getUri());
    await client.connect();
    return new this(server, client);
  }

  public async close() {
    await this.client.close();
    await this.server.stop();
  }

  public async insertData(data: { [collection: string]: AnyObject[] }) {
    await Promise.all(
      Object.entries(data).map(([collection, documents]) =>
        this.collection(collection).insertMany(documents.flat(Infinity))
      )
    );
  }

  public collection(name: string) {
    return this.db.collection(name);
  }
}
