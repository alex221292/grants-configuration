import React, {Component} from "react";
import styles from "./styles.less"

export default class Header extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.header}>
        <h1 className={styles.header_title}>
          COCOS Security Matrix
        </h1>
      </div>
    )
  }

}
