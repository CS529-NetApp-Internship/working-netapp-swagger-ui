export default function(taggedOps, phrase) {
  let re = new RegExp(phrase, "ig"); // create a reg expression using the phrase (case insentitive & matches all occurences)
  // iterate through key and value pairs within the taggedOps object:
  for (let [key, value] of taggedOps) {

    let tagWeight = 0; // used to track weight of the tag (big category)
    let keyMatches = key.toString().match(re); // find number of matches in the tag

    if (keyMatches) {
      tagWeight += 1000;
    }

    let filteredOps = value.get("operations"); // get the operations from the filteredOps

    if (filteredOps.size !== 0) {
      for (let i = 0; i < filteredOps.size; i++) {
        let op = filteredOps.get(i); // get the current operation from filteredOps
        let opWeight = 0; // set the base value of variable that will hold the ranking score of a operation

        let pathMatches = op.get("path").match(re); // list of matches in path key (eight )
        let descMatches = op.getIn(["operation", "description"]).match(re); // list of matches in ["operation", "description"] key

        // update opWeight per the matches found:
        if (pathMatches) {
          opWeight += pathMatches.length * 100; // opWeight of path match = 100
        }
        if (descMatches) {
          opWeight += descMatches.length; // opWeight of description match = 1
        }

        // see if the current operation contained any matches:
        if (opWeight === 0) {
          filteredOps = filteredOps.delete(i); // remove the operation with zero matches
        } else {
          filteredOps = filteredOps.set(i, op.set("opWeight", opWeight)); // add the opWeight key to the operation info
          tagWeight += opWeight; // update the overall tag weight to reflect the operation within it's weight
        }
      }

      // sort the tag's operations by weight:
      filteredOps = filteredOps.sort(function(value1, value2) {
        if (value1.get("opWeight") > value2.get("opWeight")) {
          return -1;
        }
        if (value1.get("opWeight") < value2.get("opWeight")) {
          return 1;
        }
        if (value1.get("opWeight") === value2.get("opWeight")) {
          return 0;
        }
      });
    }
    // Set filtered operations to respective tag
    taggedOps = taggedOps.setIn([key.toString(), "operations"], filteredOps);

    // see if the current tag contained any matches:
    if (tagWeight === 0) {
      taggedOps = taggedOps.delete(key.toString());  // delete tags with no matches
    } else {
      taggedOps = taggedOps.setIn([key.toString(), "tagWeight"], tagWeight);
    }
  }
  // sort the tags by weight:
  taggedOps = taggedOps.sort(function(value1, value2) {
    if (value1.get("tagWeight") > value2.get("tagWeight")) {
      return -1;
    }
    if (value1.get("tagWeight") < value2.get("tagWeight")) {
      return 1;
    }
    if (value1.get("tagWeight") === value2.get("tagWeight")) {
      return 0;
    }
  })
  return taggedOps; // return the sorted tags and their operations
}
