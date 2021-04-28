import React from "react"
import PropTypes from "prop-types"

export default class FilterContainer extends React.Component {
  constructor() {
     super()
     // initialize your options array on your state
     this.state = {
       options: {opsBox: false, tagsBox: false, modelsBox: false}, 
       opsOptions: {opsPaths: false, opsDescs: false},
     }
   }

  static propTypes = {
    specSelectors: PropTypes.object.isRequired,
    layoutSelectors: PropTypes.object.isRequired,
    layoutActions: PropTypes.object.isRequired,
    getComponent: PropTypes.func.isRequired,
  }

  getCheckboxValue = (e) => {
    const options = this.state.options
  
    options[e.target.name] = e.target.checked

    this.setState({options: options})
    // console.log("OPTIONS SELECTED", options)
    this.props.layoutActions.updateOptions(options)

  }

  getOpsCheckboxValues = (e) => {
    const opsOptions = this.state.opsOptions

    opsOptions[e.target.name] = e.target.checked

    this.setState({opsOptions: opsOptions})
    // console.log("OPS OPTIONS SELECTED", opsOptions)
    this.props.layoutActions.updateOpsOptions(opsOptions)
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
    const opsOptions = layoutSelectors.currentOpsOptions()

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

            <div className="checkbox-wrapper">
              Filtering Options:
              <div className="singular-checkbox">
                <label>
                  <input type="checkbox" value={1} name="opsBox" onChange={this.getCheckboxValue.bind(this)}/>
                  Operations
                </label>
              </div>
              <div className="singular-checkbox">
                <label>
                  <input type="checkbox" value={2} name="tagsBox" onChange={this.getCheckboxValue.bind(this)}/>
                  Tags
                </label>
              </div>
              <div className="singular-checkbox">
                <label>
                  <input type="checkbox" value={3} name="modelsBox" onChange={this.getCheckboxValue.bind(this)}/>
                  Models
                </label>
              </div>
              <div className="sub-checkbox-wrapper">
                <div className="singular-checkbox">
                  <label>
                    <input type="checkbox" value={4} name="opsDescs" onChange={this.getOpsCheckboxValues.bind(this)}/>
                    Op Descs
                  </label>
                </div>
              </div>
              <div className="sub-checkbox-wrapper">
                <div className="singular-checkbox">
                  <label>
                    <input type="checkbox" value={5} name="opsPaths" onChange={this.getOpsCheckboxValues.bind(this)}/>
                    Op Paths
                  </label>
                </div>

                </div>
            </div>
        </div>
        }
      </div>
    )
  }
}
