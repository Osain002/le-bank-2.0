const router = require('express').Router(); 

let User = require('../models/user.model');



router.route('/').post((req,res) => {

    const recipFname = req.body.recipFname;
    const recipLname = req.body.recipLname;
    const transfer_amount = req.body.transfer;
    const senderAccNum = req.body.senderAccNum;
    const recipSortCode = req.body.recipSortCode;
    const recipAccNum = req.body.recipAccNum;
    const ref = req.body.ref;

    var senderFname = req.body.senderFname;
    var senderLname = req.body.senderLname;




    function handleTransfer(user_, acc, type, fname, lname) {
        console.log('H:',acc)
        const user = user_
        const statementList  = acc.statement;

        if (type == 'Tin'){
            acc.balance += Number(transfer_amount); //add transfer amount to balance
        }else if (type == 'Tout'){
            acc.balance -= Number(transfer_amount);
        }

        statementList.push(
            {
                transactionType: type,
                amount: transfer_amount,
                name: fname + '' + lname,
                Ref: ref
            }
        );  
    }

    User.find({  //find both accounts
        sortcode: 123201,
        accNum: {$in: [recipAccNum, senderAccNum]}
    }) //find sender by id so that money cannot be sent from an account that does not belong to the user
        .then(users => {

            users.forEach(user => {
                const accounts = user.accounts
                accounts.forEach( acc => {
                    if (acc.accNum == senderAccNum){
                       
                        handleTransfer(user, acc, 'Tout', recipFname, recipLname);
                    }

                    if (acc.accNum == recipAccNum){
                        handleTransfer(user, acc, 'Tin', senderFname, senderLname);
                    } 
                })
                user.save()
            })
        })
})   

module.exports = router;


