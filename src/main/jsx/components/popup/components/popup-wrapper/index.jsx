import React, {Component} from "react";
import {connect} from "react-redux";
import PopupWindow from "../popup-window";
import styles from './styles.less';
import {togglePopup} from "../../../../actions";

class PopupWrapper extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  populatePropertiesToChild() {
    const {popupCode} = this.props;
    return React.Children.map(this.props.children, child => {
      if (React.isValidElement(child)) {
        return React.cloneElement(
          child,
          {
            closeAction: () => this.props.togglePopup(popupCode)
          }
          );
      }
      return child;
    });
  }

  renderPopup() {
    const {popupCode, isActive} = this.props;
    if (isActive) {
      const child = this.populatePropertiesToChild();
      return (
        <PopupWindow closeAction={() => this.props.togglePopup(popupCode)} children={child}/>
      )
    }
  }

  renderCaption() {
    const {imgSrc, caption} = this.props;
    if (imgSrc) {
      return (
        <img src={imgSrc} alt={"attributes"}/>
      )
    } else {
      return caption;
    }
  }

  render() {
    console.log("TEST");
    const {isActive, popupCode} = this.props;
    return (
      <div className={styles.wrapper} onClick={() => !isActive && this.props.togglePopup(popupCode)}>
        {
          this.renderCaption()
        }
        {
          this.renderPopup()
        }
      </div>
    )
  }

}

const mapStateToProps = (state, ownProps) => {
  return {
    isActive: state.showPopup[ownProps.popupCode]
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    togglePopup: (popupCode) => togglePopup(dispatch, popupCode)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PopupWrapper)