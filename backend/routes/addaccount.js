const router = require('express').Router(); 

let User = require('../models/user.model');

router.route('/:id').post((req, res) => {

        const accType = req.body.accType;
        const balance = 0.00;
        const sortcode = 123201;
        const accNum = Math.floor(Math.random() * 1000000000);
        const accInfo = {
            accType,
            balance,
            sortcode,
            accNum
        };


        User.findById(req.params.id)
            .then((user) => {
                user.accounts.push(accInfo);
                user.save();
                res.sendStatus(200);
            })
});

module.exports = router;