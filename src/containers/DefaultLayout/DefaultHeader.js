import React, { Component } from 'react';

let version = '';
try {
  const list = document.scripts;
  for (let i = 0; i < list.length; i += 1) {
    const sc = document.scripts.item(i);
    let s = sc.src.match(/-time([0-9]+)/);
    if (s) {
      const [, second] = s;
      s = second;
      const date = new Date();
      date.setTime(s);
      version = `updated: ${date.toLocaleString()}`;
      break;
    }
  }
} catch (e) {
  //
}

class DefaultHeader extends Component {
  state = { showPopup: false };

  togglePopup = (e, show = true) => {
    e.preventDefault();
    this.setState({ showPopup: show });
  };

  render() {
    const { showPopup } = this.state;
    return (
      <>
        <div className="navbar">
          <a href="" onClick={this.togglePopup}>
            About
          </a>
        </div>
        {showPopup ? (
          <div id="open-modal" className="modal-window">
            <div>
              <a
                href=""
                title="Close"
                className="modal-close"
                onClick={e => this.togglePopup(e, false)}
              >
                Close
              </a>
              <h1>Salut!</h1>
              <div>
                <div>This is a language learning app using subtitles</div>
                <div>
                  <small>Watch video! </small>
                </div>
                <div>
                  <a href="https://www.youtube.com/watch?v=WcuAcBbDnfc">
                    <i className="icon watch-v" />
                  </a>
                </div>
                <div>
                  <small>Discuss:</small>
                </div>
                <div>
                  tg discuss group:
                  <a href="tg://resolve?domain=langbysubs">&nbsp;@langbysubs</a>
                </div>
                <div>
                  <small>Support</small>
                </div>
                <div>
                  <a href="https://safiullin.com" target="_blank">
                    About Me
                  </a>
                </div>
                <div>
                  <small>{version}</small>
                </div>
                <a
                  href=""
                  title="Close"
                  className="modal-close bottom"
                  onClick={e => this.togglePopup(e, false)}
                >
                  Close
                </a>
              </div>
            </div>
          </div>
        ) : null}
        <div className="ml-auto user-bar">
          <div className="d-md-down-none">
            <a href="#">
              <i className="icon-location-pin" />
            </a>
          </div>
          <div>
            <div style={{ marginRight: 10 }} />
          </div>
        </div>
      </>
    );
  }
}

export default DefaultHeader;
