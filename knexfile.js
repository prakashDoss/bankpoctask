require('dotenv').config();
const MigrationDir = `${__dirname }/${process.env.DB_MIGRATION_DIR}`;
module.exports = {

    development: {
        client: `${process.env.DB_DRIVER}`,
        connection: `${process.env.DB_DRIVER}://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
        migrations: {
            directory: MigrationDir,
        },
    },

    staging: {
        client: `${process.env.DB_DRIVER}`,
        connection: `${process.env.DB_DRIVER}://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
        migrations: {
            directory: MigrationDir,
        },
    },

    production: {
        client: `${process.env.DB_DRIVER}`,
        connection: `${process.env.DB_DRIVER}://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
        migrations: {
            directory: MigrationDir,
        },
    },
    defaultSchema: {
        BaseModel: `${process.env.DB_NAME}`
    }

};