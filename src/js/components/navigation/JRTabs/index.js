/**
 * ------------------------------------------------------------
 * JRTabs       选项卡
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

const Component = require('../../../ui-base/component');
const template = require('./index.html');
const _ = require('../../../ui-base/_');

/**
 * @class JRTab
 * @extend Component
 * @param {object}        [options.data]                      = 绑定属性
 * @param {object}        [options.data.title='']             => 标题
 * @param {string}        [options.data.key=null]             => key 标识
 */

/**
 * @class JRTabs
 * @extend Component
 * @param {object}        [options.data]                      = 绑定属性
 * @param {object}        [options.data.selected=null]        <=> 当前选择卡
 * @param {string}        [options.data.titleTemplate=null]   @=> 标题模板
 * @param {string}        [options.data.defaultKey=null]      => 默认显示对应 key 的 Tab
 * @param {boolean}       [options.data.readonly=false]       => 是否只读
 * @param {boolean}       [options.data.disabled=false]       => 是否禁用
 * @param {boolean}       [options.data.visible=true]         => 是否显示
 * @param {string}        [options.data.class]                => 补充class
 */
const JRTabs = Component.extend({
  name: 'jr-tabs',
  template,
  /**
     * @protected
     */
  config() {
    _.extend(this.data, {
      tabs: [],
      selected: undefined,
      titleTemplate: null,
    });
    this.supr();

    this.$watch('selected', (newValue) => {
      /**
             * @event change 选项卡改变时触发
             * @property {object} sender 事件发送对象
             * @property {object} selected 改变后的选项卡
             */
      this.$emit('change', {
        sender: this,
        selected: newValue,
        key: newValue.data.key,
      });
    });
  },
  /**
     * @method select(item) 选择某一项
     * @public
     * @param  {object} item 选择项
     * @return {void}
     */
  select(item) {
    if (this.data.readonly || this.data.disabled || item.data.disabled) return;

    this.data.selected = item;
    /**
         * @event select 选择某一项时触发
         * @property {object} sender 事件发送对象
         * @property {object} selected 当前选择卡
         */
    this.$emit('select', {
      sender: this,
      selected: item,
      key: item.data.key,
    });
  },
});

module.exports = JRTabs;
