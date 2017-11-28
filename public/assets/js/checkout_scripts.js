function apply_quantity()
{
    update_cart('apply_quantity');
}
function update_cart(action)
{
    var inputs = check_action(action);
    take_action(inputs);
}
    
function check_action(action)
{
    var inputs = [];
    switch(action)
    {
        case "apply_tax":
            inputs = {
                'action' : 'apply_tax',
                'state_name'  : $('#administrative_area_level_1').val(),
                'postcode'    : $('#postal_code').val()
            };
            break;
        case "apply_quantity":
            inputs = {
                'action' : 'apply_quantity',
                'quantity'  : $('#quantity').val()
            };
            break;
        case "apply_shipping_price":
            inputs = {
                'action' : 'apply_shipping_price',
                'ordertype'  : $('#check_free_shipping').val()
            };
            break;
        case "apply_product_price":
            inputs = {
                'action' : 'apply_product_price',
                'bottletype'  : $('#bottletype').val()
            };
            break;
    }
    return inputs;
}
    
function take_action(inputs)
{
    $.ajax({
        url: base_url + "checkout/update_cart",
        method: "POST",
        data: inputs,
        dataType: 'json',
        beforeSend: function () {
            $("#loader").show();
        },
        success: function (response) 
        {
            //console.log('Coupon');
            console.log(response);
            if (response.status == "success")
            {
                setInterval(function ()
                {
                    $("#loader").css('display', 'none');

                }, 3000);
                $("#cart_div").html(response.output);
                $("#plan_info").html(response.plan_info);
            }
            else
            {
                $("#loader").hide();
                $("#errorMessage").html(response.message);
                $("#errorMessage").show();
                 $(function() {
                        // setTimeout() function will be fired after page is loaded
                        // it will wait for 5 sec. and then will fire
                        // $("#successMessage").hide() function
                        setTimeout(function() {
                            $('#errorMessage').fadeOut('fast');
                        }, 5000);
                    });
            }
        },
        error: function (error) {
            $("#loader").hide();
        }
    });
}

        
//ready function

