export default function(taggedOps, phrase) {
  // return taggedOps.filter((tagObj, tag) => tag.indexOf(phrase) !== -1)

  // create regular expression using the phrase
  // the modifiers ig mean that the regex will be
  // case insensitive and match all occurrences
  let re = new RegExp(phrase, "ig");
  // iterate through key and value pairs within the object
  for (let [key, value] of taggedOps) {
    // Count matches in every operation and
    // sort the list of operations
    let filteredOps = value.get("operations");
    if (filteredOps.size !== 0) {
      for (let i = 0; i < filteredOps.size; i++) {
        let op = filteredOps.get(i);
        let weight = 0;
        // list of matches in path key
        let pathMatches = op.get("path").match(re);
        // list of matches in ["operation", "description"] key
        let descMatches = op.getIn(["operation", "description"]).match(re);

        // Weight of path match = 100
        if (pathMatches) {
          weight += pathMatches.length * 100;
        }
        // Weight of description match = 1
        if (descMatches) {
          weight += descMatches.length;
        }
        if (weight === 0) {
          // remove the operation with zero matches
          filteredOps = filteredOps.delete(i);
        } else {
          // add the weight key to the operation

          op = op.set("weight", weight);
          filteredOps = filteredOps.set(i, op);
        }
        console.log(JSON.stringify(filteredOps));
      }
    }

    // Set filtered operations to respective tag
    taggedOps = taggedOps.setIn([key.toString(), "operations"], filteredOps);

    if (
      taggedOps.getIn([key.toString(), "operations"]).isEmpty() &&
      taggedOps
        .getIn([key.toString(), "tagDetails", "description"])
        .indexOf(phrase) === -1
    ) {
      taggedOps = taggedOps.delete(key.toString());
    }
  }
  return taggedOps;
}
