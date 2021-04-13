export default function(models, phrase) {

    let re = new RegExp(phrase, "ig");
    for (let [name,map] of models){
        
        if(!name.toString().match(re)){

            let properties = map.get("properties")
            // Check that the propert is not undefined
            if(properties){
                let matches = []
                // Iterate through all the properties for the model
                for (let [k, v] of properties){
                    if (k.toString().match(re)){
                        matches.push(k)
                    }
                }
                // If no match is found in the properties than delete the model
                if(matches.length === 0){
                    models = models.delete(name.toString());                   
                }            
            } else{
                // Delete the model with undefined property
                models = models.delete(name.toString());
            }
        }

    }
    return models
}