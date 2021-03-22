// export default function (taggedOps, phrase) {
//   return taggedOps.filter((tagObj, tag) => tag.indexOf(phrase) !== -1);
// }

const fs = require("fs");

let rawdata = fs.readFileSync("taggedops.json");
let taggedOps = JSON.parse(rawdata);
// console.log(typeof taggedOps);
console.log(
  Object.values(taggedOps).filter((tagObj, tag) => tag.indexOf("cloud") !== -1)
);
