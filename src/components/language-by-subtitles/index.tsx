import React, { Component } from 'react';
import UploadButton from './components/UploadButton';
import Storage from './components/storage';
import { fixSubs, fixTags } from './fixsubs';
import './style.css';
import demoFiles from './demo.json';

const SCROLL_VAR = 'langscroll';
const ACCEPT = 'srt';
const POPUP_DISCUSS = 'POPUP_DISCUSS';
const POPUP_SETTINGS = 'POPUP_SETTINGS';

const LANG_SUBS = 'langbysubs_settings';

const errors = {
  SAME: 'Files same, please upload different filename',
  EMPTY: 'One of uploaded file has empty content, please upload another file',
};

function test() {
  const supportMsg = document.getElementById('msg');
  if ('speechSynthesis' in window) {
    supportMsg.innerHTML =
      'Your browser <strong>supports</strong> speech synthesis.';
  } else {
    supportMsg.innerHTML =
      'Sorry your browser <strong>does not support</strong> speech synthesis.<br>Try this in <a href="https://www.google.co.uk/intl/en/chrome/browser/canary.html">Chrome Canary</a>.';
    supportMsg.classList.add('not-supported');
  }
  // Get the voice select element.
  const voiceSelect = document.getElementById('voice');

  // Fetch the list of voices and populate the voice options.
  function loadVoices() {
    // Fetch the available voices.
    const voices = speechSynthesis.getVoices();

    // Loop through each of the voices.
    voices.forEach(function(voice, i) {
      // Create a new option element.
      const option = document.createElement('option');

      // Set the options value and text.
      option.value = voice.name;
      option.innerHTML = voice.name;

      // Add the option to the voice selector.
      voiceSelect.appendChild(option);
    });
  }

  // Execute loadVoices.
  loadVoices();
  // Chrome loads voices asynchronously.
  window.speechSynthesis.onvoiceschanged = function(e) {
    loadVoices();
  };
}

function speak(text) {
  const { voice: voiceSelected, rate = 1, volume = 1, pitch = 1 } =
  Storage.getJ(LANG_SUBS) || {};
  const msg = new SpeechSynthesisUtterance();

  msg.text = text;

  // Set the attributes.
  msg.volume = parseFloat(volume);
  msg.rate = parseFloat(rate);
  msg.pitch = parseFloat(pitch);
  // If a voice has been selected, find the voice and set the
  // utterance instance's voice attribute.
  if (voiceSelected) {
    msg.voice = speechSynthesis.getVoices().filter(function(voice) {
      return voice.name === voiceSelected;
    })[0];
  }
  // Queue this utterance.
  window.speechSynthesis.speak(msg);
}

class Index extends Component {
  constructor(props) {
    super(props);
    const { subs, sepVariant } = this.getSubs();
    this.sepVariant = sepVariant;
    this.buttonPressTimer = null;
    const { items = [], filenames = [] } = this.getItems(subs);
    const { voice, rate = 1, volume = 1, pitch = 1 } =
    Storage.getJ(LANG_SUBS) || {};
    this.state = {
      showStr: '',
      ind: '',
      isShown: -1,
      error: '',
      filenames,
      items,
      showPopupFiles: false,
      modal: '',
      voice,
      rate,
      volume,
      pitch,
    };
  }

