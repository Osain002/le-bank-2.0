const router = require('express').Router(); 

let User = require('../models/user.model');


const findAcc = (accNum, user) => {
    for (acc in user.accounts) {
        if (user.accounts[acc].accNum === accNum) {
            return user.accounts[acc];
        }
    }
}

router.route('/:id').post((req,res) => {

    const transfer_amount = req.body.transfer;
    const senderAccNum = req.body.senderAccNum;
    const recipSortCode = req.body.recipSortCode;
    const recipAccNum = req.body.recipAccNum;


    User.findById(req.params.id) //find by id so that money cannot be sent from an account that does not belong to the user
        .then(user => {
            const senderAcc = findAcc(senderAccNum, user); //find correct account to send finds from
            senderAcc.balance -= transfer_amount; //subtract transfer amount from account balance
            user.save(); //save updated balance
        })
        

    User.findOne({
        sortcode: recipSortCode,
        accNum: recipAccNum 
    })
    .then( user => {
        const recipAcc = findAcc(recipAccNum, user); //find correct account to transfer funds to
        recipAcc.balance += transfer_amount; //add transfer amount to balance
        user.save();
    })
    .then(res.sendStatus(200)); //save updated balance
})   

module.exports = router;


