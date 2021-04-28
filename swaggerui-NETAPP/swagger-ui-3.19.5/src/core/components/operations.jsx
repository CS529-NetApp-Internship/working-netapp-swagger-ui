import React from "react"
import PropTypes from "prop-types"
import Im from "immutable"

const SWAGGER2_OPERATION_METHODS = [
  "get", "put", "post", "delete", "options", "head", "patch"
]

const OAS3_OPERATION_METHODS = SWAGGER2_OPERATION_METHODS.concat(["trace"])


export default class Operations extends React.Component {

  static propTypes = {
    specSelectors: PropTypes.object.isRequired,
    specActions: PropTypes.object.isRequired,
    oas3Actions: PropTypes.object.isRequired,
    getComponent: PropTypes.func.isRequired,
    layoutSelectors: PropTypes.object.isRequired,
    layoutActions: PropTypes.object.isRequired,
    authActions: PropTypes.object.isRequired,
    authSelectors: PropTypes.object.isRequired,
    getConfigs: PropTypes.func.isRequired,
    fn: PropTypes.func.isRequired
  };

  render() {
    let {
      specSelectors,
      getComponent,
      layoutSelectors,
      layoutActions,
      getConfigs,
      fn
    } = this.props

    let taggedOps = specSelectors.taggedOperations()

    const OperationContainer = getComponent("OperationContainer", true)
    const OperationTag = getComponent("OperationTag")
    const LongDescription = getComponent("LongDescription")

    let {
      maxDisplayedTags,
    } = getConfigs()

    let filter = layoutSelectors.currentFilter()
    console.log("FINALFILTER:", filter)
    let options = layoutSelectors.currentOptions()
    console.log("FINALOPTIONS:", options)
    let opsOptions = layoutSelectors.currentOpsOptions()
    console.log("FINALOPSOPSOPTIONS:", opsOptions)


    if (options) {
      console.log("THEYRE HERE", options)
      if (options['opsBox'] === true) {
        console.log("ITS TRUE AND TRIED the opsBOX")
        if (filter) {
          if (filter !== true) {
            taggedOps = fn.opsFilter(taggedOps, filter)

          }
        }
      }
    }

    if (maxDisplayedTags && !isNaN(maxDisplayedTags) && maxDisplayedTags >= 0) {
      taggedOps = taggedOps.slice(0, maxDisplayedTags)
    }

    return (
        <div>
          {
            taggedOps.map( (tagObj, tag) => {
              const operations = tagObj.get("operations")
              let tagLongDescription = tagObj.getIn(["tagDetails", "x-ntap-long-description"], null)
              return (
                <OperationTag
                  key={"operation-" + tag}
                  tagObj={tagObj}
                  tag={tag}
                  layoutSelectors={layoutSelectors}
                  layoutActions={layoutActions}
                  getConfigs={getConfigs}
                  getComponent={getComponent}>
                  {
                    operations.map( op => {
                      const path = op.get("path")
                      let method = op.get("method")
                      const specPath = Im.List(["paths", path, method])

                      let introduced = undefined
                      if (method != 'x-ntap-long-description') {
			    introduced = op.getIn(["operation", "x-ntap-introduced"])
                      }

                      // FIXME: (someday) this logic should probably be in a selector,
                      // but doing so would require further opening up
                      // selectors to the plugin system, to allow for dynamic
                      // overriding of low-level selectors that other selectors
                      // rely on. --KS, 12/17
                      const validMethods = specSelectors.isOAS3() ?
                            OAS3_OPERATION_METHODS : SWAGGER2_OPERATION_METHODS

                      if(validMethods.indexOf(method) === -1) {
                        if (method === 'x-ntap-long-description') {
                            var cleanPath = path.replace(/\//g, '_');
                            if (cleanPath[0] === '_') { cleanPath = cleanPath.substr(1); }
                            return <LongDescription
                              key={ [ "docs", tag, cleanPath ] }
                              description={ op.getIn(["operation","description"]) }
                              title={ path }
                              isShownKey={ [ "docs", tag, cleanPath ] }
                              layoutActions={ layoutActions }
                              layoutSelectors={ layoutSelectors }
                              getComponent={ getComponent }
                              getConfigs={ getConfigs }
                            />
                          }
                        return null
                      }

                      return <OperationContainer
                                 key={`${path}-${method}`}
                                 specPath={specPath}
                                 op={op}
                                 path={path}
                                 method={method}
                                 tag={tag}
                                 introduced={introduced}
                                 />
                    }).toArray()
                  }


                </OperationTag>
              )
            }).toArray()
          }

          { taggedOps.size < 1 ? <h3> No operations defined in spec! </h3> : null }
        </div>
    )
  }

}

Operations.propTypes = {
  layoutActions: PropTypes.object.isRequired,
  specSelectors: PropTypes.object.isRequired,
  specActions: PropTypes.object.isRequired,
  layoutSelectors: PropTypes.object.isRequired,
  getComponent: PropTypes.func.isRequired,
  fn: PropTypes.object.isRequired
}
