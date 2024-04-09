const Car = require('../models/car'); // Importing Car model
const User = require('../models/user'); // Importing User model

// Render add rental form
exports.getAddRentals = (req, res, next) => {
    res.render('admin/form.ejs', {
        pageTitle: 'Add Rental Car',
        active: 'addRentals',
        edit: false
    });
}

// Handle adding rental car form submission
exports.postAddRentals = (req, res, next) => {
    // Extracting form data
    const name = req.body.name;
    const ppd = req.body.ppd;
    const pph = req.body.pph;
    const ppkm = req.body.ppkm;
    const image_url = req.body.imageUrl;
    const stock = req.body.stock;
    const desc = req.body.desc;

    // Creating new car object
    const car = new Car({
        name: name,
        ppd: ppd,
        pph: pph,
        ppkm: ppkm,
        stock: stock,
        description: desc,
        imageUrl: image_url,
        userId: req.user // Assigning user ID to the car
    });

    // Saving car to database
    car.save()
    .then(result => {
        console.log('Added car for rentals');
        res.redirect('/');
    })
}

// Render user profile page
exports.getProfile = (req, res, next) => {
    const userId = req.session.user._id;
    User.findById(userId)
    .then(user => {
        res.render('admin/profile', {
            user: user,
            pageTitle: 'Profile',
            active: 'profile'
        });
    })
}

// Render rental car edit page
exports.getEditRentals = (req, res, next) => {
    // Find cars associated with the logged-in user
    Car.find({userId : req.session.user._id})
    .then(cars => {
        return res.render('pages/index.ejs', {
            pageTitle: 'Manage Your Rental Cars',
            cars: cars,
            active: 'manage',
            edit: true
        });
    });
}

// Handle rental car edit form submission
exports.postEditRentals = (req, res, next) => {
    // Extracting form data
    const name = req.body.name;
    const ppd = req.body.ppd;
    const pph = req.body.pph;
    const ppkm = req.body.ppkm;
    const image_url = req.body.imageUrl;
    const stock = req.body.stock;
    const desc = req.body.desc;
    const id = req.body.id;

    // Find car by ID and update its details
    Car.findById(id)
    .then(car => {
        car.name = name;
        car.ppd = ppd;
        car.pph = pph;
        car.ppkm = ppkm;
        car.imageUrl = image_url;
        car.stock = stock;
        car.description = desc;

        return car.save();
    })
    .then(result => {
        console.log("car updated");
        res.redirect('/admin/edit-rentals');
    });
}

// Render rental car edit page
exports.getEditPage = (req, res, next) => {
    const carId = req.params.carId;

    // Find car by ID and render edit form
    Car.findById(carId)
    .then(car => {
        return res.render('admin/form.ejs', {
            pageTitle: 'Edit Rental Cars',
            car: car,
            active: 'manage',
            edit: true
        });
    });
}

// Handle rental car deletion
exports.delete = (req, res, next) => {
    const carId = req.params.carId;

    // Find car by ID and delete it
    Car.findById(carId)
    .then(car => {
        return Car.deleteOne({ _id: carId });
    })
    .then(result => {
        console.log("car deleted");
        res.redirect('/admin/edit-rentals');
    });
}
