const router = require('express').Router(); 

let User = require('../models/user.model');


/* create new user using email, password, fname,
lname. The actual bank account gets added using 
the /addaccount/:id endpoint. */


/* redirect to /addaccount to actually add 
the users first bank account.
307 allows the type of request to be preserved. */




router.route('/newuser').post((req, res) => {

    const email = req.body.email; //get info from form
    const password = req.body.password;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;

    firstname = firstname.charAt(0).toUpperCase() + firstname.slice(1); //capitalize first letter of names
    lastname = lastname.charAt(0).toUpperCase() + lastname.slice(1);

    const newUser = new User({  //create user account
        email,
        password,
        firstname,
        lastname,
    });

    newUser.save() //save the new user with personal details. 
        .then((user) => {
            res.redirect(307, `/addaccount/${user._id}/Current`); //redirect to /addaccount
        }) 
});







router.route('/login').post((req,res) => {
    const email = req.body.email;
    const password = req.body.password;


    User.findOne(
            {"email": email, "password": password}
        )
        .then(user => {

            if (user) {
                res.redirect(`/userhome/${user.id}`) //redirect to userhome.
            }else{
                res.status(403); //authentication error
            }
        })
        .catch(err => res.status(400).send({"Error": err}));
});



module.exports = router;