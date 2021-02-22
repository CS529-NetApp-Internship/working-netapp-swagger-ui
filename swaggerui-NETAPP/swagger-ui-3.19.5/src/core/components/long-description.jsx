import React, { Component } from "react"
import PropTypes from "prop-types"
import * as CustomPropTypes from "core/proptypes"

export default class LongDescription extends Component {
  static propTypes = {
    description: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    getComponent: PropTypes.func.isRequired,
    isShownKey: CustomPropTypes.arrayOrString.isRequired,
    layoutActions: PropTypes.object.isRequired,
    layoutSelectors: PropTypes.object.isRequired,
    getConfigs: PropTypes.func.isRequired
  }

  toggleShown =() => {
    let { layoutActions, isShownKey } = this.props
    layoutActions.show(isShownKey, !this.isShown())
  }

  isShown =() => {
    let { layoutSelectors, isShownKey, getConfigs } = this.props
    let { docExpansion } = getConfigs()

    return layoutSelectors.isShown(isShownKey, docExpansion === "full" ) // Here is where we set the default
  }

  render () {
    let {
      isShownKey,
      getComponent,
      description,
      title,
      getConfigs
    } = this.props

    let shown = this.isShown()

    let {
      docExpansion,
      deepLinking
    } = getConfigs()

    const isDeepLinkingEnabled = deepLinking && deepLinking !== "false"

    const Markdown = getComponent("Markdown")
    const Collapse = getComponent( "Collapse" )
    const DeepLink = getComponent( "DeepLink" )

    return (
      <div
        className={ shown ? "opblock opblock-long-description is-open" : "opblock opblock-long-description" }
        id={ isShownKey.join("-") }
      >
        <div
          className="opblock-summary"
          onClick={ this.toggleShown }
        >
          <span className="opblock-summary-method">DOC</span>
          <span className="opblock-summary-path">
            <DeepLink
              enabled={isDeepLinkingEnabled}
              isShown={shown}
              path={`${isShownKey.join("/")}`}
              text={title} />
          </span>
        </div>
        <Collapse isOpened={ shown }>
          <div className="opblock-body">
            <div className="opblock-description-wrapper">
              <div className="opblock-description">
                <Markdown source={ description } />
              </div>
            </div>
          </div>
        </Collapse>
      </div>
    )
  }
}
