/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
  .createTable('adresses', function(table){
    table.increments('id');
    table.integer('numero_rue',255).notNullable();
    table.string('nom_rue', 255).notNullable();
    table.integer('codepostal').notNullable();
  })
  .createTable('users', function(table){
    table.increments('id');
    table.string('lastname', 255).notNullable();
    table.string('firstname', 255).notNullable();
    table.string('email', 255).notNullable();
    table.string('password', 255).notNullable();
    table.integer('adresse').unsigned().nullable();

    table.foreign('adresse').references('id').inTable('adresses')
  })
  .createTable('entreprises', function(table){
    table.increments('id');
    table.string('nom', 255).notNullable();
    table.integer('siret', 14).notNullable();
    table.integer('adresse').unsigned().nullable();
    table.date('create_at').notNullable();

    table.foreign('adresse').references('id').inTable('adresses')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
  .dropTable('adresses')
  .dropTable('users')
  .dropTable('entreprises')
};
