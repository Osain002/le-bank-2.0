const router = require('express').Router();

let User = require('../models/user.model');

router.route('/:id/:Type').post((req, res) => {

    const accType = req.params.Type;
    const balance = 0.00;
    const sortcode = 123201;
    const accNum = Math.floor(Math.random() * 1000000000);
    const cardNum = Math.floor(Math.random() * 10000000000000000); //generate 16-digit card number
    const CV2 = Math.floor(Math.random() * 1000) // 3 digit cv2 num
    const expiryDateMM = new Date().getMonth(); //
    const expiryDateYY = new Date().getFullYear();
    const expiryDate = new Date(expiryDateYY + 5, expiryDateMM).toLocaleDateString();

    const accInfo = {
        accType,
        balance,
        sortcode,
        accNum,
        cardDetails: {
            cardNum: cardNum,
            CV2: CV2,
            expiryDate: String(expiryDate)
        }
    };

    
    User.findById(req.params.id)
        .then((user) => {
            user.accounts.push(accInfo);
            user.save()
                .then(res.redirect(`/userhome/${user.id}`));
        });
});

module.exports = router;