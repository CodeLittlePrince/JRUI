---
title: 表格
---

## 代码演示

### 基本

<!-- demo_start -->
<div class="m-example"></div>

```xml
<jr-table source={table.source}>
    <jr-table-col name="title" key="title" width=150 />
    <jr-table-col name="value" key="value" tip="I am tip"/>
</jr-table>
```

```javascript
var component = new JRUI.Component({
    template: template,
    data: {
        table: {
            source: []
        }
    },
    init: function() {
        this.data.table.source = [];
        for(var i = 0; i < 3; ++i) {
            this.data.table.source.push({
                title: 'test' + i,
                col1: '' + i,
                value: 10 * i
            });
        }
    }
});
```
<!-- demo_end -->

### 无条纹

<!-- demo_start -->
<div class="m-example"></div>

```xml
<jr-table strip={false} source={table.source} >
    <jr-table-col name="title" key="title" />
    <jr-table-col name="value" key="value" />
</jr-table>
```

```javascript
var component = new JRUI.Component({
    template: template,
    data: {
        table: {
            source: []
        }
    },
    init: function() {
        setTimeout(function() {
            this.data.table.source = [];
            for(var i = 0; i < 3; ++i) {
                this.data.table.source.push({
                    title: 'test' + i,
                    col1: '' + i,
                    value: 10 * i
                });
            }
            this.$update();
        }.bind(this), 200);
    }
});
```
<!-- demo_end -->

### 对齐方式

默认 `align="center"`

<!-- demo_start -->
<div class="m-example"></div>

```xml
<jr-table strip={false} source={table.source} align="left">
    <jr-table-col name="title" key="title" />
    <jr-table-col name="value" key="value" align="right"/>
</jr-table>
```

```javascript
var component = new JRUI.Component({
    template: template,
    data: {
        table: {
            source: []
        }
    },
    init: function() {
        setTimeout(function() {
            this.data.table.source = [];
            for(var i = 0; i < 3; ++i) {
                this.data.table.source.push({
                    title: 'test' + i,
                    col1: '' + i,
                    value: 10 * i
                });
            }
            this.$update();
        }.bind(this), 200);
    }
});
```
<!-- demo_end -->

### 过滤器

`filter` 接收一个 `function`，依次可以取得参数 `val`，`item`，`itemIndex`。

<!-- demo_start -->
<div class="m-example"></div>

```xml
<jr-table source={table.source} >
    <jr-table-col name="title" key="title" filter={this.titleFilter}/>
    <jr-table-col name="value" key="value" />
</jr-table>
```

```javascript
var component = new JRUI.Component({
    template: template,
    data: {
        table: {
            source: []
        }
    },
    init: function() {
        setTimeout(function() {
            this.data.table.source = [];
            for(var i = 0; i < 3; ++i) {
                this.data.table.source.push({
                    title: 'test' + i,
                    col1: '' + i,
                    value: 10 * i
                });
            }
            this.$update();
        }.bind(this), 200);
    },
    titleFilter: function(val, item, itemIndex) {
        return itemIndex + ': ' + val + ' *';
    }
});
```
<!-- demo_end -->

### 多级表头

<!-- demo_start -->
<div class="m-example"></div>

```xml
<jr-table source={table.source} >
    <jr-table-col name="title" key="title" width="100" />
    <jr-table-col name="col1">
        <jr-table-col name="col1.1">
            <jr-table-col name="col1.1.2" key="value" width="160" />
            <jr-table-col name="col1.1.3" key="value2" width="160" />
        </jr-table-col>
        <jr-table-col name="col1.2" key="value" width="160" />
    </jr-table-col>
    <jr-table-col name="value" key="value" width="200" />
</jr-table>
```

```javascript
var component = new JRUI.Component({
    template: template,
    data: {
        table: {
            source: []
        }
    },
    init: function() {
        this.data.table.source = [];
        for(var i = 0; i < 3; ++i) {
            this.data.table.source.push({
                title: 'test' + i,
                col1: '' + i,
                value: 10 * i,
                value2: 'test'
            });
        }
    }
});
```
<!-- demo_end -->

### 悬浮表头和底部

控制表头和底部的悬浮需要对 `scroll` 事件进行监听，在默认的情况下，监听对象是 `window`，即页面的滚动。

