import React, { Component } from 'react';

class UploadButton extends Component {
  constructor(props) {
    super(props);
    this.uplForm = React.createRef();
    this.dropEl = React.createRef();
    this.filEl = React.createRef();
  }

  getFile = event => {
    const { upload } = this.props;
    if (upload) {
      const input = event.target;
      const tasks = [];
      if ('files' in input && input.files.length > 0) {
        for (let i = 0; i < input.files.length; i += 1) {
          tasks.push(this.readFileContent(input.files[i]));
        }
      }
      Promise.all(tasks).then(fileData => upload(fileData, input.files));
    }
  };

  readFileContent(file) {
    const reader = new FileReader();
    const rABS = false;
    return new Promise(resolve => {
      reader.onload = e => {
        const bstr = e.target.result;
        const error = '';
        const fileObj = {
          bstr,
          rABS,
          filename: file.name,
          form: this.uplForm,
          error,
        };
        resolve(fileObj);
      };
      reader.readAsText(file, 'utf8');
    });
  }

  dragLeave = () => {
    if (this.dropEl.current) this.dropEl.current.classList.remove('over');
  };

  dropEnter = () => {
    if (this.dropEl.current) this.dropEl.current.classList.add('over');
  };

  handleSubmit = e => {
    e.preventDefault();
  };

  renderInput({ onChange, type, multiple }) {
    return (
      <div
        onDragEnter={this.dropEnter}
        ref={this.dropEl}
        onDragLeave={this.dragLeave}
      >
        <input
          onChange={onChange}
          ref={this.filEl}
          type="file"
          style={{ display: 'none' }}
          multiple={multiple}
          accept={type}
          tabIndex="-1"
        />
      </div>
    );
  }

  btnClick = () => {
    if (this.filEl) this.filEl.current.click();
  };

  render() {
    const { label = '', type, isSingle } = this.props;
    const classN = `btn btn-primary`;
    return (
      <div className="btn-wrap">
        <form
          onSubmit={this.handleSubmit}
          ref={this.uplForm}
          encType="multipart/form-data"
        >
          {this.renderInput({
            onChange: this.getFile,
            type,
            multiple: !isSingle,
          })}
        </form>
        <button
          title="Загрузить файлы"
          type="button"
          className={classN}
          onClick={this.btnClick}
        >
          <div>{label}</div>
        </button>
      </div>
    );
  }
}

export default UploadButton;
