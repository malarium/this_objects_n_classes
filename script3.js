"Use strict";

// Let's create an object factory:
// function NintendoHero(name, age) {
//   this.name = name;
//   this.age = age;
// }

class NintendoHero {
  #name;
  #age;

  static #allHeroesAttacks = {
    MARIO: ["jump", "smash"],
    LUIGI: ["jump", "shoot"],
    PEACH: [],
  };

  constructor(name, age) {
    this.#name = name;
    this.#age = age;
  }

  getNameAndAge() {
    return `${this.#name} is ${this.#age} yo.`;
  }

  get age() {
    return this.#age;
  }

  set age(newAge) {
    this.#age = newAge;
  }

  static getHeroAttack(hero) {
    return this.#allHeroesAttacks[hero];
  }

  static getAllHeroesAttacks() {
    return this.#allHeroesAttacks;
  }
}

const mario = new NintendoHero("Mario", 45); //Instance - from class blueprint

mario.getFullInfo = methods.getFullInfo.bind(mario);

// Object create - inheritance
const luigi = Object.create(mario);
log('Empty "luigi" object based on "mario"', luigi);
log(
  "But it can still use its prototype values and methods: ",
  luigi.getFullInfo("2nd")
);

const peach = Object.create(luigi);
log("Princess Peach: ", peach);
log("Prototypes: ", peach.__proto__.__proto__);

log("Prototypes: ", this); // Window
log("Prototypes I : ", this.__proto__); // Global variables
log("Prototypes: II: ", this.__proto__.__proto__); //Window properties
log("Prototypes: III: ", this.__proto__.__proto__.__proto__); // Event target definitions
log("Prototypes: IV: ", this.__proto__.__proto__.__proto__.__proto__); // Main methods (like Object constructor)
log("Prototypes: V: ", this.__proto__.__proto__.__proto__.__proto__.__proto__); // null - nothing goes deeper

// Checking inheritance relations and properties:
log("Is Peach a descendant of Luigi? ", luigi.isPrototypeOf(peach)); // But so is Mario!

log("Does Peach have her own age property? ", peach.hasOwnProperty("age"));
log("Does Luigi have his own age property? ", luigi.hasOwnProperty("age"));
log("And Mario? ", mario.hasOwnProperty("age"));

// Let's create another hero!
const zelda = new NintendoHero("Zelda", 20);

//Lets add getNameAndAgeMethod in the Class, and:
log(zelda.getNameAndAge());
// But anyone can change the data:
zelda.name = "Mario";
log(zelda.getNameAndAge()); // Sorry, Zelda, you're Mario now!
//Let's correct that! Make it private in the Class

// Age should also be private, but it changes sometimes, so we need getter and setter:

//Static values and methods:
//log(mario.allHeroesAttacks.MARIO); //TypeError <- this exists on the constructor, not the instance
//log(NintendoHero.allHeroesAttacks.MARIO); //["jump", "smash"] , but let's make it private -> then it throws TypeError

//Static method:
log("Mario attacks: ", NintendoHero.getHeroAttack("MARIO"));

log(NintendoHero.allHeroesAttacks); // undefined
//Let's get them somehow!
//Create static methods that returns the whole object => getAllHeroesAttacks

log(NintendoHero.getAllHeroesAttacks()); // => ...and we have what we need!
//Great! Let's iterate!

const allAttacks = NintendoHero.getAllHeroesAttacks();

for (val in allAttacks) {
  log(`${val}: `, NintendoHero.getHeroAttack(val));
}

log("All attacks: ", Object.entries(allAttacks)); // Array of entries -> key, value

// For arrays we have forEach:
Object.entries(allAttacks).forEach(([key, val]) => {
  log(`${key}: ${val}`);
});

//We can do it another way:
for (const [key, val] of Object.entries(allAttacks)) {
  log(`${key}: ${val}`);
}

//Arrays are great! :)

//Class extensions:
class Animal {
  constructor(name, sound) {
    this.name = name;
    this.sound = sound;
  }

  giveVoice() {
    return `${this.name} sounds like ${this.sound}`;
  }
}

class Dog extends Animal {
  constructor(name, sound, owner) {
    super(name, sound);
    this.owner = owner;
  }

  details() {
    return `${this.owner}'s dog called ${this.giveVoice()}`;
  }
}

const reksio = new Dog("Reksio", "Hau-hau", "Adam");
const zwyklyPolskiParowkowy = new Dog("Azor", "uff-uff", "Halyna");

log(reksio.details());
log(zwyklyPolskiParowkowy.details());
