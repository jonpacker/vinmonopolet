'use strict';

var vinmonopolet = require('../vinmonopolet');
var dataMap = require('../data-maps/product-data-map');
var setProps = require('./set-props');
var productBaseUrl = 'http://www.vinmonopolet.no/vareutvalg/varedetaljer/sku-';

function Product(row, map) {
    setProps(this, row, map || dataMap);

    if (!this.url && this.sku) {
        this.url = productBaseUrl + this.sku;
    }
}

Product.prototype.populate = function(callback) {
    vinmonopolet.getProduct(this.sku, function(err, product) {
        if (err) {
            return callback(err);
        }

        for (var key in product) {
            this[key] = product[key];
        }

        callback(null, this);
    }.bind(this));
};

module.exports = Product;