如果页面布局比较特殊，需要指定监听的对象，则可以通过 `scrollParent` 指定会发生滚动的容器，如 `scrollParent="#example"`。

<!-- demo_start -->
<div class="m-example" id="example"></div>

```xml
<jr-table
    stickyHeader
    stickyFooter
    stickyHeaderOffset=64
    stickyFooterOffset=0
    source={table.source} >
    <jr-table-col name="title" key="title" width=500 />
    <jr-table-col name="value" key="value" width=500 />
</jr-table>
```

```javascript
var component = new JRUI.Component({
    template: template,
    data: {
        table: {
            source: []
        }
    },
    init: function() {
        this.data.table.source = [];
        for(var i = 0; i < 20; ++i) {
            this.data.table.source.push({
                title: 'test' + i,
                col1: '' + i,
                value: 10 * i
            });
        }
    }
});
```
<!-- demo_end -->

### 表头固定在表格顶部

<!-- demo_start -->
<div class="m-example"></div>

```xml
<jr-table fixedHeader height=200 source={table.source}>
    <jr-table-col name="title" key="title" />
    <jr-table-col name="value" key="value" />
</jr-table>
```

```javascript
var component = new JRUI.Component({
    template: template,
    data: {
        table: {
            source: []
        }
    },
    init: function() {
        this.data.table.source = [];
        for(var i = 0; i < 20; ++i) {
            this.data.table.source.push({
                title: 'test' + i,
                col1: '' + i,
                value: 10 * i
            });
        }
    }
});
```
<!-- demo_end -->

### 固定列

<!-- demo_start -->
<div class="m-example"></div>

```xml
<jr-table fixedHeader height=200 source={table.source}>
    <jr-table-col name="title" key="title" fixed/>
    <jr-table-col name="col1" key="col1" />
    <jr-table-col name="value" key="value" fixed="right"/>
</jr-table>
```

```javascript
var component = new JRUI.Component({
    template: template,
    data: {
        table: {
            source: []
        }
    },
    init: function() {
        this.data.table.source = [];
        for(var i = 0; i < 20; ++i) {
            this.data.table.source.push({
                title: 'test' + i,
                col1: '' + i,
                value: 10 * i
            });
        }
    }
});
```
<!-- demo_end -->

### 自定义模版与filter

通过 `jr-table-template` 组件定义单元格和表头的模版，可以将模版内嵌到组件中，也可以将模版注入到组件的 `template` 属性。
自定义模版中可以通过 `emit` 的方法向上抛出事件。

要在模版中使用自定义的 `filter` 则需要将其先注册到 `JRUI.JRTable` 上。

注意：
1. 内嵌形式的模版需要在每行的两端加上 `{'`、`'}` ，否则模版字符串的插值会无法传递给模版组件，
2. 原有的 `emitEvent` 方法不建议使用，但仍然保留。

`jr-table-col`上亦可以直接传入对应的模版属性， `template`，`headerTemplate`，`formatter`，`headerFormatter`，`format`，`headerFormat`。

<!-- demo_start -->
<div class="m-example"></div>

```xml
<jr-table source={table.source} on-itemclick={this.onItemClick($event)} on-headerclick={this.onHeaderClick($event)}>
    <jr-table-col name="title" key="title">
        <jr-table-template type="header">
            {'<a href={header.name+">+~!!@#$%^&*()"} on-click={this.emit("headerclick", header)}>I am && {header.name}</a>'}
            {'<anchor/>'}
        </jr-table-template>
        <jr-table-template template={tdTpl} />
    </jr-table-col>
    <jr-table-col name="value" key="value" />
</jr-table>
```

```javascript
var anchor = JRUI.Component.extend({
    name: 'anchor',
    template: '<a>&nbsp;anchor</a>',
});

JRUI.JRTable.filter('txtFilter', function(val) {
    return val + '*';
});

var component = new JRUI.Component({
    template: template,
    data: {
        table: {
            source: []
        },
        tdTpl: '<a on-click={this.emit("itemclick", item, this)}>I am {item.title | txtFilter}</a>'
    },
    init: function() {
        this.data.table.source = [];
        for(var i = 0; i < 3; ++i) {
            this.data.table.source.push({
                title: 'test' + i,
                col1: '' + i,
                value: 10 * i
            });
        }
    },
    onItemClick: function(e) {
        console.log(e);
    },
    onHeaderClick: function(e) {
        console.log(e);
    }
});
```
<!-- demo_end -->

