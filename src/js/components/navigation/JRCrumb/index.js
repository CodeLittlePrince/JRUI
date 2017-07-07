/**
 * ------------------------------------------------------------
 * JRCrumb     面包屑
 * @author   zianecui@gmail.com
 * ------------------------------------------------------------
 */

const Component = require('../../../ui-base/component');
const template = require('./index.html');
const _ = require('../../../ui-base/_');

/**
 * @class JRCrumb
 * @extend Component
 * @param {object}          [options.data]                     = 绑定属性
 * @param {string}          [options.data.class]               => 补充class
 * @param {string}          [options.data.separator]           => 分隔符，支持模板
 * @param {string}          [options.data.class]               => jr-crumb-item的属性：补充class
 * @param {string}          [options.data.href]                => jr-crumb-item的属性：传入的链接
 */
const JRCrumb = Component.extend({
  name: 'jr-crumb',
  template,
  /**
     * @protected
     */
  config() {
    _.extend(this.data, {
      separator: '/',
      crumbArr: [],
    });
    this.supr();
  },
});

module.exports = JRCrumb;
