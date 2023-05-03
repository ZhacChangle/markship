## markship component library

## 使用 React + TypeScript 从零到一打造一套你自己的组件库

markship 是自己学习组件库开发的开始，使用 React Hooks 和 TypeScript
意在让自己从零到一，由浅入深的提高自己的 React 和 TypeScript 水平，它的官网地址是
[zhacchangle.github.io/markship](https://zhacchangle.github.io/markship)

### 安装最后已经发布的组件库来试试

```javascript
npm install markship --save
```

### 使用

```javascript
// 加载样式
import "markship/dist/index.css";
// 引入组件
import { Button } from "markship";
```

### 项目亮点

- 🔥TypeScript with React Hooks
- ⛑️ 使用 react-testing-library 完成单元测试
- 📚 使用 storybook 本地调试和生成文档页面
- 📦 使用第三方库扩充组件-(react-fontawesome, react-transition-group)
- 🌹 样式（Sass）文件从零开始，掌握大型应用的 CSS 组织方法

### 一些本地开发命令

```bash
//启动本地环境
npm run storybook


//跑单元测试
npm run test

//build 可发布静态文件
npm run build

//发布到 npm
npm run publish
```

# 组件库起航（记录我在开发过程中遇到的一些问题）

## Button

### Button 组件的 Size/Type 可以交给用户自定义

### Button 可以为传统的 button 也可以是 a 链接 a 链接的 disabled 样式需要通过 className .disabled 来实现

### Button 组件上面应该能够传入一系列的事件和属性 如 onClick className 等 React.ButtonHTMLAttributes<HTMLElement> 和 React.AnchorHTMLAttributes<HTMLElement> 上面分别集合了 button and a 链接 的各种属性 使用 & 将其合并 Partial 将联合之后的属性全部变成可选的

### classnames 库实现样式上的添加

### ...restProps 将未明确指明的 props 全部展开，将 余下 props 一次性传递到 对应元素上面

### btnType === ButtonType.Link && href 返回一个 a 链接 否则返回一个 button

### props 默认值

```js
Button.defaultProps = {
  disabled: false,
  btnType: ButtonType.Default,
};
```

## Menu

### BUG isOpened:boolean 是全局的 所有的 SubMenuItem 共享这一份 导致展开的时候所有的 SubMenuItem 都会展开 解决思路：const [menuIsOpend,setMenuIsOpend]=useState(false) 给每一个 SubMenu 都添加一个 state 控制是否展开 但是这样 React 会报错:

```
“Error: Too many re-renders. React limits the number of renders to prevent an infinite loop.”
```

### props

```js
//  默认要展开的 subMenuItem
defaultOpenSubMenus:[]string
// 当点击其他 MenuItem 时 是否默认收起 SubMenuItem
shrinkCurrentItem:boolean
// 二次更新时要将 defaultOpenSubMenus 清除掉
clearDefaultOpenSubMenus
// 控制是否
isOpened:boolean
```

### 渲染 SubMenuItem 和 MenuItem（当 Menu 中传入其他元素时，给出 error 警告）默认添加 index 不需要用户手动添加

```js
  const renderChildren = () => {

    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      const { displayName } = childElement.type
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        return React.cloneElement(childElement, {
          index: index.toString()
        })
      } else {
        console.error('Warning:Menu has a child which is not a MenuItem component ');
      }
    })
  }
```

### MenuItem 判断是否添加 is-active context

```js
// context.subMenuItemIndex === index：当 subMenu shrink 再 open subMenuItem 会保持原有的 active 的状态
    'is-active': (context.index === index || context.subMenuItemIndex === index) && disabled !== true
```

### SubMenuItem 判断是否展开

```js
isOpened =
  index && context.mode === "vertical"
    ? context.defaultOpenSubMenus.includes(index)
    : isOpened;
```

## Icon 组件

### fortawesome svg 开源图标库

### 增加 theme 利用 classNames 动态添加图标颜色 [`icon-${theme}`]: theme

```js
export interface IconProps extends FontAwesomeIconProps {
  theme?: ThemeProps;
}
```

## Transition 组件

### react-transition-group 开源库实现动画效果

### TransitionProps animation：动画形式 wrapper：children 外层是否是需要包裹一层 div children：子节点

### Transition.defaultProps unmountOnExit：动态增加删除节点 解决 shrink 的时候没有动画的问题 appear：SubMenu 默认 open 的时候也有动画效果

```js
Transition.defaultProps = {
  unmountOnExit: true,
  appear: true,
};
```

### 想要给 SubMenu 展开的过程添加动画效果 问题：display:none 的情况下 opacity 效果不起作用 解决方案：CSSTransition

![avatar](./images//transition%E7%9A%84%E5%AE%9E%E7%8E%B0%E5%8E%9F%E7%90%86.png)
![avatar](./images/transition%E7%9A%84%E5%AE%9E%E7%8E%B0%E5%8E%9F%E7%90%861.png)

## Input 组件

### forwardRef 的使用

### 1.value 跟 defaultValue 不能同时共存 React 会报 warning 2.我们要对 value 进行修正 null=>!null === 非受控组件=>受控组件 React 会报 warning

```js
const fixControllerValue = (value: any) => {
  if (value == null) {
    return "";
  }
  return value;
};
// value 跟 defaultValue 不能同时共存 React 会报 warning
// 我们要对 value 进行修正 null=>!null === 非受控组件=>受控组件 React 会报 warning
if ("value" in props) {
  delete restProps.defaultValue;
  restProps.value = fixControllerValue(props.value);
}
```

### debounceValue && triggerSearch.current 避免 Select 的时候发送 fetch 请求

## AutoComplete 组件

### useDebounce hooks 实现防抖 原理 useEffect

### useClickOutside 实现点击非 container 区域 收起联想框

### 用户可以传入 onChange onSelect 方法 当这些事件触发的时候用户可以自定义一些操作

### renderOption 用户可自定义渲染模板

### Transition 组件给 Dropdown 添加动画效果

## Upload 组件

### 大量钩子属性交给用户自定义

```js
export interface UploadProps {
  /**必选参数, 上传的地址 */
  action: string;
  /**上传的文件列表,*/
  defaultFileList?: UploadFile[];
  /**上传文件之前的钩子，参数为上传的文件 */
  beforeUpload?: (file: File) => boolean | Promise<File>;
  /**文件上传时的钩子 */
  onProgress?: (percentage: number, file: UploadFile) => void;
  /**文件上传成功时的钩子 */
  onSuccess?: (data: any, file: UploadFile) => void;
  /**文件上传失败时的钩子 */
  onError?: (err: any, file: UploadFile) => void;
  /**文件状态改变时的钩子，上传成功或者失败时都会被调用	 */
  onChange?: (file: UploadFile) => void;
  /**文件列表移除文件时的钩子 */
  onRemove?: (file: UploadFile) => void;
  /**设置上传的请求头部 */
  headers?: { [key: string]: any };
  /**上传的文件字段名 */
  name?: string;
  /**上传时附带的额外参数 */
  data?: { [key: string]: any };
  /**支持发送 cookie 凭证信息 */
  withCredentials?: boolean;
  /**可选参数, 接受上传的文件类型 */
  accept?: string;
  /**是否支持多选文件 */
  multiple?: boolean;
  /**是否支持拖拽上传 */
  drag?: boolean;
  children?: React.ReactNode;
}
```

### fileList 要同步更新

```js
const updateFileList = (
  updateFile: UploadFile,
  updateObj: Partial<UploadFile>
) => {
  // 变成同步更新
  setFileList((preList) => {
    return preList.map((file) => {
      if (file.uid === updateFile.uid) {
        return { ...file, ...updateObj };
      } else {
        return file;
      }
    });
  });
};
```

### axios 的 onUploadProgress 钩子中处理上传进度

## Dragger 组件 拖拽上传组件

### onDragOver onDragLeave onDrop 三个核心 event

## UploadList 组件 上传结果列表组件

### 根据每一个 file.status = 'ready' | 'uploading' | 'success' | 'danger' 渲染对应的 li

## Progress 组件 渲染上传进度组件

### 交给用户自定义的属性

```js
export interface ProgressProps {
  percent: number;
  strokeHeight?: number;
  showText?: boolean;
  styles?: React.CSSProperties;
  theme?: ThemeProps;
}
```

### 根据 percent 的值渲染进度条对应的 width

```js
style={{ width: `${percent}%` }}
```

## Form 组件

### 大量钩子属性交给用户自定义

```js
export interface FormProps {
  /**表单名称，会作为表单字段 id 前缀使用 */
  name?: string;
  /**表单默认值，只有初始化以及重置时生效 */
  initialValues?: Record<string, any>;
  /** export type RenderProps = (form: FormState) => ReactNode */
  children?: ReactNode | RenderProps;
  /**提交表单且数据验证成功后回调事件 */
  onFinish?: (values: Record<string, any>) => void;
  /**提交表单且数据验证失败后回调事件 */
  onFinishFailed?: (
    values: Record<string, any>,
    errors: Record<string, ValidateError[]>
  ) => void;
}
```

### createContext<T>() 传入初始值的时候不需要定义一些泛型里面的属性 直接 {} as T 即可

```js
export const FormContext = createContext<IFormContext>({} as IFormContext)
```

### forwardRef<T,P>:用于 ref 的转发，可以用于向外暴露一些方法（useImperativeHandle） T:Ref 的 Type P:props 的 Type 在组件外 创建一个 ref 挂载在组件身上 即可通过 ref.current 打点调用 组件上的方法

```js
useImperativeHandle(ref, () => {
  return {
    ...restProps,
  };
});
```

### children 可以是一个 RenderProps 我们可以通过函数传参的形式向外传递一些数据 以便用户做一些操作 例如：显示是否验证通过 是否正在验证

```js
/** export type RenderProps = (form: FormState) => ReactNode */
children?: ReactNode | RenderProps;
childrenNode = children(form)
```

## FormItem 组件

### 大量钩子属性交给用户自定义

```js
export interface FormItemProps {
  /**字段名 */
  name: string;
  /**label 标签的文本 */
  label?: string;
  children?: ReactNode;
  /**子节点的值的属性，如 checkbox 的是 'checked' */
  valuePropName?: string;
  /**设置收集字段值变更的时机 */
  trigger?: string;
  /**设置如何将 event 的值转换成字段值 */
  getValueFromEvent?: (event: any) => any;
  /**校验规则，设置字段的校验逻辑。请看 async validator 了解更多规则 */
  rules?: CustomRule[];
  /**设置字段校验的时机 */
  validateTrigger?: string;
}
```

### useEffect 将 FormItem 注册到 useStore 中去 组件为 checkbox 的时候 会报错 error:非受控组件=>受控组件 还有一个 error 已经解决

```js
// 注册
useEffect(() => {
  // const initialValues = {
  //   agreement: false,
  // };
  // errors: initialValues[name] === false value='' name=agreement
  // const value = (initialValues && initialValues[name]) || ''
  let value = initialValues && initialValues[name];
  value = value == null ? "" : value;
  dispatch({
    type: "addField",
    name,
    value: {
      label,
      name,
      value,
      rules: rules || [],
      errors: [],
      isValid: true,
    },
  });
}, []);
```

### 获取文件的详细信息

```
  const fieldState = fields[name]
  const value = fieldState && fieldState.value
  const errors = fieldState && fieldState.errors
  const isRequired = rules?.some(rule => (typeof rule !== 'function') && rule.required)
  const hasError = errors && errors.length > 0
```

### 何时验证 何时更新 value 以及对限定 children

```js
const onValueUpdate = (e: any) => {
  const value = getValueFromEvent(e);
  dispatch({ type: "updateValue", name, value });
};
const onValueValidate = async () => {
  await validateField(name);
};

// 手动的创建一个属性列表，需要有 value 以及 onChange 属性 满足自定义需求
const controlProps: Record<string, any> = {};
controlProps[valuePropName] = value;
controlProps[trigger] = onValueUpdate;
if (rules) {
  controlProps[validateTrigger] = onValueValidate;
}

// 获取 children 数组的第一个元素
  const childList = React.Children.toArray(children)
  // 没有组件
  if (childList.length === 0) {
    console.error('No child element found in Form.Item, please provide one form component')
  }
  // 子组件大于一个
  if (childList.length > 1) {
    console.warn('Only support one child element in Form.Item, others will be omitted')
  }
  // 不是 ReactElement 的子组件
  if (!React.isValidElement(childList[0])) {
    console.error('Child component is not a valid React Element')
  }
  const child = childList[0] as React.ReactElement
  //  cloneElement，混合这个child 以及 手动的属性列表
  const returnChildNode = React.cloneElement(
    child,
    { ...child.props, ...controlProps }
  )
```

## UseStore

### CustomRule 可以为函数

```js
export type CustomRuleFunc = ({ getFieldValue }: { getFieldValue: getFiledValueType }) => RuleItem
export type CustomRule = RuleItem | CustomRuleFunc
```

### 创建一个 reducer 用于注册 更新 每一个 FormItem

```js
function fieldsReducer(state: FieldsState, action: FieldsAction): FieldsState {
  switch (action.type) {
    case "addField":
      return {
        ...state,
        [action.name]: { ...action.value },
      };
    case "updateValue":
      return {
        ...state,
        [action.name]: { ...state[action.name], value: action.value },
      };
    case "updateValidateResult":
      const { isValid, errors } = action.value;
      return {
        ...state,
        [action.name]: { ...state[action.name], isValid, errors },
      };
    default:
      return state;
  }
}
```

### validateAllFields

```js
  const validateAllFields = async () => {
    let isValid = true
    let errors: Record<string, ValidateError[]> = {}
    // {'username':''abc}
    const valueMap = mapValues(fields, item => item.value)
    const descriptor = mapValues(fields, item => transformRules(item.rules))
    const validator = new Schema(descriptor)
    setForm({ ...form, isSubmitting: true })
    try {
      await validator.validate(valueMap)
    } catch (e) {
      isValid = false
      const err = e as ValidateErrorType
      errors = err.fields
      each(fields, (value, name) => {
        // errors 中有对应的 key
        if (errors[name]) {
          const itemErrors = errors[name]
          dispatch({ type: 'updateValidateResult', name, value: { isValid: false, errors: itemErrors } })
        } else if (value.rules.length > 0 && !errors[name]) {
          //  有对应的 rules，并且没有 errors
          dispatch({ type: 'updateValidateResult', name, value: { isValid: true, errors: [] } })
        }
      })
    } finally {
      setForm({ ...form, isSubmitting: false, isValid, errors })
      return {
        isValid,
        errors,
        values: valueMap
      }
    }

  }
```

## Sass 的基本使用

### 命名以下划线开头表示 该 scss 文件不可以单独的被编译成 css 文件 只能通过 import 语法导入

### import 的时候不用添加下划线

### @mixin 语法的基本使用

```scss
@mixin button-size($padding-y, $padding-x, $font-size, $border-radius) {
  padding: $padding-y $padding-x;
  font-size: $font-size;
  border-radius: $border-radius;
}
@include button-size($btn-padding-y-lg,$btn-padding-x-lg,$btn-font-size-lg,$border;
```

### !default 的作用：变量被用户赋值之后不采用 default 值

```scss
 $variable: 'hello world';
 $variable: 'test' !default;
 $variable ==='hello world'
```

### lighten 比 $background 的颜色暗淡 7.5%

```scss
$hover-background: lighten($background, 7.5%);
```

### %heading 的用法

```scss
%heading {
  margin-top: 0; // 1
  margin-bottom: $headings-margin-bottom;
  font-family: $headings-font-family;
  font-style: $headings-font-style;
  font-weight: $headings-font-weight;
  line-height: $headings-line-height;
  color: $headings-color;
}

h1 {
  @extend %heading;
  font-size: $h1-font-size;
}
```

### @each 语法的使用

```scss
@each $key, $val in $theme-colors {
  .icon-#{$key} {
    color: $val;
  }
}
```

## TS 的高级用法

### ReturnType<typeof useStore> 可以将一个函数的返回值作为类型 Pick<T,K> 可以选取想要的属性 Omit<T,K> 忽略一些属性

```js
export type IFormContext = Pick<
  ReturnType<typeof useStore>,
  "dispatch" | "fields" | "validateField"
> &
  Pick<FormProps, "initialValues">;
export type IFormRef = Omit<
  ReturnType<typeof useStore>,
  "fields" | "dispatch" | "form"
>;
```

## 将一些属性由可选的变成必选的 避免对这些有默认值的属性进行断言

```js
export type SomeRequired<T, K extends keyof T> = Required<Pick<T, K>> & Omit<T, K>
props as SomeRequired<FormItemProps, 'getValueFromEvent' | 'trigger' | 'valuePropName' | 'validateTrigger'>
FormItem.defaultProps = {
  valuePropName: 'value',
  trigger: 'onChange',
  validateTrigger: 'onBlur',
  getValueFromEvent: (e) => e.target.value
}
```
