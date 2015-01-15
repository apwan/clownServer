var Money = function(options) {
    this.amount = options.amount || 0;
    this.template = options.template || "{symbol}{amount}";
    this.symbol = options.symbol || "$";
};
Money.prototype = {
    add: function(toAdd) {
        this.amount += toAdd;
    },
    toString: function() {
        return this.template
            .replace("{symbol}", this.symbol)
            .replace("{amount}", this.amount)
    }
};
Money.euro = function(amount) {
    return new Money({
        amount: amount,
        template: "{amount} {symbol}",
        symbol: "EUR"
    });
};

module("Money", {
    setup: function() {
        this.dollar = new Money({
            amount: 15.5
        });
        this.euro = Money.euro(14.5);
    },
    teardown: function() {
        // 可以使用 this.dollar 和 this.euro 作清除
    }
});
     
test("add", function() {
    equal( this.dollar.amount, 15.5 );
    this.dollar.add(16.1)
    equal( this.dollar.amount, 31.6 );
});
test("toString", function() {
    equal( this.dollar.toString(), "$15.5" );
    equal( this.euro.toString(), "14.5 EUR" );
});