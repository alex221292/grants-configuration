import React, {Component} from "react";
import {connect} from "react-redux";
import styles from './styles.less';
import {TYPE_CODES} from "../../const";

class Popup extends Component {

  constructor(props) {
    super(props);
    this.state = {inputValue: ''}
  }

  render() {
    return (
      <div className={styles.modal}>
        <div className={styles.modal_content}>
          <span className={styles.close} onClick={() => this.props.togglePopup()}>
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
              this.props.addRank(this.state.inputValue);
              this.props.togglePopup();
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

const mapStateToProps = (state) => {
  return {}
};

const mapDispatchToProps = (dispatch) => {
  return {
    addRank: (rankCode) => dispatch({type: TYPE_CODES.ADD_RANK, rankCode: rankCode}),
    togglePopup: () => dispatch({type: TYPE_CODES.TOGGLE_POPUP})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Popup)