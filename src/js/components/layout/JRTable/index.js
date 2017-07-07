const TableHeader = require('./TableHeader');
const TableBody = require('./TableBody');
const _ = require('../../../ui-base/_');
const u = require('./utils');

const Component = require('../../../ui-base/component');
const tpl = require('./index.html');

/**
 * @class JRTable
 * @extend Component
 * @param {object}            [options.data]                      = 绑定属性
 * @param {array}             [options.data.source]               => 数据源
 * @param {object}            [options.data.paging]               => 分页
 * @param {object}            [options.data.sorting]              => 排序
 * @param {boolean}           [options.data.stickyHeader]         => 将表头固定到页面顶部
 * @param {boolean}           [options.data.stickyFooter]         => 将表格底部操作固定到页面底部
 * @param {boolean}           [options.data.fixedHeader]          => 将表头固定到表格顶部
 * @param {number}            [options.data.lineClamp]            => 单元格行数限制
 * @param {array}             [options.data.columns]              => 列配置
 * @param {string}            [optiosn.data.align='center']       => 文字对齐
 */

/**
 * @class JRTableCol
 * @extend Component
 * @param {object}      [options.data]                  = 绑定属性
 * @param {string}      [options.data.name]             => 表头名称
 * @param {string}      [options.data.key]              => 列属性字段
 * @param {string}      [options.data.tip]              => 提示信息
 * @param {string}      [options.data.type]             => 列内容的预设类型
 * @param {string}      [options.data.width]            => 列宽
 * @param {string}      [options.data.tdClass]          => 列内容样式
 * @param {string}      [options.data.thClass]          => 表头样式
 * @param {boolean}     [options.data.sortable]         => 可排序
 * @param {string}      [options.data.children]         => 子表头
 * @param {boolean|string} [options.data.fixed]         => 列固定开关，默认left为做固定，right为右固定
 * @param {string}      [optiosn.data.align='']         => 列文字对齐

 * @param {string}      [options.data.template]         => 列内容模版
 */

/**
 * @class JRTableTemplate
 * @extend Component
 * @param {object}      [options.data]                = 绑定属性
 * @param {string}      [options.data.type="content"] => 模版类型, header, content
 */

