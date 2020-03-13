'use strict';

const express = require('express');
const router = express.Router();
const braintree = require('braintree');
const { merchantId, publicKey, privateKey } = require('../config');
const gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    merchantId,
    publicKey,
    privateKey
});

router.get('/', (req, res, next) => {
    gateway.clientToken.generate({}, (err, response) => {
        const { clientToken } = response;
        res.render('index', { clientToken } );
    });    
});

router.post('/checkout', (req, res, next) => {

    const nonceFromTheClient = req.body.payment_method_nonce;
    const amount = req.body.amount;

    gateway.transaction.sale({
        amount: amount,
        paymentMethodNonce: nonceFromTheClient,
        options: {
          submitForSettlement: true
        }
      }, (err, result) => {
          res.send( { status: result.success  } )
    });
});

module.exports = router;