$(document).ready(function () 
{
    $('.m-paypal-payment').css('display','none');
    //hide/show credit card info section or paypal section
    $('input[type="radio"]').click(function () {
        if ($(this).attr("value") == "card-payment") {
            $(".box").not(".card-payment").hide();
            $(".card-payment").show();

        }
        if ($(this).attr("value") == "paypal-payment") {
            $(".box").not(".paypal-payment").hide();
            $(".paypal-payment").show();
        }
    });

    //validation custom rule for alphanumeric character
    $.validator.addMethod("alphanumeric", function (value, element) {
        return this.optional(element) || /^[a-z0-9\-\s]+$/i.test(value);
    }, "Username must contain only letters, numbers, or dashes");
    
    //validation custom rule for lettersonly
    $.validator.addMethod("lettersonly", function (value, element)
    {
        return this.optional(element) || /^[a-z," "]+$/i.test(value);
    }, "Enter letters and spaces only");

    //validation custom rule for custom email
    $.validator.addMethod("customemail",function (value, element) 
    {
        return /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value);
    }, "Enter valid email");

    //validation custom rule for credit card expiration date validation
    $.validator.addMethod('CCExp', function (value, element, params) {
        var minMonth = new Date().getMonth() + 1;
        var minYear = new Date().getFullYear();
        var month = parseInt($(params.month).val(), 10);
        var year = parseInt($(params.year).val(), 10);
        return (year > minYear || (year === minYear && month >= minMonth));
    }, 'Credit card expiration month and year is invalid');
    
    // Add US Phone Validation
    $.validator.addMethod("phoneUS", function (value, element) {
        return this.optional(element) || value.length > 9 && /^[0-9," "\-\.\+\(\)\s]+$/i.test(value);
    }, "");
    
    // Add US postalcode validation
    $.validator.addMethod("postalcodeUS", function (value, element) {
        return this.optional(element) || /^[0-9\-\s]+$/i.test(value);
    }, "");

    //checkout form validation
    $('#frm_addcust').validate({
        rules: {
            country: {
                required: true
            },
            first_name: {
                required: true,
                lettersonly: true,
                maxlength: 25
            },
            last_name: {
                required: true,
                lettersonly: true,
                maxlength: 25
            },
            address: {
                required: true
            },
            alternate_address: {
                alphanumeric: false
            },
            city: {
                required: true,
                lettersonly: true
            },
            state: {
                required: true
            },
            postcode: {
                required: true,
                postalcodeUS: true,
                minlength: 5,
                maxlength: 10
            },
            email: {
                required: true,
                customemail: true
            },
            phone_number: {
                required: true,
                //digits: true,
                minlength: 10,
                maxlength: 16,
                phoneUS : true
            },
            first_name_on_card: {
                required: true,
                lettersonly: true
            },
            last_name_on_card: {
                required: true,
                lettersonly: true
            },
            card_number: {
                required: true,
                digits: true,
                minlength: 12,
                maxlength: 16
            },
            month: {
                required: true
            },
            year: {
                required: true,
                CCExp: {
                    month: '#month',
                    year: '#year'
                }
            },
            cvv: {
                required: true,
                digits: true,
                minlength: 3,
                maxlength: 4
            },
            billing_address :{
                required: true
            },
            billing_alternate_address: {
                alphanumeric: true
            },
            billing_state :{
                required: true
            },
            billing_city :{
                required: true,
                lettersonly: true
            },
            billing_postcode :{
                required: true,
                postalcodeUS: true,
                minlength: 5,
                maxlength: 10
            },
            terms_and_conditions: {
                required: true
            }
        },
        messages: {
            country: {
                required: 'Select country'
            },
            first_name: {
                required: 'Enter your first name',
                lettersonly: 'Please enter a valid first name',
                maxlength: 'First name is maximum 12 character only'
            },
            last_name: {
                required: 'Enter your last name',
                lettersonly: 'Please enter a valid last name',
                maxlength: 'Last name is maximum 12 character only'
            },
            address: {
                required: 'Enter your shipping address'
            },
            alternate_address: {
                alphanumeric: 'Enter valid address'
            },
            city: {
                required: 'Enter your city name',
                lettersonly: 'Please enter a valid city name',
            },
            state: {
                required: 'Select state'
            },
            postcode: {
                required: 'Enter zip code',
                postalcodeUS: 'Please enter a valid zip code',
                minlength: 'Zip Code is minimum 5 number',
                maxlength: 'Zip Code is maximum 10 number'
            },
            email: {
                customemail: 'Please enter a valid email address',
                required: 'Enter your email address'
            },
            phone_number: {
                required: 'Enter your phone number',
                minlength: 'Phone number is minimum 10 number only',
                //digits: 'Please enter a valid phone number',
                maxlength: 'Phone number is maximum 16 number only',
                phoneUS : 'Please enter a valid phone number'
            },
            first_name_on_card: {
                required: 'Enter your first name as shown on card',
                lettersonly: 'Please enter a valid first name'
            },
            last_name_on_card: {
                required: 'Enter your last name as shown on card',
                lettersonly: 'Please enter a valid last name'
            },
            card_number: {
                required: 'Enter your credit card number',
                minlength: 'Please enter a valid credit card number',
                maxlength: 'Card number must be maximum 16 number in length',
                digits: 'Card number is valid integer only'
            },
            month: {
                required: 'Select expiry month'
            },
            year: {
                required: 'Select expiry year'
            },
            cvv: {
                required: 'Enter your CVV as shown on your card',
                digits: 'Please enter a valid CVV number',
                minlength: 'CVV must be minimum 3 number in length',
                maxlength: 'Please enter a valid CVV number'
            },
            billing_address :{
                required: 'Enter your billing address'
            },
            billing_alternate_address: {
                alphanumeric: 'Enter valid address'
            },
            billing_state :{
                required: 'Select state'
            },
            billing_city :{
                required: 'Enter your city name',
                lettersonly: 'Please enter a valid city name',
            },
            billing_postcode :{
                required: 'Enter zip code',
                postalcodeUS:'Please enter a valid zip code',
                minlength: 'Zip Code is minimum 5 number',
                maxlength: 'Zip Code is maximum 10 number'
            },
            terms_and_conditions: {
                required: 'Accept terms and conditions'
            }
        },
        submitHandler: function () {
            $('#btn_submit').prop('disabled', true);
            $('#btn_paypal').prop('disabled', true);
            $('#btn_submit').html('<div class="loader">Processing<span class="loader__dot">.</span><span class="loader__dot">.</span><span class="loader__dot">.</span></div>');
            $('#btn_paypal').html('<div class="loader">Processing<span class="loader__dot">.</span><span class="loader__dot">.</span><span class="loader__dot">.</span></div>');
            return true;
        }
    });
});
function showpayment(type)
{
    if (type === 'auth')
    {
        $('.paypal-payment').hide();
        $('.ppal-active').removeClass('active');
        $('.auth-active').addClass('active');
        $('.card-payment').show();
        $('input[name=place-order]').show();
    } else
    {
        $('.card-payment').hide();
        $('.auth-active').removeClass('active');
        $('.ppal-active').addClass('active');
        $('.paypal-payment').show();
        $('input[name=place-order]').hide();
    }
}

