import React, { useContext, FunctionComponentElement, useState } from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu';
import { MenuItemProps } from './menuItem';
import Icon from '../Icon/icon';
import { CSSTransition } from 'react-transition-group';
export interface SubMenuProps {
  index?: string,
  title: string,
  className?: string,
  children?: React.ReactNode
}

const SubMenu: React.FC<SubMenuProps> = ({ index, title, children, className }) => {
  const context = useContext(MenuContext)
  let isOpened = context.isOpened
  if (context.defaultOpenSubMenus) {

    isOpened = (index && context.mode === 'vertical') ? context.defaultOpenSubMenus.includes(index) : isOpened

    // warning: Cannot update a component (`Menu`) while rendering a different component (`SubMenu`). 
    // setTimeout：解决 warning
    setTimeout(() => {
      context.changeIsOpen(isOpened)
    })

  }
  const classes = classNames('menu-item submenu-item', className, {
    'is-active': context.index === index,
    'is-opened': isOpened,
    'is-vertical': context.mode === 'vertical'
  })

  const handleClick = (e: React.MouseEvent) => {
    let targetTagName = (e.target as HTMLElement).tagName
    e.preventDefault()
    if (context.onSelect && index) {

      context.clearDefaultOpenSubMenus()

      if (targetTagName === 'LI') {
        context.onSelect(index, isOpened)
      } else {
        context.onSelect(index, !isOpened, SubMenu.displayName)
      }
    }
  }
  let timer: any
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer)
    e.preventDefault()
    timer = setTimeout(() => {
      context.changeIsOpen(toggle)
    }, 300);
  }
  const clickEvents = context.mode === 'vertical' ? {
    onClick: handleClick
  } : {}
  const hoverEvents = context.mode !== 'vertical' ? {
    onMouseEnter: (e: React.MouseEvent) => { handleMouse(e, true) },
    onMouseLeave: (e: React.MouseEvent) => { handleMouse(e, false) }
  } : {}
  const renderChildren = () => {
    const subMenuClasses = classNames('mark-submenu', {
      'menu-opened': isOpened
    })
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>
      if (childElement.type.displayName === 'MenuItem') {
        return React.cloneElement(childElement, {
          index: `${index}-${i}`
        })
      } else {
        console.error('Warning：SubMenu has a child which is not a MenuItem component');
      }
    })
    return (
      // in 表示什么时候添加这个 classNames 即 isOpened 为 true 的时候添加
      // 多少秒后 enter-done 即动画彻底结束
      // appear 表示 subMenu 默认展开的时候也有动画
      // unmountOnExit 将 ul 动态添加 动态移除
      <CSSTransition
        in={isOpened}
        timeout={300}
        classNames='zoom-in-top'
        appear
        unmountOnExit
      >
        <ul className={subMenuClasses}>
          {childrenComponent}
        </ul>
      </CSSTransition>
    )
  }
  return (
    <li key={index} className={classes} {...hoverEvents} {...clickEvents}>
      <div className='submenu-title' >
        {title}
        <Icon icon='angle-down' className='arrow-icon'></Icon>
      </div>
      {renderChildren()}
    </li>
  )
}

SubMenu.displayName = 'SubMenu'
export default SubMenu