const JRTable = Component.extend({
  name: 'jr-table',
  template: tpl,
  computed: {
    bodyHeight: {
      get() {
        const data = this.data;
        if (data.height !== undefined && data.headerHeight !== undefined && data.height !== null && data.headerHeight !== null) {
          return +data.height - data.headerHeight;
        }
      },
      set(val) {
        return (this.data.bodyHeight = val);
      },
    },
    fixedRight: {
      get() {
        const data = this.data;
        const fixedRight = Math.floor(data.parentWidth - data.tableWidth);
        return fixedRight > 0 ? fixedRight : 0;
      },
    },
  },
  config(data) {
    this.defaults({
      stickyHeaderOffset: 0,
      stickyFooterOffset: 0,
      scrollParent: null,
      scrollParentNode: null,
      strip: true,
      enableHover: true,
      scrollYBar: 0,
      scrollXBar: 0,

      show: true,
      columns: [],
      sorting: {},
      config: {},
      align: 'center',
      initFinished: false,
    });
    this.supr(data);

    this._initWatchers();
  },
  init() {
    this._initTable();
  },
  _initTable() {
    const self = this;
    const data = this.data;
    const refs = this.$refs;
    const INIT = 1;
    setTimeout(() => {
      data.headerHeight = refs.headerWrap.offsetHeight;

      self._updateContainerWidth(INIT);
      self._updateViewWidth();
      self._initTableWidth();
      self._getHeaderHeight();
      data.initFinished = true;
    }, 50);
  },
  _initTableWidth() {
    const data = this.data;
    const _dataColumns = data._dataColumns;
    if (!_dataColumns) {
      return;
    }

    const tableWidth = data.parentWidth;
    let customWidthCount = 0;
    const customColumnWidthTotal = _dataColumns.reduce((previous, current) => {
      const width = parseInt(current.width);
      if (width) {
        customWidthCount += 1;
        return previous + width;
      }
      return previous;
    }, 0);

    const tableViewWidth = tableWidth - data.scrollYBar;
    let autoWidth = Math.floor(
      (tableViewWidth - customColumnWidthTotal) /
        (_dataColumns.length - customWidthCount),
    );
    autoWidth = autoWidth > 0 ? autoWidth : 100;

    _dataColumns.forEach((dataColumn) => {
      dataColumn._width = parseInt(dataColumn.width || autoWidth);
      return dataColumn;
    });

    this._updateData('tableWidth', tableWidth);
  },
  _initWatchers() {
    this.$watch('show', this._onShowChange);
    this.$watch('source', this._onSouceChange);
    this.$watch('columns', this._onColumnsChange);
    this.$watch('scrollYBar', this._onScrollYBarChange);
    this.$watch('parentWidth', this._onParentWidthChange);

    this._onBodyScroll = u.throttle(this._onBodyScroll.bind(this), 16);

    this._onWinodwScroll = u.throttle(this._onWinodwScroll.bind(this), 200);
    this._getScrollParentNode().addEventListener(
      'scroll',
      this._onWinodwScroll,
    );

    this._onWindowResize = u.throttle(this._onWindowResize.bind(this), 200);
    window.addEventListener('resize', this._onWindowResize);

    this._watchWidthChange();
  },
  _getScrollParentNode() {
    const data = this.data;
    if (data.scrollParentNode) {
      return data.scrollParentNode;
    }
    if (data.scrollParent) {
      return (data.scrollParentNode =
        document.querySelector(data.scrollParent) || window);
    }
    return (data.scrollParentNode = window);
  },
  _updateHeaders() {
    const columns = this.data.columns;
    if (!columns) {
      return;
    }
    this.data.headers = u.getHeaders(columns);
  },
  _onShowChange(newVal) {
    const self = this;
    if (newVal) {
      setTimeout(() => {
        self._updateViewWidth();
      }, 100);
    }
  },
  _updateViewWidth() {
    if (this.$refs.table) {
      this._updateData('viewWidth', this.$refs.table.offsetWidth);
    }
  },
  _onParentWidthChange(newVal, oldVal) {
    if (newVal === undefined || oldVal === undefined) {
      return;
    }
    const _oldVal = oldVal || this.data.tableWidth;
    const ratio = newVal / _oldVal;
    this._updateTableWidth(ratio);
  },
  _onSouceChange() {
    const self = this;
    setTimeout(() => {
      self._updateSticky();
    }, 500);
  },
  _onWinodwScroll() {
    if (!this.$refs || !this._isShow()) {
      return;
    }
    this._updateSticky();
  },
  _updateSticky() {
    const data = this.data;
    if (!data.stickyHeader && !data.stickyFooter) {
      return;
    }

    const tableWrapOffset = this._getTableWrapOffset();

    if (data.stickyHeader && tableWrapOffset) {
      this._updateStickyHeaderStatus(tableWrapOffset);
    }

    if (data.stickyFooter && tableWrapOffset) {
      this._updateStickyFooterStatus(tableWrapOffset);
    }
  },
  _getTableWrapOffset() {
    const scrollParentNode = this._getScrollParentNode();
    let parentRect = {
      top: 0,
    };
    let scrollTop;
    if (scrollParentNode !== window) {
      scrollTop = scrollParentNode.scrollTop;
      parentRect = scrollParentNode.getBoundingClientRect();
    } else {
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    }

    const tableRect = this.$refs.tableWrap.getBoundingClientRect();

    const tableWrapOffset = {
      top: (tableRect.top + scrollTop) - parentRect.top,
      bottom: (tableRect.bottom + scrollTop) - parentRect.top,
    };

    return tableWrapOffset;
  },
  _updateStickyHeaderStatus(tableWrapOffset) {
    const headerHeight = this._getHeaderHeight();

    const scrollParentNode = this._getScrollParentNode();
    let scrollY = 0;
    if (scrollParentNode !== window) {
      scrollY = scrollParentNode.scrollTop;
    } else {
      scrollY = window.scrollY;
    }

    let stickyActive = false;

    if (
      scrollY + headerHeight > tableWrapOffset.bottom ||
      scrollY < tableWrapOffset.top
    ) {
      stickyActive = false;
    } else if (scrollY > tableWrapOffset.top) {
      stickyActive = true;
    }

    this.data.stickyHeaderActive = stickyActive;
  },
  _updateStickyFooterStatus(tableWrapOffset) {
    const headerHeight = this._getHeaderHeight();
    const footerHeight = this._getFooterHeight();

    let scrollY = 0;
    let innerHeight = 0;
    const scrollParentNode = this._getScrollParentNode();
    if (scrollParentNode !== window) {
      scrollY = scrollParentNode.scrollTop;
      innerHeight = scrollParentNode.clientHeight;
    } else {
      scrollY = window.scrollY;
      innerHeight = window.innerHeight;
    }

    const scrollYBottom = scrollY + innerHeight;
    let stickyActive = false;

    if (
      scrollYBottom > tableWrapOffset.bottom + footerHeight ||
      scrollYBottom < tableWrapOffset.top + headerHeight + 20
    ) {
      stickyActive = false;
    } else {
      stickyActive = true;
    }

    this.data.stickyFooterActive = stickyActive;
  },
  _watchWidthChange() {
    const self = this;
    this.data._quickTimer = setInterval(() => {
      if (!self._isShow()) {
        return;
      }
      self._updateContainerWidth();
      self._updateScrollBar();
    }, 50);
    this.data._slowTimer = setInterval(() => {
      if (!self._isShow()) {
        return;
      }
      self._updateTableWidth();
    }, 200);
  },
  _updateContainerWidth(init) {
    const data = this.data;
    let width = data.width;
    if (init && width) {
      data._defaultWidth = width;
      return;
    }

    const parentStyle = window.getComputedStyle(
      this.$refs.tableWrap.parentElement,
    );
    const parentPadding =
      u.getNum(parentStyle.paddingLeft) - u.getNum(parentStyle.paddingRight);
    const parentWidth = u.getNum(parentStyle.width);
    width = parentWidth - parentPadding;

    data.parentWidth = width;
    data._defaultWidth = width;
  },
  _updateScrollBar() {
    const tableWrapEle = this.$refs.bodyWrap;
    const tableEle = this.$refs.table;
    if (!tableWrapEle || !tableEle) {
      return;
    }
    const yBarWidth = Math.abs(
      tableWrapEle.offsetWidth - tableWrapEle.clientWidth,
    );
    const tableWrapEleXBarWidth = Math.abs(
      tableWrapEle.offsetHeight - tableWrapEle.clientHeight,
    );
    const tableEleXBarWidth = Math.abs(
      tableEle.offsetHeight - tableEle.clientHeight,
    );
    const xBarWidth = Math.max(tableWrapEleXBarWidth, tableEleXBarWidth);

    this._updateData('scrollYBar', yBarWidth);
    this._updateData('scrollXBar', xBarWidth);
  },
  _onScrollYBarChange(newVal, oldVal) {
    if (oldVal === undefined) {
      return;
    }
    this._updateTableWidth();
  },
  _onColumnsChange(newVal) {
    if (newVal) {
      this._updateDataColumn();
      this._updateTableWidth();
      this._updateHeaders();
    }
  },
  _updateDataColumn() {
    this.$update('_dataColumns', u.getLeaves(this.data.columns));
  },
  _getHeaderHeight() {
    const headerHeight = u.getElementHeight(this.$refs.headerWrap);
    this._updateData('headerHeight', headerHeight);
    return headerHeight;
  },
  _getFooterHeight() {
    const footerHeight = u.getElementHeight(this.$refs.footerWrap);
    this._updateData('footerHeight', footerHeight);
    return footerHeight;
  },
  _updateTableWidth(_ratio) {
    const data = this.data;
    const _dataColumns = data._dataColumns;
    if (!_dataColumns) {
      return;
    }
    const ratio = _ratio || 1;
    let newTableWidth = 0;
    let fixedCol = false;
    let fixedTableWidth = 0;
    let fixedColRight = false;
    let fixedTableWidthRight = 0;

    _dataColumns.forEach((column) => {
      // 计算表格宽度
      newTableWidth += column._width;

      // 更新列宽
      if (!column._width) {
        column._width = column.width || 100;
      }

      if (ratio !== 1) {
        column._width = Math.floor(column._width * ratio);
      }

      // 计算固定列的总宽度
      if (column._width && column.fixed) {
        if (column.fixed === 'right') {
          fixedColRight = true;
          fixedTableWidthRight += column._width;
        } else {
          fixedCol = true;
          fixedTableWidth += column._width;
        }
      }
    });

    data.fixedCol = fixedCol;
    data.fixedTableWidth = fixedTableWidth;
    data.fixedColRight = fixedColRight;
    data.fixedTableWidthRight = fixedTableWidthRight;

    data.tableWidth = newTableWidth;

    if (newTableWidth <= data._defaultWidth) {
      data.width = newTableWidth;
    } else {
      data.width = data._defaultWidth;
    }
    this.$update();
  },
  _onWindowResize() {
    if (!this.$refs || !this._isShow()) {
      return;
    }
    this.$update('viewWidth', this.$refs.table.offsetWidth);
  },
  _onBodyScroll(host) {
    if (!this._isShow()) {
      return;
    }
    const $refs = this.$refs;

    u.setElementValue($refs.bodyWrapFixed, 'scrollTop', host.scrollTop);
    u.setElementValue($refs.bodyWrapFixedRight, 'scrollTop', host.scrollTop);
    u.setElementValue($refs.headerWrap, 'scrollLeft', host.scrollLeft);
    u.setElementValue($refs.bodyWrap, 'scrollLeft', host.scrollLeft);
  },
  _onSort(e) {
    /**
         * @event sort 排序事件
         * @property {object} sender 事件来源
         * @property {boolean} asc 是否升序
         * @property {object} column 目标列
         * @property {number} columnIndex 目标列序号
         * @property {string} key 排序字段
         * @property {object} sorting 排序设置对象
         */
    this.$emit('sort', e);
  },
  _onCustomEvent(e) {
    this.$emit(
      e.type,
      _.extend(
        {
          sender: this,
          custom: true,
        },
        e.args,
      ),
    );
  },
  _onItemCheckChange(e) {
    /**
         * @event checkchange 多选事件
         * @property {object} sender 事件来源
         * @property {boolean} checked 是否选中
         * @property {object} item 操作对象
         * @property {object} checkedEvent 多选事件对象源
         */
    this.$emit('checkchange', {
      sender: this,
      item: e.item,
      checked: e.checked,
      checkedEvent: e.event,
    });
  },
  emitEvent(type, ...args) {
    /**
         * @event [type] 自定义的操作事件
         * @property {object} sender 事件来源
         * @property {boolean} custom 自定义事件标识
         * @property {array} param 自定义事件所带的参数
         */
    this.$emit(type, {
      custom: true,
      sender: this,
      param: args,
    });
  },
  _onExpand(e) {
    this.$emit('expand', {
      sender: this,
      expand: e.expand,
      item: e.item,
      itemIndex: e.itemIndex,
      column: e.column,
    });
  },
  _onPaging(e) {
    /**
         * @event paging 分页事件
         * @property {object} sender 事件来源
         * @property {number} current 事件来源
         * @property {object} paging 分页对象
         */
    this.$emit('paging', {
      sender: this,
      current: e.current,
      paging: this.data.paging,
    });
  },
  _onFixedExpand(e) {
    this.$refs.tableBody._onExpand(e.item, e.itemIndex, e.column);
  },
  _isShow() {
    return this.data.show;
  },
  _updateData(key, val) {
    if (this.data[key] !== val) {
      this.$update(key, val);
    }
  },
  destroy() {
    this.removeEventListener();
    this.supr();
  },
  removeEventListener() {
    clearInterval(this.data._quickTimer);
    clearInterval(this.data._slowTimer);
    window.document.removeEventListener('scroll', this._onWinodwScroll);
    window.removeEventListener('resize', this._onWindowResize);
  },
})
  .component('table-header', TableHeader)
  .component('table-body', TableBody);

const oldFilterFunc = JRTable.filter;

JRTable.filter = function (...args) {
  // const args = [].slice.call(arguments, 0);
  TableHeader.filter(...args);
  TableBody.filter(...args);
  oldFilterFunc.apply(JRTable, args);
};

module.exports = JRTable;