//update product price according to quantity
$("#quantity").change(function()
{
    //update quantity session's order array
    apply_quantity()
});

//show or hide billing info form
function show_billing_address()
{
    if($('.billing-checkbox').is(":checked"))   
    {
        $(".billing-section").hide();
        $('#billing_checkbox').attr('value','1');
    }
    else
    {
        $(".billing-section").show();
        $('#billing_checkbox').attr('value','0');
    }
}
//checked terms and condition
function checked_newsletter()
{
    if($('.nl-checkbox').is(":checked"))   
    {
        $('#news_letter').attr('value','1');
    }
    else
    {
        $('#news_letter').attr('value','0');
    }
}
//checked terms and condition
function checked_terms_condition()
{
    if($('.tc-checkbox').is(":checked"))   
    {
        $('#terms_conditions').attr('value','1');
        $('.tc-checkbox').prop( "checked", true );
    }
    else
    {
        $('.tc-checkbox').prop( "checked", false );
        $('#terms_conditions').attr('value','0');
    }
}

//autocomplete script
var autocomplete;

var componentForm = {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name', //city name
    administrative_area_level_1: 'long_name', //state
    country: 'long_name', //country name
    postal_code: 'short_name'//postal_code
};

function initAutocomplete() {
    // Create the autocomplete object, restricting the search to geographical
    // location types.
    autocomplete = new google.maps.places.Autocomplete(
            /** @type {!HTMLInputElement} */(document.getElementById('stree_address')),
            {types: ['geocode'],componentRestrictions: {country: "us"}});
    // When the user selects an address from the dropdown, populate the address
    // fields in the form.
    autocomplete.addListener('place_changed', fillInAddress);
}

function fillInAddress() {
    var place = autocomplete.getPlace();
    // Get each component of the address from the place details
    // and fill the corresponding field on the form.
    for (var component in componentForm) {
        document.getElementById(component).value = '';
        document.getElementById(component).disabled = false;
    }
    var address_line = '';
    document.getElementById('stree_address').value = '';
    for (var i = 0; i < place.address_components.length; i++)
    {
        var addressType = place.address_components[i].types[0];
        if (componentForm[addressType])
        {
            var val = place.address_components[i][componentForm[addressType]];
            if (addressType === 'street_number' || addressType === 'route')
            {
                if (val != 'undefined')
                {
                    address_line += ' ' + val;
                    address_line = $.trim(address_line);
                    document.getElementById('stree_address').value = address_line;
                }
            }
            else
            {
                if (addressType === 'administrative_area_level_1')
                {
                    $("#administrative_area_level_1 option").filter(function () {
                        return ($(this).text() === val || $(this).val() === val);
                    });
                }
                document.getElementById(addressType).value = val;
            }
        }

    }
    //update tax
    update_cart('apply_tax');
}

function geolocate() 
{
    if (navigator.geolocation) 
    {
        navigator.geolocation.getCurrentPosition(function (position) 
        {
            var geolocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            var circle = new google.maps.Circle({
                center: geolocation,
                radius: position.coords.accuracy
            });
            autocomplete.setBounds(circle.getBounds());
        });
    }
}
//autocomplete script ends
function checkup()
{
    $( "#postal_code" ).focus();
}
