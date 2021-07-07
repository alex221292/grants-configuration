import React, {Component} from "react";
import {connect} from "react-redux";
import SqlWriter from "../sql-writer";
import Table from "../table";

class Main extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>CIB Security Matrix</h1>
        <SqlWriter/>
        <Table/>
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