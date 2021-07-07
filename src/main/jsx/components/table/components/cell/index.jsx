import React, {Component} from "react";
import styles from './styles.less';
import cn from "classnames";

export default class Cell extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const {isActive} = this.props;
    return (
      <td className={
        cn(styles.cell, {[styles.cell_active]: isActive === true})
      }>
      </td>
    )
  }

}