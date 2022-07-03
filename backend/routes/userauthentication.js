const router = require('express').Router(); 

let User = require('../models/user.model');


router.route('/newuser').post((req, res) => {

    const email = req.body.email;
    const password = req.body.password;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;

    
    const accType = "Crnt"
    const balance = 50;
    const sortcode = 123201;
    const accNum = Math.floor(Math.random() * 1000000000);

    

    const newUser = new User({
        email,
        password,
        firstname,
        lastname,
        accounts: {
            accType,
            balance,
            sortcode,
            accNum
        }
    });


    newUser.save()
        .then(() => res.sendStatus(200)); 
});




router.route('/login').post((req,res) => {

    const email = req.body.email;
    const password = req.body.password;


    User.findOne(
            {"email": email, "password": password}
        )
        .then(user => {
            if (user) {
                res.status(200).send({"id_": user.id});
            }else{
                res.status(403);
            }
        })
        .catch(err => res.status(400).send({"Error": err}));
});



module.exports = router;