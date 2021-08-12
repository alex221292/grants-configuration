import React, {Component} from "react";
import styles from './styles.less';

export default class Rank extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const {rankCode} = this.props
    return (
      <th className={styles.header}>
        {rankCode}
        <span>
          <button onClick={() => this.props.deleteRank(rankCode)}>X</button>
        </span>
      </th>
    )
  }

}