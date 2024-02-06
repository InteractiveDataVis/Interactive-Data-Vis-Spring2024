console.log("hello")

const string = "string";
const number = 0;
const someBoolean = true; // false;
const array = [ "one", "two", "three" ];
const obj = {
  key: 'value',
  name: 'Ellie',
  city: "San Francisco",
  zip: 94123
};

const data = [
  { key: "value" },
  { key: "value" },
];

// console.log(data);

let changeableGlobal = true;
const constantGlobal = true;
var something = true;

changeableGlobal = false;
var something = false;

function changeEmUp() {
  // this will work
  changeableGlobal = false;
  // console.log('changeableGlobal :>> ', changeableGlobal);
  // this won't work, and will throw an error in your console and stop the script
  // constantGlobal = false;
}
changeEmUp();
// console.log('changeableGlobal :>> ', changeableGlobal);


// const mapTest = array.map(d => d + " thing")
// console.log(mapTest)

// let mapTestTwo = [];
// array.forEach(d => {
//   // mapTestTwo.push(d +" thing")
//   console.log(d)
// })
// console.log(mapTestTwo)

const testOne = array.map(d => {
  // console.log("map", d)
  // return d + " thing"
  // return d.concat(" thing")
  return `${d} thing`
})
const testTwo = array.forEach(d => {
  // console.log("forEach", d)
  return d
})

// console.log(testOne)
// console.log(testTwo)

const label = document.getElementById("name-label");
const input = document.getElementById("name-input")
const button = document.getElementById("name-submit")
console.log(label)
console.log(input)
console.log(button)

let userName = 0;

function updateName() {
  console.log("clicked")
  console.log(input.value);

  // userName = userName + 1;
  userName = input.value

  // traditional
  // let stringToSay = null;
  // if (input.value === "ellie"){
  //   stringToSay = `good luck teaching ${input.value}`
  // } else {
  //   stringToSay = `welcome to class ${input.value}`
  // }

  // ternarie
  const stringToSay = userName === "ellie" 
    ? `good luck teaching ${userName}`
    : `welcome to class ${userName}`

  window.alert(stringToSay)

  label.innerHTML = "Your name is " + userName + ". Change it here: "

}
