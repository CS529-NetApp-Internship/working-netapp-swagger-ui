export default function(taggedOps, phrase, options, definitions, radioValue) {
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
        let size = filteredOps.size;
        if (radioValue === "models") {
          if (op.get("operation").has("responses")) {
            for (let [key2, value2] of op.getIn(["operation", "responses"])) {
                if (definitions.has(value2.getIn(["schema", "$ref"], " ").split("definitions/")[1])) {
                  opWeight += 50;
                }
              }
            }
        }
        else {

        // check if opsPath checkbox is checked and
        // count matches there
          // list of matches in path key
          if (options["endpointsOptions"]["paths"]) {
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
      }
          if (opWeight === 0) {
              // remove the operation with zero matches
              filteredOps = filteredOps.delete(filteredOps.indexOf(op));
              i-=1;
            } else {
              // add the opWeight key to the operation
              filteredOps = filteredOps.set(i, op.set("opWeight", opWeight));
              tagWeight += opWeight;
            
            if (options["endpointsOptions"]["method"]){
              if (options["endpointsOptions"]["methodOptions"]["get"]) {
                if(op.get("method") !== "get") {
                  filteredOps = filteredOps.delete(filteredOps.indexOf(op))
                  i -= 1
                }
              }
              if (options["endpointsOptions"]["methodOptions"]["post"]) {
                if(op.get("method") !== "post" && filteredOps.size !== size) {
                  filteredOps = filteredOps.delete(filteredOps.indexOf(op))
                  i -= 1
                }
              }
              if (options["endpointsOptions"]["methodOptions"]["delete"]) {
                if(op.get("method") !== "delete" && filteredOps.size !== size) {
                  filteredOps = filteredOps.delete(filteredOps.indexOf(op));
                  i -= 1
                }
              }
              if (options["endpointsOptions"]["methodOptions"]["patch"]) {
                if(op.get("method") !== "patch" && filteredOps.size !== size) {
                  filteredOps = filteredOps.delete(filteredOps.indexOf(op));
                  i -= 1
                }
              }
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
}
return taggedOps;
}