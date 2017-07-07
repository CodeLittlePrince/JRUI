/**
 * ------------------------------------------------------------
 * JRIcon     图标
 * @author   zianecui@gmail.com
 * ------------------------------------------------------------
 */

const Component = require('../../../ui-base/component');
const template = require('./index.html');
const _ = require('../../../ui-base/_');

/**
 * @class JRIcon
 * @extend Component
 * @param {object}          [options.data]                        = 绑定属性
 * @param {string}          [options.data.class]                  => 补充class
 * @param {string}          [options.data.type]                  => 补充class
 * @param {string}          [options.data.fontSize]                  => 设置图标胆小
 * @param {string}          [options.data.color]                  => 设置图标颜色
 */
const JRIcon = Component.extend({
  name: 'jr-icon',
  template,
  /**
     * @protected
     */
  config() {
    _.extend(this.data, {
      type: '',
      fontSize: '',
      color: '',
    });
    this.supr();
  },
  onClick(e) {
    this.$emit('click', e);
  },
});

module.exports = JRIcon;