  getSubs = (def = true) => {
    let s = Storage.getJ('subs');
    if (!s && def) s = this.getDef();
    if (s.sepVariant) {
      // s.sepVariant = s.sepVariant.replace(/\\\//g, '');
      s.sepVariant = new RegExp(s.sepVariant.replace(/\//g, ''));
    }
    return s;
  };

  getDef = () => ({ subs: [], sepVariant: '' });

  getItems = subs => {
    if (!subs || subs.length === 0) return [];
    const filenames = [subs[0].filename];
    let items = [];
    if (subs[0]) {
      const sep = subs[0].fixed ? '\n\n' : this.sepVariant;
      items = [subs[0].bstr.split(sep)];
    }
    if (subs[1]) {
      filenames.push(subs[1].filename);
      const sep = subs[1].fixed ? '\n\n' : this.sepVariant;
      items.push(subs[1].bstr.split(sep));
    }
    return { items, filenames };
  };

  // eslint-disable-next-line consistent-return
  upload = files => {
    const { filenames: stateFiles } = this.state;

    const isFull = stateFiles.length === 2 || files.length === 2;
    if (stateFiles.length === 1 && files[0].filename === stateFiles[0]) {
      return this.setState({ error: 'SAME' });
    }
    let storedSubs = this.getDef();
    if (!isFull) {
      const fromStore = this.getSubs(false);
      if (fromStore) storedSubs = fromStore;
    }
    const { setVariant } = storedSubs;
    let { subs = [] } = storedSubs;
    let error = '';
    if (setVariant) this.sepVariant = setVariant;
    for (let i = 0; i < files.length; i += 1) {
      if (files[i].bstr.trim()) {
        subs.push({ bstr: files[i].bstr, filename: files[i].filename });
      } else error = 'EMPTY';
    }
    if (subs.length) {
      if (subs.length === 2) {
        const { subs: newSubs, sepVariant: newVariant } = fixSubs(subs);
        if (newVariant) this.sepVariant = newVariant;
        subs = newSubs;
        subs[0].bstr = fixTags(subs[0].bstr);
        subs[1].bstr = fixTags(subs[1].bstr);
      }
      Storage.setJ('subs', { subs, sepVariant: `${this.sepVariant}` });
    }
    const { items, filenames } = this.getItems(subs);
    this.setState({ items, showStr: '', error, filenames });
  };

  clear = () => {
    Storage.rm('subs');
    this.setState({
      filenames: [],
      items: [],
      showPopupFiles: false,
      showStr: '',
      error: '',
    });
  };

  replace = e => {
    const { sepVariant, subs: subs2 } = this.getSubs();
    let subs = subs2;
    if (subs.length <= 1) return;
    subs = [subs[1], subs[0]];
    Storage.setJ('subs', { subs, sepVariant: `${sepVariant}` });
    const { items } = this.getItems(subs);
    this.setState({ items });
  };

  show = ({ target }) => {
    const s = target.getAttribute('data-ind');
    const { items, isShown: isShown1, ind: indFrom } = this.state;
    let isShown = isShown1;
    const [, itemTwo] = items;
    if (itemTwo[s]) {
      isShown = s !== indFrom || !isShown;
      let showStr = '';
      if (isShown) showStr = itemTwo[s];
      this.setState({ showStr, ind: s, isShown });
    }
  };

  handleButtonRelease = () => {
    if (this.buttonPressTimer) clearTimeout(this.buttonPressTimer);
  };

  componentDidMount() {
    const s = Storage.get(SCROLL_VAR);
    if (s) window.scrollTo(0, s);
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    Storage.set(SCROLL_VAR, window.scrollY);
  };

  getStr = str => {
    const strS = str.split(/>\s[0-9]+:[0-9]+:[0-9]+,[0-9]+/);
    if (strS[1]) str = strS[1];
    return str;
  };

  renderRow = (str, inds) => {
    const { voice } = this.state;
    str = this.getStr(str);
    return (
      <div
        key={`${str}${inds}`}
        onTouchEnd={this.handleButtonRelease}
        onMouseDown={this.show}
        onMouseUp={this.handleButtonRelease}
        data-ind={inds}
      >
        <div data-ind={inds}>{str}
          <span className='tooltiptext'>
            <button
              onClick={
                voice ? () => speak(str) : this.voiceSetting
              }
              className='icon speech-voice'
            />
          </span>
        </div>
      </div>
    );
  };

  demo = e => {
    e.preventDefault();
    this.upload(demoFiles);
  };

  togglePopup = (e, s = true) => {
    e.preventDefault();
    this.setState({ showPopupFiles: s, modal: '' });
  };

  toggleDiscuss = e => {
    e.preventDefault();
    this.setState({ modal: POPUP_DISCUSS });
  };

  render() {
    const {
      items,
      showStr,
      error,
      filenames,
      showPopupFiles,
      modal,
      voice,
    } = this.state;
    const fldCl = `folder${items.length ? '-fill' : ''}`;
    return (
      <div className='lang-subs'>
        {showPopupFiles ? (
          <div id='filenames' className='modal-window'>
            <div>
              <a
                href=''
                title='Close'
                className='modal-close'
                onClick={e => this.togglePopup(e, false)}
              >
                Close
              </a>
              <h1>Files</h1>
              <div>
                <div>
                  {filenames.map((fn, ind) => (
                    <div key={fn}>
                      {ind + 1} File {fn}
                    </div>
                  ))}
                  <div>
                    <button className='btn' onClick={this.clear}>
                      Delete all
                    </button>
                  </div>
                </div>
                <a
                  href=''
                  title='Close'
                  className='modal-close bottom'
                  onClick={e => this.togglePopup(e, false)}
                >
                  Close
                </a>
              </div>
            </div>
          </div>
        ) : null}
        {modal === POPUP_DISCUSS ? (
          <div id='filenames' className='modal-window'>
            <div>
              <a
                href=''
                title='Close'
                className='modal-close'
                onClick={e => this.togglePopup(e, false)}
              >
                Close
              </a>
              <h1>Subs</h1>
              <div>
                Upload your subs in channel:
                <a href='tg://resolve?domain=langbysubs'>&nbsp;@langbysubs</a>
              </div>
              <div>
                <a
                  href=''
                  title='Close'
                  className='modal-close bottom'
                  onClick={e => this.togglePopup(e, false)}
                >
                  Close
                </a>
              </div>
            </div>
          </div>
        ) : null}
        {showStr ? (
          <div className='tooltip1'>
            <span className='tooltiptext'>
              {this.getStr(showStr)}
              <button
                onClick={
                  voice ? () => speak(this.getStr(showStr)) : this.voiceSetting
                }
                className='icon speech-voice'
              />
            </span>
          </div>
        ) : null}
        <div>
          {items.length === 2 ? (
            <div className='buttons'>
              <button
                className={`icon ${fldCl}-icon`}
                onClick={this.togglePopup}
              />
              <button
                className='icon earth-search'
                onClick={this.toggleDiscuss}
              />
              <button
                className='icon speech-voice-setting'
                onClick={this.voiceSetting}
              />
              <button className='icon replace-icon' onClick={this.replace} />
            </div>
          ) : null}
        </div>
        <div className='lang-items'>

          {!items.length ? (
            <div>
              <div>Please upload two .srt files with different languages</div>
              <p />
              <div className='flexible'>
                <UploadButton
                  type={ACCEPT}
                  upload={this.upload}
                  label='Add files'
                />
                <div className='btn btn-ghost-success'>or</div>
                <button className='btn' onClick={this.demo}>TRY DEMO</button>
              </div>
            </div>
          ) : null}
          {items.length === 1 ? (
            <div className='load-step'>
              {error ? (
                <>
                  <div className='alert alert-danger'>{errors[error]}
                  </div>
                  <br />
                </>
              ) : null}
              <div>
                1 File {filenames[0]}
                <span className='green'> loaded</span>
              </div>
              <div>
                2 File <span className='gray'>not loaded</span>
              </div>
              <UploadButton
                upload={this.upload}
                type={ACCEPT}
                label='Add second subtitles file'
                isSingle
              />
              <br />
              <div>
                <button className='btn' onClick={this.clear}>
                  Delete all
                </button>
              </div>
            </div>
          ) : null}
          {items.length === 2
            ? items[0].map((str, ind) => this.renderRow(str, ind))
            : null}
        </div>
        {modal === POPUP_SETTINGS ? (
          <div id='filenames' className='modal-window'>
            <div>
              <a
                href=''
                title='Close'
                className='modal-close'
                onClick={e => this.togglePopup(e, false)}
              >
                Close
              </a>
              <h1>Web Speech Synthesis Demo</h1>
              <div>
                <br />
              </div>
              <div id='page-wrapper'>
                <p id='msg' />
                <div className='option'>
                  <label htmlFor='voice'>Voice</label>
                  {' '}
                  <select
                    name='voice'
                    id='voice'
                    value={this.state.voice}
                    onChange={this.voiceSettings}
                  />
                </div>
                <div className='option'>
                  <label htmlFor='volume'>Volume</label>
                  <input
                    type='range'
                    min='0'
                    max='1'
                    step='0.1'
                    name='volume'
                    id='volume'
                    value={this.state.volume}
                    onChange={this.voiceSettings}
                  />
                </div>
                <div className='option'>
                  <label htmlFor='rate'>Rate</label>
                  <input
                    type='range'
                    min='0.1'
                    max='10'
                    step='0.1'
                    name='rate'
                    id='rate'
                    value={this.state.rate}
                    onChange={this.voiceSettings}
                  />
                </div>
                <div className='option'>
                  <label htmlFor='pitch'>Pitch</label>
                  <input
                    type='range'
                    min='0'
                    max='2'
                    step='0.1'
                    name='pitch'
                    id='pitch'
                    value={this.state.pitch}
                    onChange={this.voiceSettings}
                  />
                </div>
                {this.state.error ? (
                  <div color='red'>{this.state.error}</div>
                ) : null}
                <div>
                  <button className='btn' onClick={this.voiceSettingSave}>Save</button>
                </div>
              </div>
              <div>
                <a
                  href=''
                  title='Close'
                  className='modal-close bottom'
                  onClick={e => this.togglePopup(e, false)}
                >
                  Close
                </a>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }

  voiceSetting = e => {
    e.preventDefault();
    this.setState({ modal: POPUP_SETTINGS }, () => {
      test();
    });
  };

  voiceSettings = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  voiceSettingSave = () => {
    const { voice, rate, pitch, volume } = this.state;
    if (!voice) {
      this.setState({ error: 'Select voice please' });
      return;
    }
    Storage.setJ(LANG_SUBS, {
      voice,
      rate,
      pitch,
      volume,
    });
    this.setState({ modal: '' });
  };
}

export default Index;
