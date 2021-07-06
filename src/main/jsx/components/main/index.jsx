import React, {Component} from "react";
import {connect} from "react-redux";
import SqlWriter from "../sql-writer";

class Main extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>CIB Security Matrix</h1>
        <SqlWriter/>
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