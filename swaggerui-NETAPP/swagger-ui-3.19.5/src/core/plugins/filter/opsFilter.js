export default function(taggedOps, phrase, options) {
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
        // check if the path checkbox is checked and if none of the sub-checkboxes are checked
        // If this is true, then count the number of matches in the path name
        if (
          options["endpointsOptions"]["paths"] ||
          (options["endpoints"] &&
            !(
              options["endpointsOptions"]["paths"] ||
              options["endpointsOptions"]["description"] ||
              options["endpointsOptions"]["method"]
            ))
        ) {
          // opWeight of path match = 100
          let pathMatches = op.get("path").match(re);
          if (pathMatches) {
            opWeight += pathMatches.length * 100;
          }
        }
        if (options["endpointsOptions"]["description"]) {
          // list of matches in ["operation", "description"] key
          let descMatches = op.getIn(["operation", "description"]).match(re);

          // opWeight of description match = 1
          if (descMatches) {
            opWeight += descMatches.length;
          }
        }

        // If there are no matches or if the method box is checked, but doesn't have the method defined in the search, then remove the operation
        if (
          opWeight === 0 ||
          (options &&
            options["endpointsOptions"]["method"] &&
            !options["endpointsOptions"]["methodOptions"][op.get("method")])
        ) {
          filteredOps = filteredOps.delete(filteredOps.indexOf(op));
          i -= 1;
        } else {
          // add the opWeight key to the operation
          filteredOps = filteredOps.set(i, op.set("opWeight", opWeight));
          tagWeight += opWeight;
        }
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

    // Set filtered operations to respective tag
    taggedOps = taggedOps.setIn([key.toString(), "operations"], filteredOps);

    // see if the current tag contained any matches:
    if (tagWeight === 0) {
      taggedOps = taggedOps.delete(key.toString()); // delete tags with no matches
    } else {
      taggedOps = taggedOps.setIn([key.toString(), "tagWeight"], tagWeight);
    }
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
  });
  return taggedOps;
}
