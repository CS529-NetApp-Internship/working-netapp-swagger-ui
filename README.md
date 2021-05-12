# working-netapp-swagger-ui

## Steps to locally host swagger:

- Ensure that you have node installed
- Run the following commands:
  - `npm install`
  - `npm run build`
  - `npm run dev`
- By default, SwaggerUI will be available at : http://localhost:3200/

## Using the search feature

### Keyword Search

When this mode is chosen, results are found by checking for string matches in
the scope defined by the user. Specifically, the user can choose which
categories/keys to search in. By doing so, the user can narrow down the search
results by looking in the models section, path, description, type of
method, and others. In this mode, the results found in the operations/endpoints
section are independent from those found in the models section.

### Models Search

This search mode takes some aspects from keyword search and elaborates on it.
This functionality conducts a keyword search on the models section and displays
the results there. Additionally, it looks through all the endpoints/operations
and shows which operations use the models found in the search. This allows the
user to search for a model and the endpoints that use that model.
