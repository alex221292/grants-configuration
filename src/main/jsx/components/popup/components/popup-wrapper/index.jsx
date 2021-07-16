import React, {Component} from "react";
import {connect} from "react-redux";
import PopupWindow from "../popup-window";
import styles from './styles.less';
import {TYPE_CODES} from "../../../../const";

class PopupWrapper extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div className={styles.wrapper} onClick={() => !this.props.showPopup && this.props.togglePopup()}>
        {this.props.caption}
        {
          this.props.showPopup
            ? <PopupWindow closeAction={() => this.props.togglePopup()} children={this.props.children}/>
            : null
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
    togglePopup: () => dispatch({type: TYPE_CODES.TOGGLE_POPUP})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PopupWrapper)