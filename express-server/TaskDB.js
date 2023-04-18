var sqlite3 = require('sqlite3').verbose()

class TaskDB {

    static reset() {
        console.log('resetting test DB')
        TaskDB.db = new sqlite3.Database('tasks.test.sqlite');
        this.db.run('DROP TABLE Tasks');
        this.db.run('DROP TABLE Users');
        TaskDB.initialize();
    }

    static initialize() {
        this.db.serialize(() => {
            // this.db.run('CREATE TABLE Bugs (id INTEGER PRIMARY KEY, title TEXT NOT NULL, description TEXT NOT NULL, type TEXT NOT NULL, priority TEXT NOT NULL, status TEXT NOT NULL);')
            // this.db.run('INSERT INTO Bugs (title, description, type, priority, status) VALUES ("Add something", "I would like a new feature", "feature", "high", "open");')
            // this.db.run('INSERT INTO Bugs (title, description, type, priority, status) VALUES ("Fix a problem", "It does not work", "bug", "low", "open");')

            this.db.run('CREATE TABLE Users (id INTEGER PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL, password TEXT NOT NULL, pfpref TEXT NOT NULL);');
            this.db.run('INSERT INTO Users ( name, email, password, pfpref) VALUES ("Cymbre Spoehr", "scottcym@mail.gvsu.edu", "password123", "pfp/cymbre-spoehr.jpg" );');
            this.db.run('INSERT INTO Users ( name, email, password, pfpref) VALUES ("Chase Kinard", "kinardc@mail.gvsu.edu", "testPassword!", "pfp/chase-kinard.png");');

            this.db.run('CREATE TABLE Tasks (id INTEGER PRIMARY KEY, name TEXT NOT NULL, date TEXT NOT NULL, duration INTEGER NOT NULL, assignedBy INTEGER, assignedTo INTEGER);');
            this.db.run('INSERT INTO Tasks (name, date, duration, assignedBy, assignedTo) VALUES ("Clean out the fridge", "4-19-2023", "30", "1", "2");');
            this.db.run('INSERT INTO Tasks (name, date, duration, assignedBy, assignedTo) VALUES ("Sweep the basement", "4-20-2023", "60", "2", "1");');
            this.db.run('INSERT INTO Tasks (name, date, duration, assignedBy, assignedTo) VALUES ("Organize the garage", "4-21-2023", "120", "2", "1");');

        })

    }

    static allTasks() {
        return new Promise( (resolve, reject) => {
            this.db.all('SELECT * from Tasks', (err, response) => {  
                // console.log(err)          
                resolve(response);
            })
        })
    }

    static allUsers() {
        return new Promise( (resolve, reject) => {
            this.db.all('SELECT * from Users', (err, response) => {            
                resolve(response);
            })
        })
    }

    static insertTask(task) {
        return new Promise((resolve, reject) => {
            this.db.run(`INSERT INTO Tasks (name, date, duration) VALUES ("${task.name}", "${task.date}", "${task.duration}")`, function(err, data) {
                task.id = this.lastID;
                resolve(task)
            })
        })
    }

    static insertUser(user) {
        return new Promise((resolve, reject) => {
            this.db.run(`INSERT INTO Users (id, title, user, rating) VALUES ("${user.id}", "${user.name}", "${user.email}", "${user.password}")`, function(err, data) {
                user.pk = this.lastID;
                resolve(user)
            })
        })
    }

    static updateTask(task) {
        return new Promise((resolve, reject) => {
            const sql = `UPDATE Tasks SET name="${task.name}", frequency="${task.frequency}", duration="${task.duration}", scheduled="${task.scheduled}", assignedBy="${task.assignedBy}", assignedTo="${task.assignedTo}" where pk="${task.pk}"`
            this.db.run(sql, function(err, data) {   
                if (err != null) {
                    console.log("Error updating ");
                    console.log(task);
                    console.log(err);
                    reject({message: err})
                } else if (this.changes === 1) {
                    resolve("Success")
                } else {
                    reject("Unknown problem.  There were " + this.changes + "changes.")
                }
            })
        })
    }
}

TaskDB.db = new sqlite3.Database('tasks.sqlite');

module.exports = TaskDB;