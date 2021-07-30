import React, {Component} from "react";
import {connect} from "react-redux";
import SqlWriter from "../sql-writer";
import SqlReader from "../sql-reader";
import Table from "../table";
import Header from "../header";
import styles from "./styles.less";

class Main extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.main}>
        <Header/>
        <SqlWriter/>
        <Table/>
        <SqlReader/>
      </div>
    );
  }
}

export default connect()(Main);