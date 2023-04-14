var sqlite3 = require('sqlite3').verbose()

class TaskDB {

    static reset() {
        console.log('resetting test DB')
        TaskDB.db = new sqlite3.Database('tasks.test.sqlite');
        this.db.run('DROP TABLE Tasks')
        TaskDB.initialize();
    }

    static initialize() {
        this.db.serialize(() => {
            // this.db.run('CREATE TABLE Bugs (id INTEGER PRIMARY KEY, title TEXT NOT NULL, description TEXT NOT NULL, type TEXT NOT NULL, priority TEXT NOT NULL, status TEXT NOT NULL);')
            // this.db.run('INSERT INTO Bugs (title, description, type, priority, status) VALUES ("Add something", "I would like a new feature", "feature", "high", "open");')
            // this.db.run('INSERT INTO Bugs (title, description, type, priority, status) VALUES ("Fix a problem", "It does not work", "bug", "low", "open");')

            this.db.run('CREATE TABLE Users (id INTEGER PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL, password TEXT NOT NULL);');
            this.db.run('INSERT INTO Users ( name, email, password) VALUES ("Cymbre Spoehr", "scottcym@mail.gvsu.edu", "password123");');
            this.db.run('INSERT INTO Users ( name, email, password) VALUES ("Chase Kinard", "kinardc@mail.gvsu.edu", "testPassword!");');

            this.db.run('CREATE TABLE Tasks (id INTEGER PRIMARY KEY, name TEXT NOT NULL, frequency TEXT NOT NULL, duration TEXT NOT NULL, scheduled TEXT NOT NULL, assignedBy INTEGER NOT NULL, assignedTo INTEGER);');
            this.db.run('INSERT INTO Tasks (name, frequency, duration, scheduled, assignedBy, assignedTo) VALUES ("Clean out the fridge", "weekly", "60 minutes", "7:00, Monday", "1", "2");');
            this.db.run('INSERT INTO Tasks (name, frequency, duration, scheduled, assignedBy, assignedTo) VALUES ("Sweep the basement", "biweekly", "30 minutes", "any", "2", "1");');
            this.db.run('INSERT INTO Tasks (name, frequency, duration, scheduled, assignedBy, assignedTo) VALUES ("Organize the garage", "biweekly", "30 minutes", "any", "2", "1");');

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
            this.db.run(`INSERT INTO Tasks (id, title, task, rating) VALUES ("${task.name}", "${task.frequency}", "${task.duration}", "${task.scheduled}", "${task.assignedBy}", "${task.assignedTo}")`, function(err, data) {
                task.pk = this.lastID;
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