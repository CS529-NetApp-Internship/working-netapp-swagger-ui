function recursivesearch(map,re){
    function search(map,re){
        if(map.has("properties")){
            let properties = map.get("properties")

            for (let [k, v] of properties){
                if (k.toString().match(re)){
                    propertyWeight += 5
                }
                else{
                    search(v,re)
                }
            }         
        }
    }
    var propertyWeight = 0
    search(map,re)
    return propertyWeight
}

export default function(models, phrase) {

    let re = new RegExp(phrase, "ig")
    for (let [name,map] of models){
        let modelWeight = 0
        if(name.toString().match(re)) {
            modelWeight = 100
        }

        let propertyWeight = recursivesearch(map,phrase)
        modelWeight += propertyWeight

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

function recursivesearch(map,re){
    function search(map,re){
        if(map.has("properties")){
            let properties = map.get("properties")

            for (let [k, v] of properties){
                if (k.toString().match(re)){
                    modelWeight += 5
                }
                else{
                    search(v,re)
                }
            }         
        }
    }
    var modelWeight = 0
    search(map,re)
    return modelWeight
}