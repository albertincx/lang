import React, { Component } from 'react';
import DefaultHeader from './DefaultHeader';
import Storage from '../../utils/storage';
import Lang from '../../views/Lang/Loadable';

const sbWidth = Storage.get('sbWidth', '');

class DefaultLayout extends Component {
  constructor(props) {
    super(props);
    this.state = { sbWidth };
  }

  render() {
    let { sbWidth: width } = this.state;
    if (window.screen.width < 500) width = '';
    return (
      <div className="app header-fixed">
        <DefaultHeader />
        <div className="app-body">
          <main
            className="main"
            id="main"
            style={width ? { marginLeft: width } : {}}
          >
            <div className="container-fluid">
              <Lang />
            </div>
          </main>
        </div>
      </div>
    );
  }
}

export default DefaultLayout;
