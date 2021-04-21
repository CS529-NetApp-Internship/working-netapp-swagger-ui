import Fuse from "fuse-immutable";

export default function(taggedOps, phrase) {
  var start = performance.now();
  const DEFAULT_KEYS = ["path", "operation.description"];
  const options = {
    isCaseSensitive: false,
    includeScore: false,
    shouldSort: false,
    includeMatches: false,
    // TODO: decide on whether to keep this or not
    findAllMatches: true,
    // only matches with 3 or more characters will be returned
    minMatchCharLength: 3,
    // FUZZY MATCHING OPTIONS
    // TODO: decide on whether to keep this or not
    threshold: 0.5,
    ignoreLocation: true,
    keys: DEFAULT_KEYS
  };

  // console.log(JSON.stringify(results));

  // iterate through key and value pairs within the taggedOps object:
  for (let [key, value] of taggedOps) {
    let ops = value.get("operations"); // get the operations from the ops
    if (ops.size !== 0) {
      const fuse = new Fuse(ops, options);

      let filterResults = fuse.search(phrase);
      // Set filtered operations to respective tag
      taggedOps = taggedOps.setIn([key, "operations"], filterResults);
    }

    // TODO: finish tag deletion operation
    // see if the current tag contained any matches:
    // if (tagWeight === 0) {
    //   taggedOps = taggedOps.delete(key.toString()); // delete tags with no matches
    // } else {
    //   taggedOps = taggedOps.setIn([key.toString(), "tagWeight"], tagWeight);
    // }
  }
  var end = performance.now();
  console.log(end - start);
  return taggedOps; // return the sorted tags and their operations
}
