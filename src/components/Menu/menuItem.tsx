import React, { useContext, useEffect } from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu';
export interface MenuItemProps {
  index?: string,
  disabled?: boolean
  className?: string,
  style?: React.CSSProperties,
  children?: React.ReactNode
}


const MenuItem: React.FC<MenuItemProps> = (props) => {
  const { index, disabled, children, className, style, } = props
  const context = useContext(MenuContext)
  const classes = classNames('menu-item', className, {

    'is-disabled': disabled,
    // context.subMenuItemIndex === index：当 subMenu shrink 再 open subMenuItem 会保持原有的 active 的状态
    'is-active': (context.index === index || context.subMenuItemIndex === index) && disabled !== true
  })

  const handleClick = (e: any) => {
    if (context.onSelect && !disabled && (typeof index === 'string')) {
      context.onSelect(index, false)
      context.clearDefaultOpenSubMenus()
    }
  }
  return (
    <li className={classes} style={style} onClick={handleClick}>
      {children}
    </li>
  )
}
MenuItem.displayName = 'MenuItem'
export default MenuItem