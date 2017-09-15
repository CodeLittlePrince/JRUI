/**
 *  ------------------------------
 *  FileUnit
 *  ------------------------------
 */

const Component = require('../../../../../ui-base/component');
const _ = require('../../../../../ui-base/_');
const tpl = require('./index.html');
const utils = require('../../utils');
const JRModal = require('../../../../notice/JRModal');

const FileUnit = Component.extend({
  template: tpl.replace(/([>}])\s*([<{])/g, '$1$2'),
  config(data) {
    _.extend(data, {
      file: {},
      action: '',
      url: '',
      name: '',
      readonly: false,
      data: {},
    });

    _.extend(data, {
      info: '',
      status: '',
      progress: '0%',
      delConfirm: false,
    });

    this.initData(data);

    this.supr(data);
  },

  initData(data) {
    const file = data.file;
    data.filename = file.name;
    data.type = file.type;

    // for initial uploaded files
    if (data.status === 'ready') {
      this.uploadFile(file.rawFile);
    }
  },

  uploadFile(rawFile) {
    const self = this;
    const data = this.data;

    data.info = '';
    data.status = 'uploading';

    const options = {
      upload: {
        onprogress(e) {
          data.status = 'uploading';
          data.progress = `${parseInt((e.loaded / e.total || 0) * 100)}%`;
          self.$update();

          const emitItem = {
            sender: self,
            event: e,
            progress: data.progress,
            file: data.file,
            status: data.status,
          };

          self.$emit('progress', emitItem);
        },
      },
      onload(e) {
        const target = e.target;
        const status = target.status;
        data.progress = '100%';
        const emitItem = {
          sender: self,
          event: e,
          progress: data.progress,
          file: data.file,
        };

        let result = true;
        let response = {};
        try {
          response = JSON.parse(target.response);
        } catch (error) {
          console.log(error);
        }
        if (self.data.beforeOnLoad) {
          result = self.data.beforeOnLoad.call(self, response);
        }
        response.url = (result && result.url) || response.url;
        if (status >= 200 && status < 400 && result) {
          data.url = response.url;
          data.status = 'success';
          data.info = '';
          self.$update();

          emitItem.status = data.status;
          self.$emit('success', emitItem);
        } else {
          data.status = 'fail';
          data.info = self.$trans('UPLOAD_FAIL');
          self.$update();

          emitItem.status = data.status;
          self.$emit('error', emitItem);
        }
      },
      onerror(e) {
        if (self.data.beforeOnError) {
          self.data.beforeOnError.call(self, e);
        }
        data.status = 'fail';
        data.info = self.$trans('UPLOAD_FAIL');
        self.$update();

        const emitItem = {
          sender: self,
          event: e,
          progress: data.progress,
          file: data.file,
          status: data.status,
        };
        self.$emit('error', emitItem);
      },
    };

    options.name = data.name;
    options.data = data.data;

    utils.upload(data.action, rawFile, options);

    this.$update();
  },

  onRemove(e) {
    const self = this;
    const data = this.data;
    const emitItem = {
      sender: this,
      event: e,
      file: data.file,
      status: data.status,
    };

    if (data.delConfirm) {
      const modal = new JRModal({
        data: {
          content: `${this.$trans('REMOVE_CONFIRM') + data.filename}?`,
        },
      });
      modal.$on('ok', () => {
        self.$emit('remove', emitItem);
      });
    } else {
      self.$emit('remove', emitItem);
    }
  },

  onPreview(e) {
    const data = this.data;
    const emitItem = {
      sender: this,
      event: e,
      file: data.file,
      status: data.status,
    };
    this.$emit('preview', emitItem);
  },
});

module.exports = FileUnit;