### 自定义行样式

通过设置 `item.trClass` 或 `item.trStyle` 修改每一行的样式。

<!-- demo_start -->
<div class="m-example"></div>

```xml
<jr-table stickyHeader source={table.source}>
    <jr-table-col name="title" key="title" />
    <jr-table-col name="value" key="value" />
</jr-table>
```

```javascript
var component = new JRUI.Component({
    template: template,
    data: {
        table: {
            source: []
        }
    },
    init: function() {
        var colors = ['#FFBC07', '#E89406', '#FF8306', '#E85706', '#FF3B07'];
        this.data.table.source = [];
        for(var i = 0; i < 5; ++i) {
            this.data.table.source.push({
                title: 'test' + i,
                col1: '' + i,
                value: 10 * i,
                trStyle: 'background-color:' + colors[i]
            });
        }
    }
});
```
<!-- demo_end -->

### 排序

没有实际的排序效果，请查看 console 打印的事件对象。

<!-- demo_start -->
<div class="m-example"></div>

```xml
<jr-table source={table.source} sorting={table.sorting} on-sort={this.onSort($event)}>
    <jr-table-col name="title" key="title" sortable/>
    <jr-table-col name="value" key="value" sortable/>
</jr-table>
```

```javascript
var component = new JRUI.Component({
    template: template,
    data: {
        table: {
            source: [],
            sorting: {
                key: 'title',
                isAsc: 0
            }
        }
    },
    init: function() {
        this.data.table.source = [];
        for(var i = 0; i < 3; ++i) {
            this.data.table.source.push({
                title: 'test' + i,
                col1: '' + i,
                value: 10 * i
            });
        }
    },
    onSort: function(e) {
        console.log(e);
    }
});
```
<!-- demo_end -->

### 分页

分页的配置参考 [分页 Pager](/components/navigation_pager_.html) 。
<!-- demo_start -->
<div class="m-example"></div>

```xml
<jr-table stickyFooter source={table.source} paging={table.paging} on-paging={this.onPaging($event)}>
    <jr-table-col name="title" key="title" />
    <jr-table-col name="value" key="value" />
</jr-table>
```

```javascript
var component = new JRUI.Component({
    template: template,
    data: {
        table: {
            source: [],
            paging: {
                pageSize: 10,
                sumTotal: 100,
                current: 1
            }
        }
    },
    init: function() {
        this.data.table.source = [];
        for(var i = 0; i < 20; ++i) {
            this.data.table.source.push({
                title: 'test' + i,
                col1: '' + i,
                value: 10 * i
            });
        }
    },
    onPaging: function(e) {
        console.log(e);
    }
});
```
<!-- demo_end -->

### 多选

<!-- demo_start -->
<div class="m-example"></div>

```xml
<jr-check
    name="全选"
    checked={checkAllStatus}
/>

<jr-table source={table.source} on-checkchange={this.onCheck($event)}>
    <jr-table-col name="title" key="title" type="check" />
    <jr-table-col name="value" key="value" />
</jr-table>
```

```javascript
var component = new JRUI.Component({
    template: template,
    computed: {
        checkAllStatus: {
            get: function() {
                var checkedList = this.data.table.source.filter(function(item) {
                    return item._checked;
                });

                return checkedList.length === this.data.table.source.length ? true :
                                                    checkedList.length > 0 ? null :
                                                                            false;

            },
            set: function(val) {
                if(val !== null) {
                    this.data.table.source.forEach(function(item) {
                        item._checked = !!val;
                    });
                }
            }
        }
    },
    data: {
        table: {
            source: []
        }
    },
    init: function() {
        this.data.table.source = [];
        for(var i = 0; i < 3; ++i) {
            this.data.table.source.push({
                title: 'test' + i,
                col1: '' + i,
                value: 10 * i
            });
        }
    },
    onCheck: function(e) {
        console.log(e);
    }
});
```
<!-- demo_end -->

