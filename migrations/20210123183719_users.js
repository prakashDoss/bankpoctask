exports.up = function(knex) {
    return knex.schema.createTableIfNotExists('POC02_USERS', function(table) {
        table.increments("userId").primary();
        table.string('email');
        table.string('phone');
        table.string('Name');
        table.string('password');
        table.string('Address');        
        table.boolean('status').defaultTo(true);
        table.timestamps(true, true);
        table.unique(['email','phone']);        
    });
};
exports.down = function(knex) {
    return knex.schema.dropTable('POC02_USERS');
};