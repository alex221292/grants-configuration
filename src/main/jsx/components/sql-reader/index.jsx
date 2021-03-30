import React, {Component} from "react";
import {TYPE_CODES} from "../../const";
import {connect} from "react-redux";
import {getGeneratedSqlScripts} from "../../api";
import Loader from "react-loader-spinner";

class SqlReader extends Component {

  constructor(props) {
    super(props);
    this.state = {
      scriptsIsLoading: false,
      hideScripts: false
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
    if (this.state.scriptsIsLoading === false) {
      if (this.props.scripts && this.state.hideScripts === false) {
        return this.props.scripts.map(script => {
          return this.renderScript(script)
        })
      }
    } else {
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

  render() {
    return (
      <div>
        <button
          onClick={() => {
            this.setState(
              {
                ...this.state,
                hideScripts: !this.state.hideScripts
              }
            )
          }}
        >
          Toggle visibility
        </button>
        <button
          onClick={() => {
            getGeneratedSqlScripts()
              .then(res => {
                this.props.loadSqlScripts(res)
                this.setState(
                  {
                    ...this.state,
                    scriptsIsLoading: false
                  }
                )
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
        </button>
        {this.renderSqlScripts()}
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    scripts: state.scripts
  }
};
const mapDispatchToProps = (dispatch) => {
  return {
    loadSqlScripts: (res) => dispatch({type: TYPE_CODES.LOAD_SQL_SCRIPTS, scripts: res.scripts}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SqlReader);