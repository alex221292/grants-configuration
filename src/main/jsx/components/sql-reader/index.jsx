import React, {Component} from "react";
import {connect} from "react-redux";
import {getGeneratedSqlScripts} from "../../api";
import Loader from "react-loader-spinner";
import MainButton from "../buttons/main-button";
import SQLBox from "../sql-box";
import styles from './styles.less';
import errorImage from "./images/cancel.png";

class SqlReader extends Component {

  constructor(props) {
    super(props);
    this.state = {
      scriptsIsLoading: false,
      error: false,
      scripts: ""
    }
  }

  renderSqlScripts() {
    if (this.state.scriptsIsLoading === false && !this.state.error) {
      if (this.state.scripts) {
        return (
          <SQLBox
            readOnly={true}
            onChange={(event) => {
              this.setState(
                {
                  ...this.state,
                  scripts: event.target.value
                }
              )
            }}
            value={this.state.scripts}
          />
        )
      }
    } else if (this.state.scriptsIsLoading === true) {
      return (
        <Loader
          type="TailSpin"
          color="#00BFFF"
          height={50}
          width={50}
        />
      )
    } else if (this.state.error) {
      return (
        <img src={errorImage} alt={"error"}/>
      )
    }
  }

  generateSqlScriptsButtonAction() {
    const {grants, rankCodes, operations} = this.props
    getGeneratedSqlScripts(
      grants,
      rankCodes,
      operations
    )
      .then(res => {
        if (res && res.status === 'SUCCESS') {
          this.setState(
            {
              ...this.state,
              scriptsIsLoading: false,
              error: false,
              scripts: res.scripts
            }
          )
        } else {
          this.setState(
            {
              ...this.state,
              scriptsIsLoading: false,
              error: true
            }
          )
        }
      })
    this.setState(
      {
        ...this.state,
        scriptsIsLoading: true
      }
    )
  }

  renderButton() {
    const {grants, rankCodes, operations} = this.props
    if (grants || rankCodes || operations) {
      return (
        <MainButton
          style={
            {marginTop: 30 + 'px'}
          }
          onClick={() => {this.generateSqlScriptsButtonAction()}}
          caption={'GENERATE SQL'}
        />
      )
    }
  }

  render() {
    return (
      <div className={styles.sql_reader}>
        {this.renderButton()}
        {this.renderSqlScripts()}
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    grants: state.grants,
    rankCodes: state.rankCodes,
    operations: state.operations
  }
};

export default connect(mapStateToProps)(SqlReader);