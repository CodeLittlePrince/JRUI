/**
 * ------------------------------------------------------------
 * JRMenuItem
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

const Component = require('../../../../ui-base/component');
const template = require('./index.html');
const RootMenuMixin = require('../mixins/rootMenu');

/**
 * @class JRMenuItem
 * @extend Component
 * @param {object}        [options.data]                          = 绑定属性
 * @param {string}        [options.data.class]                    => 补充class
 * @param {string}        [options.data.title]                    => 标题文案
 * @param {string}        [options.data.url]                      => 跳转链接
 * @param {boolean}       [options.data.isCurrent]                => 是否是当前页
 */
const JRMenuItem = Component.extend({
  name: 'jr-menu-item',
  template,
  /**
   * @protected
   */
  config() {
    this.defaults({
      class: '',
      title: '',
      active: false,
      url: '',
    });

    this.supr();
  },
  computed: {
    active() {
      if (!this.data.rootMenu) return;
      return this.data.rootMenu.currentItem === this;
    },
  },
  init() {
    this.initRootMenu();

    if (this.data.isCurrent) {
      this.data.rootMenu.currentItem = this;
    }
  },
  goto(e) {
    e.stopPropagation();
    this.data.rootMenu.$emit('menuitem-click', this);
    if (this.data.url) {
      location.href = this.data.url;
    }
  },
});

JRMenuItem.use(RootMenuMixin);
module.exports = JRMenuItem;
