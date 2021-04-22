import React, {Component} from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {updateDataBySql} from "../../api";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import {TYPE_CODES} from "../../const";
import {connect} from "react-redux";

class SqlWriter extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div>
        <TextField
          id="standard-multiline-flexible"
          label="SQL"
          style={{ margin: 8 }}
          fullWidth
          margin="normal"
          multiline
          onChange={(event) => {
            this.setState(
              {
                ...this.state,
                query: event.target.value
              }
            )
          }}
        />
        <Button
          variant="outlined"
          color="primary"
          startIcon={<CloudUploadIcon />}
          onClick={() => {
            updateDataBySql(this.state.query)
              .then(res => {
                alert(res.status);
                if (res.status === 'SUCCESS') {
                  this.props.loadGrants(res);
                }
              })
          }}
        >
          Execute
        </Button>
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
    loadGrants: (res) => dispatch({type: TYPE_CODES.LOAD_GRANTS, data: res.data})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SqlWriter);