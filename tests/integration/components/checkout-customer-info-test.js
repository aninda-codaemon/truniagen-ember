import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('checkout-customer-info', 'Integration | Component | checkout customer info', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{checkout-customer-info}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#checkout-customer-info}}
      template block text
    {{/checkout-customer-info}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
