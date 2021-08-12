import React, {Component} from "react";
import {connect} from "react-redux";
import styles from './styles.less';
import cn from "classnames";
import PopupWrapper from "../../../popup/components/popup-wrapper";
import EditAttributesForm from "../../../forms/components/edit-attributes";
import AttributesSettingsButton from "../../../buttons/attributes-settings-button";
import ToggleGrantButton from "../../../buttons/toggle-grant-button";
import {saveAttributes, toggleGrant} from "../../../../actions";
import _ from "lodash"

class Grant extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  getGrant(props) {
    const {grants, operationCode, rankCode} = props;
    return grants[operationCode] && grants[operationCode][rankCode];
  }

  getIsActive(grant) {
    return grant ? grant.enabled : false;
  }

  shouldComponentUpdate(nextProps) {
    return !_.isEqual(this.getGrant(nextProps), this.getGrant(this.props))
  }

  render() {
    const {operationCode, rankCode} = this.props;
    const grant = this.getGrant(this.props)
    const isActive = this.getIsActive(grant)
    return (
      <td className={
        cn(styles.cell, {[styles.cell_active]: isActive === true})
      }>
        <div className={styles.flex_box}>
          <div className={styles.cell_element}>
            <ToggleGrantButton onClick={() => this.props.toggleGrant(operationCode, rankCode)}/>
          </div>
          <div className={styles.half}>
            <AttributesSettingsButton>
              <PopupWrapper>
                <EditAttributesForm
                  submitAction={(operationCode, rankCode, attributes) => this.props.saveAttributes(operationCode, rankCode, attributes)}
                  operationCode={operationCode}
                  rankCode={rankCode}
                  attributes={grant && grant.attributes}
                />
              </PopupWrapper>
            </AttributesSettingsButton>
          </div>
        </div>
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