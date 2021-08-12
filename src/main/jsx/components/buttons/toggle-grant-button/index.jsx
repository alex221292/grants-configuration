import React, {Component} from "react";
import styles from "./styles.less";
import confirmationIcon from "./images/confirm.png"

export default class ToggleGrantButton extends Component {

  constructor(props) {
    super(props);
  }

  renderIcon() {
      return (
        <img src={confirmationIcon} alt={'toggle'}/>
      )
  }

  render() {
    const {style} = this.props
    return (
      <button className={styles.toggle_button}
              onClick={this.props.onClick}
              style={
                style
              }>
        {this.renderIcon()}
      </button>
    )
  }

}