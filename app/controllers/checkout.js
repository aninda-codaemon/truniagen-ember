import Ember from 'ember';

export default Ember.Controller.extend({
    actions: {
        updateBottleTypeChange: function(data){
            console.log('Bottle Type: ', data);
        }
    }
});
