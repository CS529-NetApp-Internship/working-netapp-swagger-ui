import React from "react"
import PropTypes from "prop-types"

export default class FilterContainer extends React.Component {

  static propTypes = {
    specSelectors: PropTypes.object.isRequired,
    layoutSelectors: PropTypes.object.isRequired,
    layoutActions: PropTypes.object.isRequired,
    getComponent: PropTypes.func.isRequired,
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

            
            <input type="checkbox" id="ops" name="ops" value="Operations"/>
            <label for="ops">Operations</label>
            <input type="checkbox" id="tags" name="tags" value="Tags"/>
            <label for="ops">Tags</label>
            <input type="checkbox" id="defs" name="defs" value="Models"/>
            <label for="defs">Models</label>


          </div>

        }
      </div>
    )
  }
}
