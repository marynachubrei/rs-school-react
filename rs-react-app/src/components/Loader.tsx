import { Component } from 'react';
import '../scss/Loader.scss';

export default class Loader extends Component {
  render() {
    return (
      <div className="loader-wrapper">
        <div className="spinner" />
      </div>
    );
  }
}
