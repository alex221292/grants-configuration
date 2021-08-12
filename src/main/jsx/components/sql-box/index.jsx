import React, {Component} from "react";
import styles from "./styles.less";

export default class SQLBox extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <textarea readOnly={this.props.readOnly} rows={10000} className={styles.sql_box_text} onChange={this.props.onChange}>
        {this.props.value}
      </textarea>
    )
  }

}