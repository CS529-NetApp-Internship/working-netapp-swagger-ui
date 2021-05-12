import modelsFilter from "./modelsFilter";

export default function(taggedOps, modelsDefinition, phrase) {
  // duplicative work is happening here is with the calls to modelsFilter
  const filteredModels = modelsFilter(modelsDefinition, phrase);

  // iterate through taggedOps
  for (let [key, value] of taggedOps) {
    // filteredOps is a list of Objects
    let filteredOps = value.get("operations");
    for (let i = 0; i < filteredOps.size; i++) {
      let op = filteredOps.get(i);
      let foundMatch = false;
      if (op.get("method") != "x-ntap-long-description") {
        // responses is nested object
        let responses = op.getIn(["operation", "responses"]);
        if (responses) {
          for (let [responseCode, responseDesc] of responses) {
            let ref = responseDesc.getIn(["schema", "$ref"]);
            if (ref) {
              // identify the first occurrence of the model name
              let firstModelStringIndex = ref.lastIndexOf("/") + 1;
              // use substring to get the model name
              let foundModelName = ref.substring(firstModelStringIndex);
              //  check if the found model name exists in the filtered models
              if (filteredModels.get(foundModelName)) {
                foundMatch = true;
              }
            }
          }
        }
      }
      //   remove operations with no matches
      if (foundMatch === false) {
        filteredOps = filteredOps.delete(filteredOps.indexOf(op));
        i -= 1;
      }
    }
    // Update taggedOps with the operations containing matches
    taggedOps = taggedOps.setIn([key.toString(), "operations"], filteredOps);
  }
  return taggedOps;
}
