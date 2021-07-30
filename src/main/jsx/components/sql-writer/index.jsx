import React, {Component} from "react";
import Button from '@material-ui/core/Button';
import MainButton from "../buttons/main-button";
import SQLBox from "../sql-box";
import {updateDataBySql} from "../../api";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import {TYPE_CODES} from "../../const";
import {connect} from "react-redux";

class SqlWriter extends Component {

  constructor(props) {
    super(props);
    this.state = {query: ''}
  }

  render() {
    return (
      <div>
        <SQLBox
          onChange={(event) => {
            this.setState(
              {
                ...this.state,
                query: event.target.value
              }
            )
          }}
          value={this.state.query}
        />
        <MainButton
          onClick={() => {
            updateDataBySql(this.state.query, this.props.sessionKey)
              .then(res => {
                if (res.status === 'SUCCESS') {
                  this.setState(
                    {query: ''}
                  )
                  this.props.loadGrants(res);
                } else {
                  alert(res.status);
                }
              })
          }}
          caption={'EXECUTE'}
        />
      </div>
    )
  }

}

const mapStateToProps = () => {
  return {
  }
};
const mapDispatchToProps = (dispatch) => {
  return {
    loadGrants: (res) => dispatch({type: TYPE_CODES.LOAD_GRANTS, data: res.data})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SqlWriter);