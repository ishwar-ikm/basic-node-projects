const Car = require('../models/car'); // Importing Car model
const User = require('../models/user'); // Importing User model
const Order = require('../models/order'); // Importing Order model

// Render home page with list of cars available for rent
exports.getIndex = (req, res, next) => {
    
    Car.find()
    .then(cars => {
        return res.render('pages/index.ejs', {
            pageTitle: 'Home',
            cars: cars,
            active: 'home',
            edit: false
        });
    });
}

// Render car detail page
exports.getDetail = (req, res, next) => {
    const carId = req.params.carId;

    Car.findById(carId)
    .then(car => {
        return res.render('pages/car-detail.ejs', {
            pageTitle: 'Car Detail',
            car: car,
            active: 'home',
            edit: false
        });
    });
    
}

// Render car rent page
exports.getRentPage = (req, res, next) => {
    const carId = req.params.carId;

    Car.findById(carId)
    .then(car => {
        return res.render('pages/car-rent.ejs', {
            pageTitle: 'Rent Car',
            car: car,
            user: req.session.user,
            active: 'car-rent',
            edit: false,
            error: ''
        });
    });
    
}

// Handle car rental submission
exports.postRent = (req, res, next) => {
    const carId = req.body.id;
    const mode = req.body.btnradio;
    const amount = req.body.amount;
    
    Car.findById(carId)
      .then(car => {
        if(car.stock == 0){
            // Render rent page with error message if car is out of stock
            return res.render('pages/car-rent.ejs', {
                pageTitle: 'Rent Car',
                car: car,
                user: req.session.user,
                active: 'car-rent',
                edit: false,
                error: 'Car is out of stock'
            });
        }
        
        // Create new order
        const order = new Order({
            carId: carId,
            userId: req.user._id,
            mode: mode,
            amount: amount
        });

        order.save()
        .then(result => {
            console.log('Order Saved');
            // Decrease stock count of the car and redirect to order page
            Car.findById(carId)
            .then(car => {
                car.stock = car.stock - 1;
                car.save();
            })
            res.redirect('/order');
        })

      })
      .catch(err => {
        console.log(err);
      });
  };

// Render user's orders page
exports.getOrder = (req, res, next) => {
    
    Order.find({userId : req.user._id})
    .populate('carId')
    .exec((err, orders) => {
        res.render('pages/order', {
            pageTitle: "Your Orders",
            active: 'order',
            orders: orders
        }); 
    });
};

// Cancel order
exports.cancelOrder = (req, res, next) => {
    const carId = req.body.carId;
    
    Order.find({carId : carId})
    .then(order => {
        return Order.deleteOne({carId : carId});
    })
    .then(result => {
        // Increase stock count of the car and redirect to home page
        Car.findById(carId)
        .then(car => {
            car.stock = car.stock + 1;
            return car.save();
        })
        .then(result => {
            res.redirect('/');
        })
    })
    .catch(err => {
      console.log(err);
    });
};
