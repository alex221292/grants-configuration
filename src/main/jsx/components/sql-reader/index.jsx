import React, {Component} from "react";
import {connect} from "react-redux";
import {getGeneratedSqlScripts} from "../../api";
import Loader from "react-loader-spinner";
import Button from '@material-ui/core/Button';
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

  renderScript(query) {
    return (
      <div>
        {query}
      </div>
    )
  }

  renderSqlScripts() {
    if (this.state.scriptsIsLoading === false && !this.state.error) {
      if (this.state.scripts && this.state.scripts.length > 0) {
        return (
          <div className={styles.text}>
            {
              this.state.scripts.map(script => {
                return this.renderScript(script)
              })
            }
          </div>
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

  render() {
    return (
      <div>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => {
            getGeneratedSqlScripts(
              this.props.grants,
              this.props.rankCodes,
              this.props.operations
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
          }}
        >
          Generate SQL
        </Button>
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