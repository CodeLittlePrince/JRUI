const _ = require('../../../ui-base/_');

function genUid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
}

function camelize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const defaults = {
  type: 'POST',
  async: true,
};

function upload(url, src, options) {
  const fd = new FormData();
  let data = src;
  const name = options.name || 'file';

  if (src instanceof File) {
    data = {};
    data[name] = src;
  }

  data = _.extend(data, options.data);

  let key;
  for (key in data) {
    if (data.hasOwnProperty(key)) {
      fd.append(key, data[key]);
    }
  }

  options.url = url;
  options.data = fd;

  return ajax(_.extend(defaults, options, true));
}

function ajax(options) {
  const xhr = new XMLHttpRequest();
  const headers = options.headers || {};

  xhr.open(options.type, options.url, options.async);

  let key;
  for (key in headers) {
    if (headers.hasOwnProperty(key)) {
      xhr.setRequestHeader(key, headers[key]);
    }
  }

  const noop = function () {};
  const onerror = options.onerror || noop;
  const onDownloadLoad = options.onload || noop;
  const onDownloadProgress = options.onprogress || noop;

  xhr.addEventListener('load', onDownloadLoad);
  xhr.addEventListener('error', onerror);
  xhr.addEventListener('progress', onDownloadProgress);

  if (options.upload) {
    const onUploadLoad = options.upload.onload || noop;
    const onUploadProgress = options.upload.onprogress || noop;

    xhr.upload.addEventListener('load', onUploadLoad);
    xhr.upload.addEventListener('progress', onUploadProgress);
  }

  xhr.send(options.data);
}

module.exports = {
  upload,
  genUid,
  camelize,
};
