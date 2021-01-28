exports.up = function(knex) {
    return knex.schema.createTableIfNotExists('POC01_BANK', function(table) {
        table.increments("bankId").primary();
        table.string('bankName');
        table.string('bankIFSCode');
        table.string('branchName');
        table.string('bankAddress');
        table.boolean('status').defaultTo(true);
        table.timestamps(true, true);
        table.unique(['bankName', 'bankIFSCode']);
    });
};
exports.down = function(knex) {
    return knex.schema.dropTable('POC01_BANK');
};