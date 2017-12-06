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
    isBillSameShip: true,
    billing_address: '',
    billing_state: '',
    billing_city: '',
    billing_postcode: '',
    isTermsConditions: false,
    isValidFnameLen: Ember.computed.notEmpty('first_name'),
    isValidFnameChar: Ember.computed.match('first_name', /^[a-zA-Z]*$/),
    isValidFname: Ember.computed.and('isValidFnameLen', 'isValidFnameChar'),
    isValidLnameLen: Ember.computed.notEmpty('last_name'),
    isValidLnameChar: Ember.computed.match('last_name', /^[a-zA-Z]*$/),
    isValidLname: Ember.computed.and('isValidLnameLen', 'isValidLnameChar'),
    //isValidAddress: Ember.computed.match('address', /^[.0-9a-zA-Z\s,-]+$/),
    isValidAddress: Ember.computed.notEmpty('address'),
    isValidCity: Ember.computed.notEmpty('city'),
    isValidPcode: Ember.computed.match('postcode', /[0-9]/),
    isPostcodeLong: Ember.computed.equal('postcode.length', 7),
    isValidZip: Ember.computed.and('isValidPcode', 'isPostcodeLong'),
    isValidState: Ember.computed.notEmpty('state'),
    isValidEmail: Ember.computed.match('email', /^.+@.+\..+$/),
    isValidFCnameLen: Ember.computed.notEmpty('first_name_on_card'),
    isValidFCnameChar: Ember.computed.match('first_name_on_card', /^[a-zA-Z]*$/),
    isValidFCname: Ember.computed.and('isValidFCnameLen', 'isValidFCnameChar'),
    isValidLCnameLen: Ember.computed.notEmpty('last_name_on_card'),
    isValidLCnameChar: Ember.computed.match('last_name_on_card', /^[a-zA-Z]*$/),
    isValidLCname: Ember.computed.match('isValidLCnameLen', 'isValidLCnameChar'),
    isValidCardNum: Ember.computed.match('card_number', /[0-9]/),
    isValidCardNumLong: Ember.computed.gte('card_number.length', 12),
    isValidCC: Ember.computed.and('isValidCardNum', 'isValidCardNumLong'),
    isValidCvvNum: Ember.computed.match('cvv', /[0-9]/),
    isValidCcNumLong: Ember.computed.equal('cvv.length', 3),
    isValidCvvC: Ember.computed.and('isValidCvvNum', 'isValidCcNumLong'),
    isValidBAddress: Ember.computed.notEmpty('billing_address'),
    isValidBState: Ember.computed.notEmpty('billing_state'),
    isValidBCity: Ember.computed.notEmpty('billing_city'),
    isValidBPcode: Ember.computed.match('billing_postcode', /[0-9]/),
    isBPostcodeLong: Ember.computed.equal('billing_postcode.length', 7),
    isMessageLong: Ember.computed.gte('message.length', 5),
    isValid: Ember.computed.and('isValidEmail', 'isMessageLong'),
    actions: {
        updateStateSelect: function(data){
            this.set('state', data);
            console.log('State:', data);
        },
        updateBStateSelect: function(data){
            this.set('billing_state', data);
            console.log('Billing State:', data);
        },
        updateBottleTypeChange: function(data){
            console.log('Bottle Type: ', data);
            $.post('http://localhost/prohealthspan/checkout/update_cart', {bottletype: 6, action: 'apply_product_price'}).done(function(result){
                console.log(result);
            });
        },
        toggleBillingAddress: function(){
            this.toggleProperty('isBillSameShip');
            if (!this.get('isBillSameShip')){
                Ember.$('#billing_info').show();
            }else {
                Ember.$('#billing_info').hide();
            }
        },
        checkTermsConditions: function(){
            this.toggleProperty('isTermsConditions');
            console.log(this.get('isTermsConditions'));
        },
        submitFormValidation: function(){
            console.log('Form submit');
            let flag = 0;

            if (this.get('isValidFname')){
                Ember.$('#first_name-error').hide();
            }else{
                flag += 1;
                Ember.$('#first_name-error').show();
            }

            if (this.get('isValidLname')){
                Ember.$('#last_name-error').hide();
            }else{
                flag += 1;
                Ember.$('#last_name-error').show();
            }

            if (this.get('isValidAddress')){
                Ember.$('#street_address-error').hide();
            }else{
                flag += 1;
                Ember.$('#street_address-error').show();
            }

            if (this.get('isValidCity')){
                Ember.$('#locality-error').hide();
            }else{
                flag += 1;
                Ember.$('#locality-error').show();
            }

            if (this.get('isValidZip')){
                Ember.$('#postal_code-error').hide();
            }else{
                flag += 1;
                Ember.$('#postal_code-error').show();
            }

            if (this.get('isValidState')){
                Ember.$('#state-error').hide();
            }else{
                flag += 1;
                Ember.$('#state-error').show();
            }

            if (this.get('isValidEmail')){
                Ember.$('#email-error').hide();
            }else{
                flag += 1;
                Ember.$('#email-error').show();
            }

            if (this.get('isValidEmail')){
                Ember.$('#email-error').hide();
            }else{
                flag += 1;
                Ember.$('#email-error').show();
            }

            if (this.get('isValidFCname')){
                Ember.$('#first_name_on_card-error').hide();
            }else{
                flag += 1;
                Ember.$('#first_name_on_card-error').show();
            }

            if (this.get('isValidLCname')){
                Ember.$('#last_name_on_card-error').hide();
            }else{
                flag += 1;
                Ember.$('#last_name_on_card-error').show();
            }

            if (this.get('isValidCC')){
                Ember.$('#card_number-error').hide();
            }else{
                flag += 1;
                Ember.$('#card_number-error').show();
            }

            if (this.get('isValidCC')){
                Ember.$('#card_number-error').hide();
            }else{
                flag += 1;
                Ember.$('#card_number-error').show();
            }

            if (flag===0){
                console.log('Form has submit and ajax call');
            }else {
                console.log('Form has errors');
            }
        }
    }
});
