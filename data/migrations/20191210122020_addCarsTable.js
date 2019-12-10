exports.up = function(knex) {
  return knex.schema.createTable("cars", table => {
    table.increments(); //id

    //Create VIN column
    table
      .string("vin", 32)
      .notNullable()
      .unique()
      .index();
    table.string("make", 64).notNullable(); //create make column
    table.string("model", 64).notNullable(); //Create model column
    table
      .integer("mileage")
      .unsigned()
      .defaultTo(0); //Create mileage column that defaults to 0.

    //These two are not always immediately known.
    table.string("transmission_type", 64);
    table.string("title_status", 64);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("cars");
};
