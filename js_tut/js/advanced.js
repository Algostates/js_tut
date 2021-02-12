window.name = 'default person'
window.age = '0'

let person = {
    name: 'raqib',
    age: 26,
    info: function(){ // does preserve 'this'
        return this.name + ' is ' + this.age; // this points to this object (perso itself)
    },
    wrongInfo: () => { // arrow function --- doesn't preserve 'this'
        return this.name + ' is ' + this.age; // this points to global object (window)
    }
}

function checkThis(){
    this.name = 'i am checkThis function';
    return this.name;
}


// this in event handler

document.getElementById('new_button').onclick = function(e){
    // this points to the element itself --- here the clicked button---this = document.getElementById('new_button')
    e.preventDefault();
    e.stopPropagation();
    this.textContent = 'Button Name Changes!!';
    console.log('this in button click handler is working fine!!!:', this.textContent);
}

// prototype inheritance
//let a = "some string"

// attached on __prototype__
// a.length
// a.indexOf()
// a.search()
// a.slice()
// a.substr()

function sum(a, b){
    return a+b;
}

function sub(a, b){
    return a-b;
}

let jstester = {
    xpt: null,
    testNo: 1,
    expect: function(x){
        this.xpt = x;
        return this; // returning 'this' makes method chaining possible!
    },
    toBe: function(t){
       if(this.xpt !== t)
            throw new Error(`Test # ${this.testNo} Failed`);
        console.log(`%cTest # ${this.testNo} Success.`, 'color:lime;')
        ++this.testNo;
    }
}

function inc(){ // without Closure
    let someVar = 0;
    someVar++;
    return someVar;
}

function _inc(){ //  with Closure
    let someVar = 0;
    return function(){
        someVar++;
        return someVar;
    };
}

let person1 = {
    info: function(city, pincode){
        return this.name + ' is ' + this.age + ', lives in ' + city + ', ' + pincode;
    }
}

let person2 = {
    name: 'wajid',
    age: 29
}

function doAdvanced(){
    // this in object
    console.log(person.info())
    console.log(person.wrongInfo())

    // this in function
    console.log(checkThis());
    
    // method chaining using 'this' --- demo of unit testing

    jstester.expect(sum(1,2)).toBe(3)

    jstester.expect(sub(1,2)).toBe(-1)
    
    
    // without Closure
    
    inc();
    inc();
    inc();
    let i = inc();
    console.log('i:', i);
    //jstester.expect(i).toBe(4) // will fail
    
    // with closure
    let myInc = _inc(); // first get closure function from _inc()
    
    myInc();
    myInc();
    myInc();
    i = myInc();
    console.log('i:', i);
    jstester.expect(i).toBe(4) // will pass

    // usage of bind()

    let c = 'srinagar', p = '190011';
    person1.info = person1.info.bind(person2)
    
    console.log('Info of person1 using person2 -- bind():', person1.info(c, p));
    
    // usage of call() -- pass new this temporarily
    // reset this back to person1
    person1.info = person1.info.bind(person1)
    console.log('Info of person1 using person2 -- call():', person1.info.call(person2, c, p));
    
    // usage of apply() -- pass new this temporarily
    console.log('Info of person1 using person2 -- call():', person1.info.apply(person2, [c, p]));

    // call and apply diff in way of param passing.

    // application of call/apply
    // ex: Math.max()

    console.log('max of 1, 2:', Math.max(1,2));
    console.log('max of 1, 2, 3:', Math.max(1, 2, 3));
    // doesnt work on array of numbers but comma separated
    console.log('max of [1, 2, 3]:', Math.max([1, 2, 3])); // returns NaN
    console.log('max of [1, 2, 3]:', Math.max.apply(null, [1, 2, 3])); // returns NaN


}