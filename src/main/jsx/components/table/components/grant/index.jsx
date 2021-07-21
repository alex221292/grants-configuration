import React, {Component} from "react";
import {connect} from "react-redux";
import styles from './styles.less';
import cn from "classnames";
import PopupWrapper from "../../../popup/components/popup-wrapper";
import EditAttributesForm from "../../../forms/components/edit-attributes";
import {saveAttributes, toggleGrant} from "../../../../actions";
import settingsIcon from "./images/settings.png"

class Grant extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  getIsActive(props) {
    const {grants, operationCode, rankCode} = props;
    const grant = grants[operationCode] && grants[operationCode][rankCode];
    return grant ? grant.enabled : false;
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.getIsActive(nextProps) !== this.getIsActive(this.props)
  }

  render() {
    const {operationCode, rankCode} = this.props;
    const isActive = this.getIsActive(this.props)
    return (
      <td className={
        cn(styles.cell, {[styles.cell_active]: isActive === true})
      }>
        <span onClick={() => this.props.toggleGrant(operationCode, rankCode)}>TOGGLE</span>
        <PopupWrapper
          imgSrc={settingsIcon}
          popupCode={operationCode + rankCode}
        >
          <EditAttributesForm
            submitAction={(operationCode, rankCode, attributes) => this.props.saveAttributes(operationCode, rankCode, attributes)}
            operationCode={operationCode}
            rankCode={rankCode}
          />
        </PopupWrapper>
      </td>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    grants: state.grants
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleGrant: (operationCode, rankCode) => toggleGrant(dispatch, operationCode, rankCode),
    saveAttributes: (operationCode, rankCode, attributes) => saveAttributes(dispatch, operationCode, rankCode, attributes)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Grant);