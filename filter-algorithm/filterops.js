// export default function (taggedOps, phrase) {
//   return taggedOps.filter((tagObj, tag) => tag.indexOf(phrase) !== -1);
// }

const fs = require("fs");
const KEYWORD = "Expensive properties";
// let re = new RegExp(KEYWORD);

let rawdata = fs.readFileSync("taggedops.json");
let taggedOps = JSON.parse(rawdata);
// TODO: this is liekly not needed when refactoring
for (const value in taggedOps) {
  let currentOperations = taggedOps[value].operations;
  taggedOps[value].operations = currentOperations.filter(
    (op) => op.operation.description.indexOf(KEYWORD) !== -1
  );
}
console.log(taggedOps.storage);
