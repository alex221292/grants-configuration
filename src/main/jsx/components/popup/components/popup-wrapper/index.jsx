import React, {Component} from "react";
import {connect} from "react-redux";
import PopupWindow from "../popup-window";
import styles from './styles.less';

class PopupWrapper extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div className={styles.wrapper} onClick={() => !this.props.showPopup && this.props.closeAction()}>
        {
          this.props.showPopup
            ? <PopupWindow closeAction={this.props.closeAction} submitAction={this.props.submitAction}/>
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

export default connect(mapStateToProps)(PopupWrapper)