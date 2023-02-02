import React, { createContext, useState } from 'react';
import classNames from 'classnames';
import { MenuItemProps } from './menuItem';


type MenuMode = 'horizontal' | 'vertical'
type SelectCallback = (selectedIndex: string, isOpened: boolean, displayName?: string) => void
export interface MenuProps {
  defaultIndex?: string,
  className?: string
  mode?: MenuMode,
  style?: React.CSSProperties,
  onSelect?: SelectCallback,
  children?: React.ReactNode,
  defaultOpenSubMenus?: string[]
  shrinkCurrentItem?: boolean
}
interface IMenuContext {
  index: string,
  onSelect?: SelectCallback,
  mode?: MenuMode,
  defaultOpenSubMenus?: string[],
  subMenuItemIndex?: string,
  isOpened: boolean,
  clearDefaultOpenSubMenus: () => void
  changeIsOpen: (isOpened: boolean) => void,
  shrinkCurrentItem?: boolean
}
export const MenuContext = createContext<IMenuContext>({ index: '0', isOpened: false, clearDefaultOpenSubMenus: () => { return }, changeIsOpen: () => { return } })

export const Menu: React.FC<MenuProps> = (props) => {

  const { defaultIndex, className, children, mode, style, onSelect, shrinkCurrentItem } = props
  let { defaultOpenSubMenus } = props
  const [currentActive, setActive] = useState(defaultIndex)
  const [subMenuItemActive, setSubMenuItemActive] = useState('')
  const [isOpened, setIsOpened] = useState(false)
  const [defaultOpenSubMenusT, setDefaultOpenSubMenusT] = useState(defaultOpenSubMenus)
  const classes = classNames('mark-menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode !== 'vertical'
  })
  const handleClick = (index: string, OpenFlag: boolean, displayName?: string) => {
    // setActive 之后当前组件及其子组件全部更新 即代码全部重新执行
    if (index.indexOf('-') !== -1) {
      setSubMenuItemActive(index)
      if (shrinkCurrentItem) {
        OpenFlag = !OpenFlag
        setIsOpened(OpenFlag)
      }
    } else {
      if (shrinkCurrentItem || displayName === 'SubMenu') {
        setIsOpened(OpenFlag)
      }
      setActive(index)
    }
    if (onSelect) {

      onSelect(index, OpenFlag)
    }
  }
  const clearDefaultOpenSubMenus = () => {
    setDefaultOpenSubMenusT(undefined)
  }
  const changeIsOpen = (isOpenedFlag: boolean) => {
    // passedContext.isOpened = isOpened
    // console.log(isOpened);
    setIsOpened(isOpenedFlag)

  }
  const passedContext: IMenuContext = {
    index: currentActive ? currentActive : '0',
    onSelect: handleClick,
    mode,
    defaultOpenSubMenus: defaultOpenSubMenusT,
    subMenuItemIndex: subMenuItemActive,
    isOpened,
    clearDefaultOpenSubMenus,
    changeIsOpen,
    shrinkCurrentItem
  }
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
  return (
    <ul className={classes} style={style} data-testid='test-menu'>
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  defaultIndex: "0",
  mode: 'horizontal',
  defaultOpenSubMenus: [],
  shrinkCurrentItem: false
}

export default Menu