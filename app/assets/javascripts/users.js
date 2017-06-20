/* global $, Stripe */
//Document ready
$(document).on('turbolinks:load', function(){
    
    var theForm = $('#pro_form');
    var submitBtn = $('#form-signup-btn');
    
    //Set stripe key
    Stripe.setPublishableKey($('meta[name="stripe-key"').attr('content'));
    
    //when user clicks form sbmt btn 
    submitBtn.click(function(event){
        
        //prevent default submission behavior
        event.preventDefault();
        submitBtn.val("Processing...").prop('disabled', true);
        
        //collect credit card fields 
        var ccNum = $('#card_number').val(),
            cvcNum = $('#card_code').val(),
            expMonth = $('#card_month').val(),
            expYear = $('#card_year').val();
            
        //field validation via Stripe library
        var error = false;
        
        if(!Stripe.card.validateCardNumber(ccNum)){
            error = true;
            alert('The credit card number appears to be invalid');
        }
        
        
        if(!Stripe.card.validateCVC(cvcNum)){
            error = true;
            alert('The CVC number appears to be invalid');
        }
        
        if(!Stripe.card.validateExpiry(expMonth, expYear)){
            error = true;
            alert('The expiration date appears to be invalid');
        }

        if(error){
            //if there are errors don't send to stripe
            submitBtn.prop('disabled', false).val("Sign Up");
        } else {
            //send card info to Stripe
            Stripe.createToken({
                number: ccNum,
                cvc: cvcNum,
                exp_month: expMonth,
                exp_year: expYear
            }, stripeResponseHandler);
        }
        
        return false;
    });
    
    //Sitripe will return card token
    function stripeResponseHandler(status, response){
        //get token from response
        var token = response.id;
        
        //inject the card token in a hidden field
        theForm.append( $('<input type="hidden" name="user[stripe_card_token]">').val(token) );
        
        //submit form to rails app
        theForm.get(0).submit();
    }
    
});