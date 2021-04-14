import Fuse from "fuse.js/dist/fuse.min.js";

export default function(taggedOps, phrase) {
  const data = [
    {
      title: "Old Man's War",
      author: {
        firstName: "John",
        lastName: "Scalzi"
      }
    },
    {
      title: "The Lock Artist",
      author: {
        firstName: "Steve",
        lastName: "Hamilton"
      }
    },
    {
      title: "HTML5",
      author: {
        firstName: "Remy",
        lastName: "Sharp"
      }
    },
    {
      title: "Right Ho Jeeves",
      author: {
        firstName: "P.D",
        lastName: "Woodhouse"
      }
    },
    {
      title: "The Code of the Wooster",
      author: {
        firstName: "P.D",
        lastName: "Woodhouse"
      }
    },
    {
      title: "Thank You Jeeves",
      author: {
        firstName: "P.D",
        lastName: "Woodhouse"
      }
    },
    {
      title: "The DaVinci Code",
      author: {
        firstName: "Dan",
        lastName: "Brown"
      }
    },
    {
      title: "Angels & Demons",
      author: {
        firstName: "Dan",
        lastName: "Brown"
      }
    },
    {
      title: "The Silmarillion",
      author: {
        firstName: "J.R.R",
        lastName: "Tolkien"
      }
    },
    {
      title: "Syrup",
      author: {
        firstName: "Max",
        lastName: "Barry"
      }
    },
    {
      title: "The Lost Symbol",
      author: {
        firstName: "Dan",
        lastName: "Brown"
      }
    },
    {
      title: "The Book of Lies",
      author: {
        firstName: "Brad",
        lastName: "Meltzer"
      }
    },
    {
      title: "Lamb",
      author: {
        firstName: "Christopher",
        lastName: "Moore"
      }
    }
  ];
  const options = {
    // isCaseSensitive: false,
    // includeScore: false,
    // shouldSort: true,
    // includeMatches: false,
    // findAllMatches: true,
    // minMatchCharLength: 1,
    // location: 0,
    // threshold: 0.6,
    // distance: 100,
    // useExtendedSearch: false,
    // ignoreLocation: false,
    // ignoreFieldNorm: false,
    keys: ["title", "author.firstName"]
  };
  const fuse = new Fuse(data, options);
  const pattern = "lamb";
  console.log(fuse.search(pattern));

  // create a reg expression using the phrase (case insensitive & matches all occurrences)
  let re = new RegExp(phrase, "ig");
  // iterate through key and value pairs within the taggedOps object:
  for (let [key, value] of taggedOps) {
    let tagWeight = 0; // used to track weight of the tag (big category)
    let keyMatches = key.toString().match(re); // find number of matches in the tag

    // if the tag matches the search phrase give it a higher weight:
    if (keyMatches) {
      tagWeight += 1000;
    }

    let filteredOps = value.get("operations"); // get the operations from the filteredOps

    if (filteredOps.size !== 0) {
      for (let i = 0; i < filteredOps.size; i++) {
        let op = filteredOps.get(i); // get the current operation from filteredOps
        // set the base value of variable that will hold the ranking score of a operation
        let opWeight = 0;

        let pathMatches = op.get("path").match(re); // list of matches in path key (eight )
        // list of matches in ["operation", "description"] key
        let descMatches = op.getIn(["operation", "description"]).match(re);

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
          // add the opWeight key to the operation info
          filteredOps = filteredOps.set(i, op.set("opWeight", opWeight));
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
      taggedOps = taggedOps.delete(key.toString()); // delete tags with no matches
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
  });
  return taggedOps; // return the sorted tags and their operations
}
