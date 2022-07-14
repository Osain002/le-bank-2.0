const router = require('express').Router();



let User = require('../models/user.model');

function Transaction(type, amount, fname, lname,ref_, date){ //Constructs transaction objects
    this.transactionType = type;
    this.amount = amount;
    this.name = fname + '' + lname;
    this.Ref = ref_;
    this.Date = date;
}


function handleTransfer(acc, fname, lname, amount, ref) {

    const today = new Date();
    const date = String(today.toLocaleDateString());
    const transaction = new Transaction('Transfer', amount, fname, lname, ref, date); //Create new instance of transaction object. Contains information about transfer.
    const statementList  = acc.statement;

    acc.balance += Number(amount); //add transfer amount to balance
    statementList.unshift(transaction); //add transaction to beginning of statement list.
}



router.route('/').post((req,res) => { // .../transfer/

    const senderFname = req.body.senderFname;
    const senderLname = req.body.senderLname;
    const senderAccNum = Number(req.body.senderAccNum);

    const recipFname = req.body.recipFname;
    const recipLname = req.body.recipLname;
    const recipSortCode = req.body.recipSortCode;
    const recipAccNum = Number(req.body.recipAccNum);

    const transfer_amount = req.body.transfer;    
    const ref = req.body.ref;


    User.find({  //find both sender and recipient accounts
        sortcode: 123201,
        accNum: {$in: [recipAccNum, senderAccNum]}
    })
        .then(users => {

            users.forEach(user => {  
                user.accounts.forEach( acc => {
                    
                    switch(acc.accNum) {
                        case senderAccNum:
                            console.log('sender')
                            handleTransfer(acc, recipFname, recipLname, -transfer_amount, ref); //if sender account, handle transfer using -amount. 
                            break;
                        case recipAccNum:
                            handleTransfer(acc, senderFname, senderLname, transfer_amount, ref); //if recipient account, handle transfer using +amount.
                            break;
                    };
                });
                user.save(); //save changes to db
            });
        });
    });
   

module.exports = router;


