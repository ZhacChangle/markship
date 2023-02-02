import React, { FC, ReactElement, KeyboardEvent, ChangeEvent, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import Input, { InputProps } from '../Input/input';
import Icon from '../Icon/icon';
import Transition from '../Transition/transition';
import useDebounce from '../../hooks/useDebounce';
import useClickOutside from '../../hooks/useClickOutside';
interface DataSourceObject {
  value: string,
}
export type DataSourceType<T = {}> = T & DataSourceObject
export interface AutoCompleteProps extends Omit<InputProps, 'onSelect' | 'onChange'> {
  /**
 * 返回输入建议的方法，可以拿到当前的输入，然后返回同步的数组或者是异步的 Promise
 * type DataSourceType<T = {}> = T & DataSourceObject
 */

  fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>
  /** 点击选中建议项时触发的回调*/
  onSelect?: (item: DataSourceType) => void;
  /** 文本框发生改变的时候触发的事件*/
  onChange?: (value: string) => void;
  /**支持自定义渲染下拉项，返回 ReactElement */
  renderOption?: (item: DataSourceType) => ReactElement
}

/**
 * 输入框自动完成功能。当输入值需要自动完成时使用，支持同步和异步两种方式
 * 支持 Input 组件的所有属性 支持键盘事件选择
 * ### 引用方法
 * 
 * ~~~js
 * // 这样引用
 * import { AutoComplete } from 'markship'
 * ~~~
 */

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const {
    fetchSuggestions,
    onSelect,
    onChange,
    value,
    renderOption,
    ...restProps
  } = props

  const [inputValue, setInputValue] = useState(value as string)
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([])
  const [loading, setLoading] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [highlightIndex, setHighlightIndex] = useState(-1)
  const triggerSearch = useRef(false)
  const componentRef = useRef<HTMLDivElement | null>(null)
  const debounceValue = useDebounce(inputValue, 300)
  useClickOutside(componentRef, () => { setSuggestions([]) })
  useEffect(() => {
    // Select 的时候不发送 fetch 请求
    if (debounceValue && triggerSearch.current) {
      setSuggestions([])
      const results = fetchSuggestions(debounceValue)
      if (results instanceof Promise) {
        setLoading(true)
        results.then(data => {
          setLoading(false)
          setSuggestions(data)
          if (data.length > 0) {
            setShowDropdown(true)
          }
        })
      } else {
        setSuggestions(results)
        setShowDropdown(true)
        if (results.length > 0) {
          setShowDropdown(true)
        }
      }
    } else {
      setShowDropdown(false)
    }
    // 再次触发联想 取消高亮
    setHighlightIndex(-1)
  }, [debounceValue, fetchSuggestions])
  const highlight = (index: number) => {
    if (index < 0) index = suggestions.length - 1
    if (index >= suggestions.length) {
      index = suggestions.length - 1
    }
    setHighlightIndex(index)
  }
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {


    switch (e.key) {
      case 'Enter':
        if (suggestions[highlightIndex]) {
          handleSelect(suggestions[highlightIndex])
        }
        break;
      case 'ArrowUp':
        highlight(highlightIndex - 1)
        break;
      case 'ArrowDown':
        highlight(highlightIndex + 1)
        break
      case 'Escape':
        setShowDropdown(false)
        setSuggestions([])
        break
      default:
        break
    }
  }
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setInputValue(value)
    if (onChange) {
      onChange(value)
    }
    triggerSearch.current = true
  }
  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value)
    setShowDropdown(false)
    if (onSelect) {
      onSelect(item)
    }
    // Select 的时候不发送 fetch 请求
    triggerSearch.current = false
  }
  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value
  }
  const generateDropdown = () => {
    return (
      <Transition
        in={showDropdown || loading}
        animation='zoom-in-top'
        timeout={300}
        onExited={() => { setSuggestions([]) }}
      >
        <ul className='mark-suggestion-list'>
          {
            loading &&
            <div className='suggestions-loading-icon'>
              <Icon icon='spinner' spin></Icon>
            </div>
          }
          {
            suggestions.map((item, index) => {
              const classnames = classNames('suggestion-item', {
                'is-active': index === highlightIndex
              })
              return (
                <li key={index} className={classnames} onClick={() => handleSelect(item)}>
                  {renderTemplate(item)}
                </li>
              )
            })
          }
        </ul>
      </Transition>
    )
  }
  return (
    <div className='mark-auto-complete' ref={componentRef}>
      <Input {...restProps} value={inputValue} onKeyDown={handleKeyDown} onChange={handleChange}></Input>
      {generateDropdown()}
    </div>
  )
}

export default AutoComplete