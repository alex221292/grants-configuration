import React, {Component} from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {updateDataBySql} from "../../api";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

export default class SqlWriter extends Component {

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
              })
          }}
        >
          Execute
        </Button>
      </div>
    )
  }

}