import React from "react"
import PropTypes from "prop-types"

export default class FilterContainer extends React.Component {
  constructor() {
     super()
     // initialize your options array on your state
     this.state = {radioValue: "operations",
       options: {endpoints: false, endpointsOptions: {paths: false, description: false, method: false, methodOptions: {get: false, post: false, delete: false, patch: false, 'x-ntap-long-description': false}}, models: false},
     }
   }

  static propTypes = {
    specSelectors: PropTypes.object.isRequired,
    layoutSelectors: PropTypes.object.isRequired,
    layoutActions: PropTypes.object.isRequired,
    getComponent: PropTypes.func.isRequired,
  }

  onRadioChange = (event) => {
    var value = event.target.value;
    this.setState({radioValue: value});
  }


  getCheckboxValue = (e) => {
    const options = this.state.options

    options[e.target.name] = e.target.checked
    console.log("OPS", options)
    this.setState({options: options})
    // console.log("OPTIONS SELECTED", options)
    this.props.layoutActions.updateOptions(options)

  }

  getEndpointsValue = (e) => {
    const endpointsOptions = this.state.options.endpointsOptions;
    console.log("ENDPOINTS OPTIONS", endpointsOptions);
    endpointsOptions[e.target.name] = e.target.checked;
    this.setState(prevState => ({...prevState, options: {...prevState.options, endpointsOptions: endpointsOptions}}))
    console.log("NEW OPTIONS", this.state.options);
    //this.setState({options: {endpointsOptions: {endpointsOptions}});
  }

  getMethodsValue = (e) => {
    const methodOptions = this.state.options.endpointsOptions.methodOptions;
    methodOptions[e.target.name] = e.target.checked;
    this.setState(prevState => ({...prevState, options: {...prevState.options, endpointsOptions: {...prevState.options.endpointsOptions, methodOptions: methodOptions}}}))
    console.log("NEW OPTIONS", this.state.options);
    //this.setState({options: {endpointsOptions: {endpointsOptions}});
  }

  onFilterChange = (e) => {
    this.setState({target: {value}})
  }

  onKeyPress = (e) => {
    if (e.key === 'Enter')
    {

      const {target: {value}} = e
      this.props.layoutActions.updateFilter(value)
    }
  }

  render () {
    const {specSelectors, layoutSelectors, getComponent} = this.props
    const Col = getComponent("Col")

    const isLoading = specSelectors.loadingStatus() === "loading"
    const isFailed = specSelectors.loadingStatus() === "failed"
    const filter = layoutSelectors.currentFilter()
    const options = layoutSelectors.currentOptions()

    const inputStyle = {}
    if (isFailed) inputStyle.color = "red"
    if (isLoading) inputStyle.color = "#aaa"

    return (
      <div>
        {filter === null || filter === false ? null :
          <div className="filter-wrapper">
            <Col className="filter wrapper" mobile={12}>
            <div className="filter-icon">🔍</div>
              <input className="operation-filter-input" placeholder="Enter your search query here..." type="text"
                     onChange={this.onFilterChange} onKeyPress={this.onKeyPress} value={filter === true || filter === "true" ? "" : filter}
                     disabled={isLoading} style={inputStyle}/>
            </Col>

            <div>
              <input type="radio" checked={this.state.radioValue ==='operations'} onChange={this.onRadioChange.bind(this)} value="operations" name="gender" /> Operations
              <input type="radio" checked={this.state.radioValue ==='models'} onChange={this.onRadioChange.bind(this)} value="models" name="gender" /> Models

              {this.state.radioValue === 'operations' &&
              <div className="checkbox-wrapper">
                <div className="singular-checkbox">
                  <label>
                    <input type="checkbox" value={1} name="endpoints" onChange={this.getCheckboxValue.bind(this)}/>
                    Operations Keyword Search
                  </label>
                </div>
                //endpoints
                {this.state.options.endpoints === true &&
                  <div className="checkbox-wrapper">
                    <div className="singular-checkbox">
                      <label>
                        <input type="checkbox" value={1} name="paths" onChange={this.getEndpointsValue.bind(this)}/>
                        Paths
                      </label>
                    </div>

                    <div className="singular-checkbox">
                      <label>
                        <input type="checkbox" value={1} name="description" onChange={this.getEndpointsValue.bind(this)}/>
                        Description
                      </label>
                    </div>

                    <div className="singular-checkbox">
                      <label>
                        <input type="checkbox" value={1} name="method" onChange={this.getEndpointsValue.bind(this)}/>
                        Method
                      </label>
                    </div>
                    //method
                    {this.state.options.endpointsOptions.method === true &&
                      <div className="checkbox-wrapper">
                        <div className="singular-checkbox">
                          <label>
                            <input type="checkbox" value={1} name="get" onChange={this.getMethodsValue.bind(this)}/>
                            Get
                          </label>
                        </div>

                        <div className="singular-checkbox">
                          <label>
                            <input type="checkbox" value={1} name="post" onChange={this.getMethodsValue.bind(this)}/>
                            Post
                          </label>
                        </div>

                        <div className="singular-checkbox">
                          <label>
                            <input type="checkbox" value={1} name="patch" onChange={this.getMethodsValue.bind(this)}/>
                            Patch
                          </label>
                        </div>

                        <div className="singular-checkbox">
                          <label>
                            <input type="checkbox" value={1} name="delete" onChange={this.getMethodsValue.bind(this)}/>
                            Delete
                          </label>
                        </div>

                        <div className="singular-checkbox">
                          <label>
                            <input type="checkbox" value={1} name="x-ntap-long-description" onChange={this.getMethodsValue.bind(this)}/>
                            Docs
                          </label>
                        </div>


                    </div>}

                  </div>}
                  ...
                <div className="singular-checkbox">
                  <label>
                    <input type="checkbox" value={1} name="models" onChange={this.getCheckboxValue.bind(this)}/>
                    Models Search
                  </label>
                </div>

            </div>}

              {this.state.radioValue === 'models'}
            </div>

        </div>
        }
      </div>
    )
  }
}
