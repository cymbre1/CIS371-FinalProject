var sqlite3 = require('sqlite3').verbose()

class TaskDB {

    static reset() {
        console.log('resetting test DB')
        TaskDB.db = new sqlite3.Database('tasks.test.sqlite');
        this.db.run('DROP TABLE IF EXISTS Tasks');
        this.db.run('DROP TABLE IF EXISTS Users');
        TaskDB.initialize();
    }

    static initialize() {
        this.db.serialize(() => {
            this.db.run('CREATE TABLE Users (id INTEGER PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL, password TEXT NOT NULL, pfpref TEXT NOT NULL);');
            this.db.run('INSERT INTO Users ( name, email, password, pfpref) VALUES ("Cymbre Spoehr", "scottcym@mail.gvsu.edu", "password123", "pfp/cymbre-spoehr.jpg" );');
            this.db.run('INSERT INTO Users ( name, email, password, pfpref) VALUES ("Chase Kinard", "kinardc@mail.gvsu.edu", "testPassword!", "pfp/chase-kinard.png");');

            this.db.run('CREATE TABLE Tasks (id INTEGER PRIMARY KEY, title TEXT NOT NULL, date TEXT NOT NULL, duration INTEGER NOT NULL, assignedBy INTEGER, assignedTo INTEGER);');
            this.db.run('INSERT INTO Tasks (title, date, duration, assignedBy, assignedTo) VALUES ("Clean out the fridge", "2023-04-19", "30", "1", "2");');
            this.db.run('INSERT INTO Tasks (title, date, duration, assignedBy, assignedTo) VALUES ("Sweep the basement", "2023-04-20", "60", "2", "1");');
            this.db.run('INSERT INTO Tasks (title, date, duration, assignedBy, assignedTo) VALUES ("Organize the garage", "2023-04-21", "120", "2", "1");');
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
            this.db.run(`INSERT INTO Tasks (title, date, duration, assignedBy, assignedTo) VALUES ("${task.title}", "${task.date}", "${task.duration}", "1", "1");`, function(err, data) {
                task.id = this.lastID;
                task.assignedBy = 1;
                task.assignedTo = 1;
                resolve(task)
            })
        })
    }

    static insertUser(user) {
        return new Promise((resolve, reject) => {
            console.log(user);
            if(user.password !== user.confirmPassword || user.name === "" || user.email === "") {
                resolve("Invalid");
            }

            this.db.run(`INSERT INTO Users ( name, email, password, pfpref) VALUES ("${user.name}", "${user.username}", "${user.password}", "${user.pfpref}");`, function(err, data) {
                user.id = this.lastID;
                resolve(user);
            })
        })
    }

    static validateUser(user) {
        TaskDB.allUsers().then((all) => {
            console.log(all);
        });
        return new Promise((resolve, reject) => {
            const sql = (`SELECT * from Users WHERE email=?`)
            this.db.get(sql, [user.username], function(err, row) {
                if(typeof row === 'undefined') {
                    reject("Bad Login");
                    return;
                }
                console.log("DATA ", row);
                console.log("ERR ", err);
                if(user.password === row.password) {
                    resolve(row.id);
                } else {
                    resolve("Invalid");
                }
            })
        });
    }
        
    static updateTask(task) {
        return new Promise((resolve, reject) => {
            const sql = `UPDATE Tasks SET title="${task.title}", date="${task.date}", duration="${task.duration}", assignedBy="${task.assignedBy}", assignedTo="${task.assignedTo}" where id="${task.id}"`
            this.db.run(sql, function(err, data) {   
                if (err != null) {
                    console.log("Error updating ");
                    console.log(task);
                    console.log(err);
                    reject({message: err})
                } else if (this.changes === 1) {
                    resolve(task)
                } else {
                    reject("Unknown problem.  There were " + this.changes + "changes.")
                }
            })
        })
    }

    static updateUser(user, id) {
        return new Promise((resolve, reject) => {
            const sql = `UPDATE Users SET title="${user.title}", email="${user.email}", password="${user.password}" where id="${id}"`
            this.db.run(sql, function(err, data) {
                console.log(err);
                resolve(user)
            })
        })
    }

    static deleteTask(task) {
        console.log(task)
        return new Promise((resolve, reject) => {
            const sql = `DELETE From Tasks WHERE id=${task.id};`
            this.db.run(sql, function(err, data) {   
                if (err != null) {
                    console.log("Error updating ");
                    console.log(task);
                    console.log(err);
                    reject({message: err});
                } else if (this.changes === 1) {
                    resolve("Success");
                } else {
                    reject("Unknown problem.  There were " + this.changes + "changes.");
                }
            })
        })
    }
}

TaskDB.db = new sqlite3.Database('tasks.sqlite');

module.exports = TaskDB;