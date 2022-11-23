const methods = {
  getName() {
    return this.name;
  },
  getAge() {
    return this.age;
  },
  getYearOfBirth() {
    const currentYear = new Date().getFullYear();
    return currentYear - this.age;
  },
  getFullInfo(title = "") {
    return `${title} ${this.name} born in ${
      new Date().getFullYear() - this.age
    }`;
  },
};

const person1 = {
  name: "Tom Petty",
  age: 41,
};

const person3 = {
  name: "Debbie Harry",
  age: 77,
};

log(methods.getFullInfo.call(person1, "Mr"));
log(methods.getFullInfo.apply(person3, ["MS"]));

person1.getInfo = methods.getFullInfo.bind(person1);

log(person1.getInfo("Superstar"));
