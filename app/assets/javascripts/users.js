/* global $, Stripe */
//Document ready
$(document).on('turbolinks:load', function(){
    
    var theForm = $('#pro_form');
    var submitBtn = $('#form-submit-btn');
    
    //Set stripe key
    Stripe.setPublishableKey($('meta[name="stripe-key"').attr('content'));
    
    //when user clicks form sbmt btn 
    submitBtn.click(function(event){
        
        //prevent default submission behavior
        event.preventDefault();
        
        //collect credit card fields 
        var ccNum = $('#card_number').val(),
            cvcNum = $('#card_code').val(),
            expMonth = $('#card_month').val(),
            expYear = $('#card_year').val();
        
        //send card info to Stripe
        Stripe.createToken({
            number: ccNum,
            cvc: cvcNum,
            exp_month: expMonth,
            exp_year: expYear
        }, stripeResponseHandler);
    });
    
    //Sitripe will return card token
    //injecto tokex as hidden field inside the form
    //submit form to rails app
});