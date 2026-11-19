require("dotenv").config();
const { Client } = require("pg");

const SQL = ` 
CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username VARCHAR (255),
    message VARCHAR (255),
    added TIMESTAMPTZ NOT NULL DEFAULT now()
);

INSERT INTO messages (username, message)
VALUES
    ('Bini', 'Quiero jugar el ocarina remake'),
    ('Juam', 'Estoy buscando el Halo CE de xbox original'),
    ('Malandru', 'Vendo el Lego Star Wars de DS');

`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
