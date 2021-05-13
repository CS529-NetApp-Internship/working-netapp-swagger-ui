# working-netapp-swagger-ui

## Steps to locally host swagger:

- Ensure that you have node installed
- Run the following commands:
  - `npm install`
  - `npm run build`
  - `npm run dev`
- By default, SwaggerUI will be available at : http://localhost:3200/

## Using the Deep Search Feature

### Keyword Search

When this mode is chosen, results are found by checking for string matches in 
the scope defined by the user. Specifically, the user can choose which 
categories/keys to search in, whether that be operations or models. Users can 
select the operations checkbox to search them and within that they can also 
narrow down their search by operation path, description, and type of method. 
Users who select the models checkbox will see that models are filtered by their 
name. While both models and operations can be searched simultaneously in this 
mode, the results found in the two sections are unrelated and independent of 
each other.

### Models Search

This search mode takes some aspects from keyword search and elaborates on it.
This functionality conducts a keyword search on the models section and displays
the results there. Additionally, it looks through all the endpoints/operations
and shows which operations use the models found in the search. This allows the
user to search for a model and the endpoints that use that model.

### Know bugs

- Once `Models Search` radio button is selected, filter returns correct endpoints. However, once you click on the endpoint to expand, it disappears from the search results.

- Once model is expanded the following warnings show up on the console

```
VM7193 9:33 Warning: Failed prop type: Model: prop type `relEndpoint` is invalid; it must be a function, usually from React.PropTypes.
```

```
Warning: Failed prop type: Invalid prop `schema` of type `Immutable.Map` supplied to `Model`, expected `OrderedMap`.
```

