"use strict";

$(function() {
    if( clientToken ) {
        var $button = $( "#request" );

        braintree.dropin.create({
            authorization: clientToken,
            container: "#dropin-container"
          }, function ( createErr, instance ) {
            $button.on( "click", function () {
              if( $( ".alert" ).length ) {
                  $( ".alert" ).remove();
              }
              
              var amount = $( "#amount" ).val();
              var amt = $.trim( amount ).replace( ",", "." );

              if( !isNaN( Number( amt ) ) ) {
                instance.requestPaymentMethod(function ( err, payload ) {
                    $.post( "/checkout", { payment_method_nonce: payload.nonce, amount: amt }, function( res ) {
                        var msg = res.status ? '<div class="alert alert-success mt-5">Transaction was successful.</div>' : '<div class="alert alert-danger mt-5">Transaction failed.</div>';
                        $button.after( msg );
                    });
                });
              }
            });
        });
    }
});