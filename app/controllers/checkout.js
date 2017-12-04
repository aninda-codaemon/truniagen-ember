import Ember from 'ember';

export default Ember.Controller.extend({
    responseMessage: '',
    first_name: '',
    last_name: '',
    address: '',
    city: '',
    postcode: '',
    state: '',
    email: '',
    phone_number: '',
    first_name_on_card: '',
    last_name_on_card: '',
    card_number: '',
    cvv: '',
    isValidFname: Ember.computed.match('first_name', /^[a-zA-Z]*$/),
    isValidLname: Ember.computed.match('last_name', /^[a-zA-Z]*$/),
    //isValidAddress: Ember.computed.match('address', /^[.0-9a-zA-Z\s,-]+$/),
    isValidAddress: Ember.computed.notEmpty('address'),
    isValidCity: Ember.computed.notEmpty('city'),
    isValidPcode: Ember.computed.match('postcode', /[0-9]/),
    isPostcodeLong: Ember.computed.equal('postcode.length', 7),
    isValidZip: Ember.computed.and('isValidPcode', 'isPostcodeLong'),
    isValidState: Ember.computed.notEmpty('state'),
    isValidEmail: Ember.computed.match('email', /^.+@.+\..+$/),
    isValidFCname: Ember.computed.match('first_name_on_card', /^[a-zA-Z]*$/),
    isValidLCname: Ember.computed.match('last_name_on_card', /^[a-zA-Z]*$/),
    isValidCardNum: Ember.computed.match('card_number', /[0-9]/),
    isValidCardNumLong: Ember.computed.equal('card_number.length', 7),
    isValidCC: Ember.computed.and('isValidCardNum', 'isValidCardNumLong'),
    isValidCvvNum: Ember.computed.match('cvv', /[0-9]/),
    isValidCcNumLong: Ember.computed.equal('cvv.length', 3),
    isValidCvvC: Ember.computed.and('isValidCvvNum', 'isValidCcNumLong'),
    isMessageLong: Ember.computed.gte('message.length', 5),
    isValid: Ember.computed.and('isValidEmail', 'isMessageLong'),
    actions: {
        updateStateSelect: function(data){
            this.set('state', data);
            console.log('State:', data);
        },
        updateBottleTypeChange: function(data){
            console.log('Bottle Type: ', data);
            $.post('http://localhost/prohealthspan/checkout/update_cart', {bottletype: 6, action: 'apply_product_price'}).done(function(result){
                console.log(result);
            })
        },
        submitFormValidation: function(){
            console.log('Form submit');
        }
    }
});
