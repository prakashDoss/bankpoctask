exports.up = function(knex) {
    return knex.schema.createTableIfNotExists('POC03_USERS_BANK_MAPPING', function(table) {
        table.increments("mappingId").primary();        
        table.integer('userId').unsigned().notNullable().references('userId').inTable('POC02_USERS').onDelete('CASCADE').index();        
        table.integer('bankId').unsigned().notNullable().references('bankId').inTable('POC01_BANK').onDelete('CASCADE').index();   
        table.string('accountnumber');     
        table.string('addressProof');     
        table.double('depositAmount',6,2);     
        table.boolean('status').defaultTo(true);
        table.timestamps(true, true);
    });
};
exports.down = function(knex) {
    return knex.schema.dropTable('POC03_USERS_BANK_MAPPING');
};