const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(':memory:');

// Enable foreign key support
db.run("PRAGMA foreign_keys = ON;");

db.serialize(() => {
  
  // Create Categories table
  db.run(`CREATE TABLE Categories (
    category_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE
  )`);

  // Create Jokes table
  db.run(`CREATE TABLE Jokes (
    joke_id INTEGER PRIMARY KEY AUTOINCREMENT,
    setup TEXT,
    delivery TEXT,
    category_id INTEGER,
    FOREIGN KEY (category_id) REFERENCES Categories (category_id)
  )`);

  // Insert sample data into Categories table
  db.run(`INSERT INTO Categories (name) VALUES ('funnyJoke'), ('lameJoke')`);

  // Prepare and insert sample jokes into Jokes table
  const stmt = db.prepare(`INSERT INTO Jokes (setup, delivery, category_id) VALUES (?, ?, ?)`);
  stmt.run('Why did the student eat his homework?', 'Because the teacher told him it was a piece of cake!', 1);
  stmt.run('What kind of tree fits in your hand?', 'A palm tree', 1);
  stmt.run('What is worse than raining cats and dogs?', 'Hailing taxis', 1);
  stmt.run('Which bear is the most condescending?', 'Pan-DUH', 2);
  stmt.run('What would the Terminator be called in his retirement?', 'The Exterminator', 2);  
  stmt.finalize();
});

module.exports = db;
