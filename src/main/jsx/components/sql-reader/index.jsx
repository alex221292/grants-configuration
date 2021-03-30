import React, {Component} from "react";
import {TYPE_CODES} from "../../const";
import {connect} from "react-redux";
import {getGeneratedSqlScripts} from "../../api";
import Loader from "react-loader-spinner";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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
        <Button
          variant="outlined"
          color="primary"
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
        </Button>
        <Button
          variant="outlined"
          color="primary"
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
        </Button>
        <Typography variant="body1" gutterBottom>
          {this.renderSqlScripts()}
        </Typography>
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