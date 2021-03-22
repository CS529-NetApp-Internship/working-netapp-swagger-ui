export default function(taggedOps, phrase) { 
  // return taggedOps.filter((tagObj, tag) => tag.indexOf(phrase) !== -1)
  for(let [key, value] of taggedOps) {
    // getIn works similar to taggedOps.tag.operation.
    // Filter operations by path names
    const filteredOps = taggedOps.getIn([key.toString(),"operations"]).filter(o => o.get('path').indexOf(phrase) !== -1)
    // Set filtered operations to respective tag
    taggedOps = taggedOps.setIn([key.toString(),"operations"], filteredOps);
  }  
    return taggedOps
}
