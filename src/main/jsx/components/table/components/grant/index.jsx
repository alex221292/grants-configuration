import React, {Component} from "react";
import {connect} from "react-redux";
import styles from './styles.less';
import cn from "classnames";
import {TYPE_CODES} from "../../../../const";

class Grant extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const {grants, operationCode, rankCode} = this.props;
    const isActive = grants[operationCode][rankCode];
    return (
      <td className={
        cn(styles.cell, {[styles.cell_active]: isActive === true})
      } onClick={() => this.props.toggleGrant(operationCode, rankCode)}>
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
    toggleGrant: (operationCode, rankCode) => dispatch({type: TYPE_CODES.TOGGLE_GRANT, operationCode: operationCode, rankCode: rankCode})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Grant);