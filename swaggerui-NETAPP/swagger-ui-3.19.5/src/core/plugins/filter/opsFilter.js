export default function(taggedOps, phrase) {
  // return taggedOps.filter((tagObj, tag) => tag.indexOf(phrase) !== -1)

  // create regular expression using the phrase
  // the modifiers ig mean that the regex will be
  // case insensitive and match all occurrences

  let re = new RegExp(phrase, "ig");
  // iterate through key and value pairs within the object
  for (let [key, value] of taggedOps) {
    // used to track weight of the tag (big category)
    let tagWeight = 0;
    let keyMatches = key.toString().match(re);
    // let tagDescMatches = value
    //   .get("tagDetails")
    //   .get("description")
    //   .match(re);
    if (keyMatches) {
      tagWeight += 1000;
    }
    // Count matches in every operation and
    // sort the list of operations
    let filteredOps = value.get("operations");
    if (filteredOps.size !== 0) {
      for (let i = 0; i < filteredOps.size; i++) {
        let op = filteredOps.get(i);
        let opWeight = 0;
        // list of matches in path key
        let pathMatches = op.get("path").match(re);
        // list of matches in ["operation", "description"] key
        let descMatches = op.getIn(["operation", "description"]).match(re);

        let modelMatches = 0;

        let parameters = op.get("operation").get("parameters");

        // for (let x = 0; x < parameters.size; x++) {
        //   if (parameters.get(x).has("schema")) {
        //     let currentModelMatches = parameters.get(x).getIn("schema", "$ref").match(re)
        //     if (currentModelMatches) {
        //       modelMatches += currentModelMatches.size
        //     }
        //   }
        // }
        console.log(modelMatches)
        // opWeight of path match = 100
        if (pathMatches) {
          opWeight += pathMatches.length * 100;
        }
        // opWeight of description match = 1
        if (descMatches) {
          opWeight += descMatches.length;
        }
        // opWeight of model match = 50
        if (modelMatches) {
          opWeight += modelMatches.length * 50;
        }

        if (opWeight === 0) {
          // remove the operation with zero matches
          filteredOps = filteredOps.delete(filteredOps.indexOf(op));
        } else {
          // add the opWeight key to the operation
          filteredOps = filteredOps.set(i, op.set("opWeight", opWeight));
          tagWeight += opWeight;
        }
      }
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

    if (tagWeight === 0) {
      taggedOps = taggedOps.delete(key.toString());
    } else {
      taggedOps = taggedOps.setIn([key.toString(), "tagWeight"], tagWeight);
    }
    
    // console.log(JSON.stringify(filteredOps))
    // sort tagweights here
  }
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
  // console.log(JSON.stringify(taggedOps))
  return taggedOps;
}
