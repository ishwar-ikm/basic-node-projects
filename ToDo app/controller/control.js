// Importing the Task model from the specified path
const Task = require('../models/tasks');

// Controller function for rendering the home page with tasks
exports.home = (req, res, next) => {
    // Fetching all tasks from the database
    Task.fetchAll(tasks => {
        // Rendering the 'index.ejs' view with retrieved tasks and page title
        res.render('index.ejs', {
            tasks: tasks,
            pageTitle: 'TODO App'
        });
    });
};

// Controller function for submitting a new task
exports.submitTask = (req, res, next) => {
    // Extracting task data from the request body
    const task = req.body.task;

    // Creating a new Task object with the provided data
    let obj = new Task(task, false);

    // Saving the new task to the database
    obj.save();

    // Redirecting to the home page after task submission
    res.redirect('/');
};

// Controller function for deleting a task
exports.deleteTask = (req, res, next) => {
    // Extracting the task ID from the request body
    const id = req.body.id;

    // Deleting the task with the specified ID from the database
    Task.deleteByID(id);

    // Redirecting to the home page after task deletion
    res.redirect('/');
};

// Controller function for rendering the edit page for a specific task
exports.getEdit = (req, res, next) => {
    // Extracting the task ID from the request parameters
    const taskid = req.params.id;

    // Rendering the 'task.ejs' view with task ID and page title for editing
    res.render('task.ejs', {
        id: taskid,
        pageTitle: 'Edit page'
    });
};

// Controller function for handling the post request to update a task
exports.postEdit = (req, res, next) => {
    // Extracting task data, ID, and completion status from the request body
    const task = req.body.task;
    const id = req.body.id;
    const completedCheckboxValue = req.body.completed === 'on';

    // Creating a new Task object with the updated data
    let obj = new Task(task, completedCheckboxValue);

    // Updating the task with the specified ID in the database
    Task.updateByID(id, obj);

    // Redirecting to the home page after task update
    res.redirect('/');
};
