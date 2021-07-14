import React, {Component} from "react";
import {connect} from "react-redux";
import SqlWriter from "../sql-writer";
import SqlReader from "../sql-reader";
import Table from "../table";
import {TYPE_CODES} from "../../const";

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
        <SqlReader/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    showPopup: state.showPopup
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    togglePopup: () => dispatch({type: TYPE_CODES.TOGGLE_POPUP})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);