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
    table.string('ville').notNullable();
  })
  .createTable('users', function(table){
    table.increments('id');
    table.string('lastname', 255).notNullable();
    table.string('firstname', 255).notNullable();
    table.string('email', 255).notNullable();
    table.string('password', 255).notNullable();
    table.boolean('isCM').notNullable();
  })
  .createTable('entreprises', function(table){
    table.increments('id');
    table.string('nom', 255).notNullable();
    table.integer('siret', 14).notNullable();
    table.integer('adresse').unsigned().nullable();
    table.timestamps(true, true)

    table.foreign('adresse').references('id').inTable('adresses')
  })
  .createTable('conversations', function(table){
    table.increments('id');
    table.integer('cm').notNullable();
    table.integer('client').notNullable();

    table.foreign('cm').references('id').inTable('users')
    table.foreign('client').references('id').inTable('users')
  })
  .createTable('messages', function(table){
    table.increments('id');
    table.integer('conversation').notNullable();
    table.integer('author').notNullable();
    table.text('content').notNullable();
    table.timestamps(true, true);

    table.foreign('conversation').references('id').inTable('conversations')
    table.foreign('author').references('id').inTable('users')
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
  .dropTable('messages')
  .dropTable('conversations')
};
