//  Code By Webdevtrick ( https://webdevtrick.com ) 
var cartId = "cart";

var localAdapter = {

    saveCart: function (object) {

        var stringified = JSON.stringify(object);
        localStorage.setItem(cartId, stringified);
        return true;

    },
    getCart: function () {

        return JSON.parse(localStorage.getItem(cartId));

    },
    clearCart: function () {

        localStorage.removeItem(cartId);

    }

};

var ajaxAdapter = {

    saveCart: function (object) {

        var stringified = JSON.stringify(object);
        // do an ajax request here

    },
    getCart: function () {

        // do an ajax request -- recognize user by cookie / ip / session
        return JSON.parse(data);

    },
    clearCart: function () {

        //do an ajax request here

    }

};

var storage = localAdapter;

var helpers = {

    getHtml: function (id) {

        return document.getElementById(id).innerHTML;

    },
    setHtml: function (id, html) {

        document.getElementById(id).innerHTML = html;
        return true;

    },
    itemData: function (object) {

        var count = object.querySelector(".count"),
            patt = new RegExp("^[1-9]([0-9]+)?$");
        count.value = (patt.test(count.value) === true) ? parseInt(count.value) : 1;

        var imageSrc = object.querySelector("img").getAttribute("src");

        var item = {

            name: object.getAttribute('data-name'),
            id: object.getAttribute('data-id'),
            imageSrc: imageSrc,
            count: count.value,

        };
        return item;

    },
    updateView: function () {

        var items = cart.getItems(),
            template = this.getHtml('cartT'),
            compiled = _.template(template, {
                items: items
            });
        this.setHtml('cartItems', compiled);

    },
    emptyView: function () {

        this.setHtml('cartItems', '<p>Add some items to see</p>');

    }

};

var cart = {

    count: 0,
    items: [],
    getItems: function () {

        return this.items;

    },
    setItems: function (items) {

        this.items = items;
        for (var i = 0; i < this.items.length; i++) {
            var _item = this.items[i];
        }

    },
    clearItems: function () {

        this.items = [];
        storage.clearCart();
        helpers.emptyView();

    },
    addItem: function (item) {

        if (this.containsItem(item.id) === false) {

            this.items.push({
                id: item.id,
                name: item.name,
                imageScr: item.imageSrc,
                count: item.count
            });

            storage.saveCart(this.items);


        } else {

            this.updateItem(item);

        }
        this.count += item.count;
        helpers.updateView();

    },
    containsItem: function (id) {

        if (this.items === undefined) {
            return false;
        }

        for (var i = 0; i < this.items.length; i++) {

            var _item = this.items[i];

            if (id == _item.id) {
                return true;
            }

        }
        return false;

    },
    updateItem: function (object) {

        for (var i = 0; i < this.items.length; i++) {

            var _item = this.items[i];

            if (object.id === _item.id) {

                _item.count = parseInt(object.count) + parseInt(_item.count);
                this.items[i] = _item;
                storage.saveCart(this.items);

            }

        }

    },
    removeItem: function (id) {
        for (var i = 0; i < this.items.length; i++) {
            var _item = this.items[i];
    
            if (id === _item.id) {
                if (_item.count > 1) {
                    // If there's more than one of this item, decrement count
                    _item.count--;
                } else {
                    // If it's the last item, remove it from the items array
                    this.items.splice(i, 1);
                }
    
                // Update the cart and save changes
                this.count--;
                storage.saveCart(this.items);
    
                // Exit the loop since we found and processed the item
                break;
            }
        }
    
        // Update the view
        helpers.updateView();
    }

};

document.addEventListener('DOMContentLoaded', function () {

    if (storage.getCart()) {

        cart.setItems(storage.getCart());
        helpers.updateView();

    } else {

        helpers.emptyView();

    }
    var products = document.querySelectorAll('.product img');
    [].forEach.call(products, function (product) {

        product.addEventListener('click', function (e) {
            var item = helpers.itemData(this.parentNode);
            cart.addItem(item);
        });

    });

    document.querySelector('#clear').addEventListener('click', function (e) {

        cart.clearItems();

    });


});