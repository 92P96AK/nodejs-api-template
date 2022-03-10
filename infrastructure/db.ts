import { Connection, getConnectionManager, ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
    type: 'postgres',
    name: 'default',
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "root",
    database: "momentonft",
    synchronize: false,
    logging: false,
    entities: ['api/models/**/*.ts'],
    migrations: ['migrations/**/*.ts'],
    cli: {
        migrationsDir: "migrations"
    }
};

export const dbCreateConnection = async (): Promise<Connection | null> => {
    try {
        const connectionManager = getConnectionManager();
        const connection = connectionManager.create(config);
        await connection.connect();
        console.log("Database Connected ....")
    } catch (err: any) {
        if (err.name === 'AlreadyHasActiveConnectionError') {
            const activeConnection = getConnectionManager().get(config.name);
            return activeConnection;
        }
        console.log(err);
    }
    return null;
};