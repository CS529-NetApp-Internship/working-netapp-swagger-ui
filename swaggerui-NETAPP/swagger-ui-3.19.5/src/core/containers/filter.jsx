import React from "react"
import PropTypes from "prop-types"

export default class FilterContainer extends React.Component {
  constructor() {
     super()
     // initialize your options array on your state
     this.state = {
       options: []
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
    let index

    if (e.target.checked) {
      options.push(+e.target.value)
    } else {
      index = options.indexOf(+e.target.value)
      options.splice(index, 1)
    }

    this.setState({options: options})
    console.log("OPTIONS SELECTED", options)
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
                  <input type="checkbox" value={1} name="ops-checkbox" onChange={this.getCheckboxValue.bind(this)}/>
                  Operations
                </label>
              </div>
              <div className="singular-checkbox">
                <label>
                  <input type="checkbox" value={2} name="tags-checkbox" onChange={this.getCheckboxValue.bind(this)}/>
                  Tags
                </label>
              </div>
              <div className="singular-checkbox">
                <label>
                  <input type="checkbox" value={3} name="models-checkbox" onChange={this.getCheckboxValue.bind(this)}/>
                  Models
                </label>
              </div>
            </div>
        </div>
        }
      </div>
    )
  }
}
