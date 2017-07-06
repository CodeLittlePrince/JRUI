---
title: 选项卡
---

## 代码演示

### 基本形式

<!-- demo_start -->
<div class="m-example"></div>

```xml
<kl-tabs>
    <kl-tab title="Tab1">Content1</kl-tab>
    <kl-tab title="Tab2">Content2</kl-tab>
    <kl-tab title="Tab3">Content3</kl-tab>
    <kl-tab title="Tab4">Content4</kl-tab>
</kl-tabs>
```
<!-- demo_end -->

### 禁用某一项，禁用组件

<!-- demo_start -->
<div class="m-example"></div>

```xml
<div class="g-row">
    <div class="g-col g-col-6">
        <kl-tabs>
            <kl-tab title="Tab1">Content1</kl-tab>
            <kl-tab title="Tab2">Content2</kl-tab>
            <kl-tab title="Tab3" disabled>Content3</kl-tab>
            <kl-tab title="Tab4">Content4</kl-tab>
        </kl-tabs>
    </div>
    <div class="g-col g-col-6">
        <kl-tabs disabled>
            <kl-tab title="Tab1">Content1</kl-tab>
            <kl-tab title="Tab2">Content2</kl-tab>
            <kl-tab title="Tab3">Content3</kl-tab>
            <kl-tab title="Tab4">Content4</kl-tab>
        </kl-tabs>
    </div>
</div>
```
<!-- demo_end -->

### 居中

<!-- demo_start -->
<div class="m-example"></div>

```xml
<kl-tabs class="m-tabs-center">
    <kl-tab title="Tab1">Content1</kl-tab>
    <kl-tab title="Tab2">Content2</kl-tab>
    <kl-tab title="Tab3">Content3</kl-tab>
    <kl-tab title="Tab4">Content4</kl-tab>
</kl-tabs>
```
<!-- demo_end -->

### 垂直居左

<!-- demo_start -->
<div class="m-example"></div>

```xml
<kl-tabs class="m-tabs-left">
    <kl-tab title="Tab1">Content1</kl-tab>
    <kl-tab title="Tab2">Content2</kl-tab>
    <kl-tab title="Tab3">Content3</kl-tab>
    <kl-tab title="Tab4">Content4</kl-tab>
</kl-tabs>
```
<!-- demo_end -->

### 垂直居右

<!-- demo_start -->
<div class="m-example"></div>

```xml
<kl-tabs class="m-tabs-right">
    <kl-tab title="Tab1">Content1</kl-tab>
    <kl-tab title="Tab2">Content2</kl-tab>
    <kl-tab title="Tab3">Content3</kl-tab>
    <kl-tab title="Tab4">Content4</kl-tab>
</kl-tabs>
```
<!-- demo_end -->

### 标题模板自定义

<!-- demo_start -->
<div class="m-example"></div>

```xml
<kl-tabs titleTemplate={@(this.titleTemplate)}>
    <kl-tab title="Tab1">Content1</kl-tab>
    <kl-tab title="Tab2" mark={true}>Content2</kl-tab>
    <kl-tab title="Tab3" mark={true}>Content3</kl-tab>
    <kl-tab title="Tab4">Content4</kl-tab>
</kl-tabs>
```

```javascript
var component = new REGUI.Component({
    template: template,
    titleTemplate: `
{item.data.title} {#if item.data.mark}<span class="u-text u-text-success"><i class="u-icon u-icon-check-circle"></i></span>{/if}`
});
```
<!-- demo_end -->

### 事件

请打开浏览器的控制台查看结果。

<!-- demo_start -->
<div class="m-example"></div>

```xml
<kl-tabs on-select={console.log('on-select:', '$event.selected:', $event.selected)}
      on-change={console.log('on-change:', 'key:', $event.key)}>
    <kl-tab title="Tab1" key="1">Content1</kl-tab>
    <kl-tab title="Tab2" key="2">Content2</kl-tab>
    <kl-tab title="Tab3" key="3">Content3</kl-tab>
    <kl-tab title="Tab4" key="4">Content4</kl-tab>
</kl-tabs>
```

```javascript
var component = new REGUI.Component({
    template: template,
    data: {
        source: [
            {name: '选项1'},
            {name: '选项2'},
            {name: '选项3'}
        ]
    }
});
```
<!-- demo_end -->

### 默认选中 Tab

需要同时设置 `tabs` 的 `defaultKey` 和 `tab` 的 `key`

<!-- demo_start -->
<div class="m-example"></div>

```xml
<kl-tabs defaultKey="3">
    <kl-tab title="Tab1" key="1">Content1</kl-tab>
    <kl-tab title="Tab2" key="2">Content2</kl-tab>
    <kl-tab title="Tab3" key="3">Content3</kl-tab>
    <kl-tab title="Tab4" key="4">Content4</kl-tab>
</kl-tabs>
```
<!-- demo_end -->