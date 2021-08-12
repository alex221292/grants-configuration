import React, {Component} from "react";
import styles from "./styles.less";
import settingsIcon from "./images/settings.png"

export default class AttributesSettingsButton extends Component {

  constructor(props) {
    super(props);
  }

  renderIcon() {
      return (
        <img src={settingsIcon} alt={'attributes'}/>
      )
  }

  render() {
    const {style} = this.props
    return (
      <button className={styles.attributes_button}
              onClick={this.props.onClick}
              style={
                style
              }>
        {this.props.children}
        {this.renderIcon()}
      </button>
    )
  }

}