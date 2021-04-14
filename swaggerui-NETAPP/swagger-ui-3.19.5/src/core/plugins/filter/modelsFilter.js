export default function(models, phrase) {

    let re = new RegExp(phrase, "ig")
    for (let [name,map] of models){
        let modelWeight = 0
        if(name.toString().match(re)) {
            modelWeight = 10
        }
        else {
            let properties = map.get("properties")
            // Check that the property is not undefined
            if(properties){
                // Iterate through all the properties for the model
                for (let [k, v] of properties){
                    if (k.toString().match(re) || (v.get("description") && v.get("description").match(re))){
                        if (k.toString().match(re)) {
                            modelWeight += 5
                        }
                        else {
                            modelWeight++
                        }
                    }
                }         
            } else{
                // Delete the model with undefined property
                models = models.delete(name.toString())
            }
        }
        if (modelWeight === 0) {
            models = models.delete(name.toString())
        }
        else {
            map = map.set("modelWeight", modelWeight)
            models = models.set(name.toString(), map)
        }

    }

    return models.sort(function(value1, value2) {
        if (value1.get("modelWeight") > value2.get("modelWeight")) {
          return -1
        }
        if (value1.get("modelWeight") < value2.get("modelWeight")) {
          return 1
        }
        if (value1.get("modelWeight") === value2.get("modelWeight")) {
          return 0
        }
      })
}