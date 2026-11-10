// Credentials come from the db container environment (see docker-compose.yaml / .env).
// A single application user is created in the main database (its authSource) and
// granted readWrite on both the main and the tuition databases.
const mainDb = process.env.DATABASE_DB;
const tuitionDb = process.env.TUITION_DATABASE_DB;

db = db.getSiblingDB(mainDb);
db.createUser({
  user: process.env.DATABASE_USER,
  pwd: process.env.DATABASE_PASS,
  roles: [
    { role: 'readWrite', db: mainDb },
    { role: 'readWrite', db: tuitionDb },
  ],
});
