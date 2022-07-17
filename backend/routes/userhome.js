const router = require('express').Router();

let User = require('../models/user.model');

router.route('/:id').get((req,res) => {
    User.findById(req.params.id)
        .then(user => {
            res.json({
                "firstname": user.firstname,
                "lastname": user.lastname,
                "accounts": user.accounts
            });
        })
})

module.exports = router;