import React, {Component} from "react";
import styles from "./styles.less";

export default class MainButton extends Component {

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
      <button className={styles.main_button}
              onClick={this.props.onClick}
              style={
                style
              }>
        {this.renderIcon()}<span className={styles.main_button_text}>{caption}</span>
      </button>
    )
  }

}