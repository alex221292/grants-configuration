import React, {Component} from "react";
import PopupWindow from "../popup-window";
import styles from './styles.less';

export default class PopupWrapper extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isActive: false
    }
  }

  togglePopup() {
    this.setState(
      {
        ...this.state,
        isActive: !this.state.isActive
      }
    )
  }

  populatePropertiesToChild() {
    return React.Children.map(this.props.children, child => {
      if (React.isValidElement(child)) {
        return React.cloneElement(
          child,
          {
            closeAction: () => this.togglePopup()
          }
          );
      }
      return child;
    });
  }

  renderPopup() {
    const {isActive} = this.state;
    if (isActive) {
      const child = this.populatePropertiesToChild();
      return (
        <PopupWindow closeAction={() => this.togglePopup()} children={child}/>
      )
    }
  }

  renderIcon() {
    const {imgSrc} = this.props;
    if (imgSrc) {
      return (
        <img src={imgSrc} alt={"attributes"}/>
      )
    }
  }

  render() {
    console.log("test")
    const {isActive} = this.state;
    return (
      <div className={styles.wrapper} onClick={() => !isActive && this.togglePopup()}>
        {
          this.renderIcon()
        }
        {
          this.renderPopup()
        }
      </div>
    )
  }

}
