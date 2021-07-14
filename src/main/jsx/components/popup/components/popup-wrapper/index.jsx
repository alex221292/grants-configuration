import React, {Component} from "react";
import {connect} from "react-redux";
import PopupWindow from "../popup-window";
import {TYPE_CODES} from "../../../../const";

class PopupWrapper extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div>
        {
          this.props.showPopup
            ? <PopupWindow toggle={() => this.props.togglePopup} closeAction={this.props.closeAction} submitAction={this.props.submitAction}/>
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