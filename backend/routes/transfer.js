const router = require('express').Router();
let User = require('../models/user.model');

class Transfer {
    constructor(type, amount, name,ref_, date){ //Constructs transaction objects
        this.transactionType = type;
        this.amount = amount;
        this.name = name;
        this.Ref = ref_;
        this.Date = date;
    }

    static sortUsers(users, senderAccNum, recipAccNum){
        var sender;
        var recip;

        users.forEach( user => { 
            const accountList = user.accounts; //each user contains an array of bank account objects
            accountList.forEach( acc => {
  
                switch (acc.accNum){
                    case senderAccNum:
                        sender = acc;
                        break;
                    case recipAccNum:
                        recip = acc;
                }
            })
        })
        return [sender, recip];
    }

    static handleTransfer(acc, name, amount, ref) {

        const today = new Date();
        const date = String(today.toLocaleDateString());
        const transaction = new Transfer('Transfer', amount, name, ref, date); //Create new instance of transaction object. Contains information about transfer.
        const statementList  = acc.statement;
    
        acc.balance += Number(amount); //add transfer amount to balance
        statementList.unshift(transaction); //add transaction to beginning of statement list.
    }

}








router.route('/').post((req,res) => { // .../transfer/
    const senderName = req.body.senderFname + ' ' + req.body.senderLname;
    const senderAccNum = Number(req.body.senderAccNum);
    const recipName = req.body.recipFname + ' ' + req.body.recipLname;
    const recipAccNum = Number(req.body.recipAccNum);
    const transfer_amount = req.body.transfer;    
    const ref = req.body.ref;

    User.find({  //find both sender and recipient accounts
        sortcode: 123201,
        accNum: {$in: [recipAccNum, senderAccNum]}
    })
    .then(users => {
        sortedUsers = Transfer.sortUsers(users,senderAccNum, recipAccNum);            
        Transfer.handleTransfer(sortedUsers[0], senderName, -transfer_amount, ref); //sortedUsers[0] is sender
        Transfer.handleTransfer(sortedUsers[1], recipName, transfer_amount, ref); //sortedUsers[1] is recip
        users.forEach((user) => user.save());
        });
    })
module.exports = router;


