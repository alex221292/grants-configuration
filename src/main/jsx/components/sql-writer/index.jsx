import React, {Component} from "react";
import MainButton from "../buttons/main-button";
import SQLBox from "../sql-box";
import {updateDataBySql} from "../../api";
import {TYPE_CODES} from "../../const";
import {connect} from "react-redux";
import Loader from "react-loader-spinner";
import styles from "./styles.less"

class SqlWriter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      query: '',
      dataIsLoading: false
    }
  }

  renderLoader() {
    if (this.state.dataIsLoading) {
      return (
        <Loader
          type="TailSpin"
          color="#00BFFF"
          height={50}
          width={50}
        />
      )
    }
  }

  executeButtonAction() {
    updateDataBySql(this.state.query)
      .then(res => {
        if (res.status === 'SUCCESS') {
          this.setState(
            {
              query: '',
              dataIsLoading: false
            }
          )
          this.props.loadGrants(res);
        } else {
          alert(res.status);
          this.setState({
            ...this.state,
            dataIsLoading: false
          })
        }
      })
    this.setState({
      ...this.state,
      dataIsLoading: true
    })
  }

  render() {
    return (
      <div className={styles.sql_writer}>
        <SQLBox
          readOnly={false}
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
          onClick={() => {this.executeButtonAction()}}
          caption={'EXECUTE'}
        />
        {this.renderLoader()}
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