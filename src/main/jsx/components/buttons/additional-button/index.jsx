import React, {Component} from "react";
import styles from "./styles.less";

export default class AdditionalButton extends Component {

  constructor(props) {
    super(props);
  }

  renderIcon() {
    const {img, imgCaption} = this.props
    if (img) {
      return (
        <img src={img} alt={imgCaption}/>
      )
    }
  }

  render() {
    const {caption, style} = this.props
    return (
      <button className={styles.additional_button}
              onClick={this.props.onClick}
              style={
                style
              }>
        {this.props.children}
        {this.renderIcon()}<span className={styles.additional_button_text}>{caption}</span>
      </button>
    )
  }

}