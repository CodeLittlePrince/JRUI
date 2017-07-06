---
title: 表单
---

## 代码演示

### 基本形式
required写在kl-form-item上和写在表单元素上验证效果是一样的, 但是如果label要显示红色星号,kl-form-item上必须要有required属性

<!-- demo_start -->
<div class="m-example"></div>

```xml
<kl-form ref="form">
    <kl-form-item title="用户名" cols=6 row required>
        <kl-select required message="请选择用户名" />
    </kl-form-item>
    <kl-form-item title="密码" cols=6 row required message="请输入密码">
        <kl-input type="password" />
    </kl-form-item>
    <xx-button title="验证" on-click={this.validate()} />
</kl-form>
```

```javascript
var component = new REGUI.Component({
    template: template,
    validate: function() {
        var $form = this.$refs.form;
        return $form.validate().success;
    }
});
```
<!-- demo_end -->

## 代码演示

### inline排列

<!-- demo_start -->
<div class="m-example"></div>

```xml
<kl-form inline>
    <kl-form-item title="用户名" row>
        <kl-select size="mdw" />
    </kl-form-item>
    <kl-form-item title="密码" row>
        <kl-input size="mdw" />
    </kl-form-item>
</kl-form>
```

```javascript
var component = new REGUI.Component({
    template: template,
    data: {}
});
```
<!-- demo_end --> 

### 获取select数据接口

<!-- demo_start -->
<div class="m-example"></div>

```xml
<kl-form service={api.selector} ref="formgroup">
    <kl-form-item title="标题1" cols=12 sourceKey="importTypeList">
        <kl-select />
    </kl-form-item>
    <kl-form-item title="标题2" cols=12>
        <kl-input />
    </kl-form-item>
</kl-form>
```

```javascript
var component = new REGUI.Component({
    template: template,
    data: {
        api: {
            selector: '../../data/selector.json'
        }
    }
});
```
<!-- demo_end -->

### 验证示例

<!-- demo_start -->
如果不想使用Form标签
<div class="m-example"></div>

```xml
<kl-form service={api.selector} ref="formgroup">
    <kl-form-item title="标题1" cols=12 sourceKey="importTypeList">
        <kl-select />
    </kl-form-item>
    <kl-form-item title="标题2" cols=12>
        <kl-input />
    </kl-form-item>
</kl-form>
```

```javascript
var component = new REGUI.Component({
    template: template,
    data: {
        api: {
            selector: '../../data/selector.json'
        }
    }
});
```
<!-- demo_end -->