### 数据配置

在进行数据配置时，模版的配置方式更为灵活。

1. `template`，模版字符串；
2. `format`，纯粹的字符串格式化，不对html进行渲染，保留插值语法；
3. `formatter`，通过函数返回模版字符串，适用于当模版需要动态运算生成的情景。

加上前缀 `header` 成为 `headerTemplate`，`headerFormat`，`headerFormatter`，可作为表头的模版。

<!-- demo_start -->
<div class="m-example"></div>

```xml
<jr-table
    fixedHeader
    columns={jr-table-columns}
    sorting={table.sorting}
    paging={table.paging}
    source={table.source}
    loading={loading}
/>
```

```javascript
var component = new JRUI.Component({
    template: template,
    data: {
        table: {
            columns: [
                {
                    name: 'title',
                    key: 'title',
                    tip: 'tippppppp',
                    width: 120,
                    formatter: function(column, item) {
                        return '<a>I\'m ' + item.title + '</a>';
                    },
                },
                {
                    name: 'col1',
                    key: 'col1',
                    children: [
                        {
                            name: 'col1.2',
                            key: 'value',
                            format: '{item.value} %',
                            sortable: true
                        },
                        {
                            name: 'col1.3',
                            key: 'col1',
                            sortable: true
                        }
                    ]
                }
            ],
            sorting: {
                key: 'col1',
                isAsc: 0
            },
            paging: {
                pageSize: 10,
                sumTotal: 100,
                current: 1
            },
            source: []
        }
    },
    init: function() {
        this.data.table.source = [];
        for(var i = 0; i < 5; ++i) {
            this.data.table.source.push({
                title: 'test' + i,
                col1: '' + i,
                value: 10 * i
            });
        }
    }
});
```
<!-- demo_end -->


### 空数据

<!-- demo_start -->
<div class="m-example"></div>

```xml
<jr-table width=700>
    <jr-table-col name="title" key="title" />
    <jr-table-col name="value" key="value" />
</jr-table>
```

```javascript
var component = new JRUI.Component({
    template: template,
    data: {
        table: {
        }
    }
});
```
<!-- demo_end -->

### 加载中

<!-- demo_start -->
<div class="m-example"></div>

```xml
<jr-table width=700 loading={true}>
    <jr-table-col name="title" key="title" />
    <jr-table-col name="value" key="value" />
</jr-table>
```

```javascript
var component = new JRUI.Component({
    template: template,
    data: {
        table: {
        }
    }
});
```
<!-- demo_end -->

### 特殊

由于组件内部有部分模版是使用字符串形式存储，只有在使用时才是进行解析，因此当页面对 `Regular` 的插值符号进行修改时，需要进行特殊处理。

为了向组件内部传递新修改的插值，需要在 `Regular` 下挂载两个新的属性 `_BEGIN_`， `_END_`。

```javascript
Regular._BEGIN_ = '{{';
Regular._END_ = '}}';
Regular.config({
    BEGIN: Regular._BEGIN_,
    END: Regular._END_
});
```

### 模版中获取外部数据的方法

由于组件的设计结构比较特殊，表格中表头和内容分别是两个独立的组件，因此　`jr-table` 上挂载的属性无法直接传递到表头和内容当中。

如有需要获取外部的数据，则需要通过 `this.$parent.data` 去获取。

<!-- demo_start -->
<div class="m-example"></div>

```xml
<jr-table source={table.source} count={count}>
    <jr-table-col name="title" key="title" template={tdTpl} headerTemplate={thTpl}/>
    <jr-table-col name="value" key="value" />
</jr-table>
```

```javascript
var component = new JRUI.Component({
    template: template,
    data: {
        count: 0,
        thTpl: '{header.name + " :" + this.$parent.data.count}',
        tdTpl: '{item.title + " :" + this.$parent.data.count}',
        table: {
            source: []
        }
    },
    init: function() {
        this.data.table.source = [];
        for(var i = 0; i < 3; ++i) {
            this.data.table.source.push({
                title: 'test' + i,
                col1: '' + i,
                value: 10 * i
            });
        }
        setInterval(function() {
            this.data.count++;
            this.$update();
        }.bind(this), 1000);
    },
});
```
<!-- demo_end -->
