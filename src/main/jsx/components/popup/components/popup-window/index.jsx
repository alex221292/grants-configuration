import React, {Component} from "react";
import styles from './styles.less';

export default class PopupWindow extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.modal}>
        <div className={styles.modal_content}>
          <span className={styles.close} onClick={() => this.props.closeAction()}>
            &times;
          </span>
          {this.props.children}
        </div>
      </div>
    );
  }

}
