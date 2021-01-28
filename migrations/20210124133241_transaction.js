exports.up = function(knex) {
    return knex.schema.createTableIfNotExists('POC04_TRANSACTION', function(table) {
        table.increments("transactionId").primary();        
        table.integer('userId').unsigned().notNullable().references('userId').inTable('POC02_USERS').onDelete('CASCADE').index();        
        table.integer('bankId').unsigned().notNullable().references('bankId').inTable('POC01_BANK').onDelete('CASCADE').index();   
        table.string('type');     
        table.double('amount',6,2);     
        table.boolean('status').defaultTo(true);
        table.timestamps(true, true);
    });
};
exports.down = function(knex) {
    return knex.schema.dropTable('POC04_TRANSACTION');
};