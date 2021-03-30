import React, {Component} from "react";
import {connect} from "react-redux";
import SecurityMatrix from "../security-matrix";
import SqlReader from "../sql-reader";

class Main extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>CIB Security Matrix</h1>
        <SqlReader/>
        <SecurityMatrix/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state
  }
};

export default connect(mapStateToProps)(Main);