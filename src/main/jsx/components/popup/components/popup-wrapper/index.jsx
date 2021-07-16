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
    const {popupCode, showPopup} = this.props;
    if (showPopup[popupCode]) {
      const child = this.populatePropertiesToChild();
      return (
        <PopupWindow closeAction={() => this.props.togglePopup(popupCode)} children={child}/>
      )
    }
  }

  render() {
    const {popupCode} = this.props;
    return (
      <div className={styles.wrapper} onClick={() => !this.props.showPopup[popupCode] && this.props.togglePopup(popupCode)}>
        {this.props.caption}
        {
          this.renderPopup()
        }
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    showPopup: state.showPopup
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    togglePopup: (popupCode) => togglePopup(dispatch, popupCode)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PopupWrapper)