// Importing the 'fs' (file system) and 'path' modules
const fs = require('fs');
const path = require('path');

// Constructing the path to the tasks.json file
const p = path.join(__dirname, '..', 'data', 'tasks.json');

// Creating a Tasks class to represent operations on tasks
module.exports = class Tasks {
    // Constructor for the Tasks class, initializing task and state properties
    constructor(task, state) {
        this.task = task;
        this.state = state;
    }

    // Method to save a task to the tasks.json file
    save() {
        // Generating a random ID for the task
        this.id = Math.random().toString();

        // Reading the existing tasks from the file
        fs.readFile(p, (err, data) => {
            let taskArray = [];

            // Parsing existing data if it exists
            if (!err) {
                taskArray = JSON.parse(data);
            }

            // Adding the new task to the array
            taskArray.push(this);

            // Writing the updated array back to the file
            fs.writeFile(p, JSON.stringify(taskArray), err => {
                console.log(err);
            });
        });
    }

    // Static method to fetch all tasks from the tasks.json file
    static fetchAll(cb) {
        fs.readFile(p, (err, data) => {
            if (!err) {
                cb(JSON.parse(data));
            } else {
                cb([]);
            }
        });
    }

    // Static method to delete a task by ID from the tasks.json file
    static deleteByID(id) {
        fs.readFile(p, (err, data) => {
            let taskArray = [];

            // Parsing existing data if it exists
            if (!err) {
                taskArray = JSON.parse(data);
            }

            // Finding the index of the task with the specified ID and removing it
            const taskIndex = taskArray.findIndex(t => t.id === id);
            taskArray.splice(taskIndex, 1);

            // Writing the updated array back to the file
            fs.writeFile(p, JSON.stringify(taskArray), err => {
                console.log(err);
            });
        });
    }

    // Static method to update a task by ID in the tasks.json file
    static updateByID(id, newtask) {
        fs.readFile(p, (err, data) => {
            let taskArray = [];

            // Parsing existing data if it exists
            if (!err) {
                taskArray = JSON.parse(data);
            }

            // Finding the index of the task with the specified ID
            const taskIndex = taskArray.findIndex(t => t.id === id);

            // Updating task properties if the new task is not empty
            if (newtask.task !== "") {
                taskArray[taskIndex].task = newtask.task;
            }

            // Updating the task state
            taskArray[taskIndex].state = newtask.state;

            // Writing the updated array back to the file
            fs.writeFile(p, JSON.stringify(taskArray), err => {
                console.log(err);
            });
        });
    }
};
