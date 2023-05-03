import React, { useContext } from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu';
var MenuItem = function (props) {
    var index = props.index, disabled = props.disabled, children = props.children, className = props.className, style = props.style;
    var context = useContext(MenuContext);
    var classes = classNames('menu-item', className, {
        'is-disabled': disabled,
        // context.subMenuItemIndex === index：当 subMenu shrink 再 open subMenuItem 会保持原有的 active 的状态
        'is-active': (context.index === index || context.subMenuItemIndex === index) && disabled !== true
    });
    var handleClick = function (e) {
        if (context.onSelect && !disabled && (typeof index === 'string')) {
            context.onSelect(index, false);
            context.clearDefaultOpenSubMenus();
        }
    };
    return (React.createElement("li", { className: classes, style: style, onClick: handleClick }, children));
};
MenuItem.displayName = 'MenuItem';
export default MenuItem;
