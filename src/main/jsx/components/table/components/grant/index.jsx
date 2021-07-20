import React, {Component} from "react";
import {connect} from "react-redux";
import styles from './styles.less';
import cn from "classnames";
import {TYPE_CODES} from "../../../../const";
import PopupWrapper from "../../../popup/components/popup-wrapper";
import EditAttributesForm from "../../../forms/components/edit-attributes";
import {saveAttributes, toggleGrant} from "../../../../actions";

class Grant extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const {grants, operationCode, rankCode} = this.props;
    const operationGrants = grants[operationCode];
    const isActive = operationGrants ? grants[operationCode][rankCode].enabled : false;
    return (
      <td className={
        cn(styles.cell, {[styles.cell_active]: isActive === true})
      } onClick={() => this.props.toggleGrant(operationCode, rankCode)}>
        TOGGLE
        <PopupWrapper
          caption={'▲'}
          popupCode={operationCode + rankCode}
        >
          <EditAttributesForm
            submitAction={(operationCode, rankCode, attributes) => this.props.saveAttributes(operationCode, rankCode, attributes)}
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