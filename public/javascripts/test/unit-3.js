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