import React, { ReactElement, InputHTMLAttributes, ChangeEvent, forwardRef } from 'react';
import classNames from 'classnames';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import Icon from '../Icon/icon';

type InputSize = 'lg' | 'sm'
// Omit 忽略 size 避免冲突
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
  /**
   *  是否禁用 Input
   */
  disabled?: boolean
  /**
   * 设置 input 大小，支持 lg 或者是 sm
   */
  size?: InputSize
  /**
   * 添加图标，在右侧悬浮添加一个图标，用于提示
   */
  icon?: IconProp
  /**
   * 添加前缀 用于配置一些固定组合
   */
  prepend?: string | ReactElement
  /**
   * 添加后缀 用于配置一些固定组合
   */
  append?: string | ReactElement
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

/**
 * Input 输入框 通过鼠标或键盘输入内容，是最基础的表单域的包装。
 * 
 * ~~~js
 * // 这样引用
 * import { Input } from 'markship'
 * ~~~
 * 
 * 支持 HTMLInput 的所有基本属性
 */
// forwardRef:转发 ref HTMLInputElement 定义 ref 的 type
export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    disabled,
    size,
    icon,
    prepend,
    append,
    style,
    ...restProps
  } = props
  const classnames = classNames('mark-input-wrapper', {
    [`input-size-${size}`]: size,
    'is-disabled': disabled,
    'input-group': prepend || append,
    'input-group-append': !!append,
    'input-group-prepend': !!prepend
  })

  const fixControllerValue = (value: any) => {
    if (value == null) {
      return ''
    }
    return value
  }
  // value 跟 defaultValue 不能同时共存 React 会报 warning
  // 我们要对 value 进行修正 null=>!null === 非受控组件=>受控组件 React 会报 warning
  if ('value' in props) {
    delete restProps.defaultValue
    restProps.value = fixControllerValue(props.value)
  }
  return (
    <div className={classnames} style={style}>
      {prepend && <div className="mark-input-group-prepend">{prepend}</div>}
      {icon && <div className="icon-wrapper"><Icon icon={icon} title={`title-${icon}`} /></div>}
      <input
        ref={ref}
        className="mark-input-inner"
        disabled={disabled}
        {...restProps}
      />
      {append && <div className="mark-input-group-append">{append}</div>}
    </div>
  )
})

export default Input