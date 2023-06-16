async function createTables(db) {

    db.run(`CREATE TABLE IF NOT EXISTS temperatureValues (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        createdAt DATETIME NOT NULL,
        value REAL NOT NULL,
        mac TEXT NOT NULL
    )`, (err) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log('Table temperatureValues created successfully.');
        }
    });

    db.run(`CREATE TABLE IF NOT EXISTS humidityValues (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        createdAt DATETIME NOT NULL,
        value REAL NOT NULL,
        mac TEXT NOT NULL
    )`, (err) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log('Table humidityValues created successfully.');
        }
    });

    db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    createdAt DATETIME NOT NULL,
    modifiedAt DATETIME,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
)`, (err) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log('Table users created successfully.');
        }
    });

    db.run(`CREATE TABLE IF NOT EXISTS esps (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    createdAt DATETIME NOT NULL,
    modifiedAt DATETIME,
    mac TEXT NOT NULL UNIQUE
)`, (err) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log('Table users created successfully.');
        }
    });

    db.run(`CREATE TABLE IF NOT EXISTS esp_user_mappings (
    user_id INTEGER NOT NULL,
    esp_id INTEGER NOT NULL,
    createdAt DATETIME NOT NULL,
    modifiedAt DATETIME,
    PRIMARY KEY (user_id, esp_id),
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (esp_id) REFERENCES esps (id) ON DELETE CASCADE
)`, (err) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log('Table esp_user_mappings created successfully.');
        }
    });
}

module.exports = createTables;