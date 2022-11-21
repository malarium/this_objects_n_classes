"use strict";
const { log } = console;

// What is THIS keyword?
// It refers to some object.
// Let's check the top-level object for a browser:

log("Global THIS: ", this);
log("My screen data: ", this.screen);
log("Do we have access to the Internat? ", this.navigator.onLine);

const person = {
  name: "Jon",
  lastName: "Snow",
  died: true,
  age: 35,

  getWholeObject() {
    return this;
  },

  getWholeObjectAsArrowFC: () => {
    return this;
  },

  getName() {
    //The same as: "getName: function() {...}"
    return `${this.name} ${this.lastName}`; // Jon Snow
  },

  getAge: () => {
    return this.age; //undefined
  },

  setName(name) {
    this.name = name;
  },
};

log("The whole object from regular function: ", person.getWholeObject()); // person {...}
log("The whole object from ARROW function: ", person.getWholeObjectAsArrowFC()); // Window
log("Get name: ", person.getName()); // Jon Snow
person.setName('Jon "Know Nothing"');
log("Get name: ", person.getName()); // Jon "Know Nothing" Snow
log("Get age: ", person.getAge()); // 35

// This object doesn't have any getters;
const person2 = {
  name: "Tom",
  lastName: "Cat",
  age: 4,
  food: "Jerry and turkey",
};

person2.getRegThis = person.getWholeObject;
person2.getArrThis = person.getWholeObjectAsArrowFC;

log(person2.getRegThis()); // person2 {...}
log(person2.getArrThis()); // Window

// so...
person2.getName = person.getName;

log("Full name of another object: ", person2.getName());

// But this is not neat! This is why we have bind, call and apply for:

/* BIND CALL APPLY */

//To use 'call' we can extract logic into a separate function:

function getFavFood() {
  // If arrow function used then 'this' returns undefined as arrow functions do not create context - regular function then;
  return this.food;
}
// (this function could be a part of an object not to be kept globally)

const myMethods = {
  getFavFood() {
    return this.food;
  },
  getName() {
    return this.name;
  },
};

log(
  "Method from person called once on person2 with CALL: ",
  myMethods.getFavFood.call(person2)
);

//Be careful to always contain object values inside them and do not rely on global values:

const globalValue = "Property available everywhere";
// To make it accessible truly globally :
// globalValue = "Property available everywhere"; <- Omit the 'const' or 'let' or 'var' keyword. Does't work in strict mode.
Window.prototype.globalValue = "Property available everywhere";

function showGlobal() {
  log("Global value: ", this.globalValue);
}

// showGlobal.call(); // TypeError in strict and undefined in regular mode (unless declared globally);
showGlobal.call(window); // Works if global was specifically attached to Window object;

// Obvious conclusion: every globally available variable, object or function is in fact a property of window.

//CALL vs APPLY

// APPLY works exactly like call, the only difference is in parameters:

function giveInfo(title, emoji) {
  return `${title} ${this.name} is ${this.age} years old ${emoji}`;
}

const Ann = {
  name: "Anna Johnson",
  age: 34,
};

const Bob = {
  name: "Bob Tucker",
  age: 28,
};

// CALL:
log(giveInfo.call(Ann, "Mrs.", "😘"));

//APPLY:
log(giveInfo.apply(Bob, ["Mr.", "💩"]));

/* BIND */
//If we need to permanently attach a method to an object:

Ann.info = giveInfo.bind(Ann);
log('Ann object after "bind": ', Ann);
log(Ann.info("Miss", "🧝‍♀️"));
