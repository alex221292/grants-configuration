import React, {Component} from "react";
import styles from './styles.less';

export default class PopupWindow extends Component {

  constructor(props) {
    super(props);
    this.state = {inputValue: ''}
  }

  render() {
    return (
      <div className={styles.modal}>
        <div className={styles.modal_content}>
          <span className={styles.close} onClick={() => this.props.closeAction()}>
            &times;
          </span>
          <form>
            <h3>Register!</h3>
            <label>
              Name:
              <input type="text" name="name" onChange={(e) => this.setState({inputValue: e.target.value})}/>
            </label>
            <br/>
            <button type="button" onClick={() => {
              this.props.submitAction(this.state.inputValue);
              this.props.closeAction();
            }
            }>
              Сохранить!
            </button>
          </form>
        </div>
      </div>
    );
  }

}
