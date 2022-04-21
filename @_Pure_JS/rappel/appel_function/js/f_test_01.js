function f_test_01() {
    console.debug(this);
    console.debug(this[0]);
    console.debug(this[1]);
    console.debug(this[2]);
    console.debug(this[3]);
    console.debug(this[4]);
    console.debug(this[5]);
    console.debug(this[2].prototype.constructor.name, (this[2].prototype.constructor instanceof Function));
}