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
            this.db.run('CREATE TABLE Users (pk INTEGER PRIMARY KEY, id TEXT NOT NULL, name TEXT NOT NULL, email TEXT NOT NULL, password TEXT NOT NULL)');
            this.db.run('INSERT INTO Users (id, name, emaiil, password) VALUES ("0175d1f0-a8c6-41bf-8d02-df5734d829a4", "Cymbre Spoehr", "scottcym@mail.gvsu.edu", "password123")');
            this.db.run('INSERT INTO Users (id, name, email, password) VALUES ("83c7ba2f-7392-4d7d-9e23-35adbe186046", "Chase Kinard", "kinardc@mail.gvsu.edu", "testPassword!")');

            this.db.run('CREATE TABLE Tasks (pk INTEGER PRIMARY KEY, name: TEXT NOT NULL, frequency: TEXT NOT NULL, duration: TEXT NOT NULL, scheduled: TEXT NOT NULL, assignedBy: INTEGER NOT NULL, assignedTo: INTEGER)');
            this.db.run('INSERT INTO Tasks (name, frequency, duration, scheduled, assignedBy, assignedTo) VALUES ("Clean out the fridge", "weekly", "60 minutes" "7:00, Monday", "1", "2")');
            this.db.run('INSERT INTO Tasks (name, frequency, duration, scheduled, assignedBy, assignedTo) VALUES ("Sweep the basement", "biweekly", "30 minutes" "any", "2", "1")');
            this.db.run('INSERT INTO Tasks (name, frequency, duration, scheduled, assignedBy, assignedTo) VALUES ("Organize the garage", "biweekly", "30 minutes" "any", "2", "1")');

        })
    }

    static allTasks() {
        return new Promise( (resolve, reject) => {
            this.db.all('SELECT * from Tasks', (err, response) => {            
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