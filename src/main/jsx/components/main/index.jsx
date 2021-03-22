import React, { Component } from "react";
import ReactDOM from 'react-dom';
import styles from './styles.less';

export default class Main extends Component {
    render() {
        return (
            <div className={styles.main}>
                <h1>Demo Component</h1>
                <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"/>
            </div>
        );
    }
}