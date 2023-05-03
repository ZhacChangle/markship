var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { useContext } from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu';
import Icon from '../Icon/icon';
import { CSSTransition } from 'react-transition-group';
var SubMenu = function (_a) {
    var index = _a.index, title = _a.title, children = _a.children, className = _a.className;
    var context = useContext(MenuContext);
    var isOpened = context.isOpened;
    if (context.defaultOpenSubMenus) {
        isOpened = (index && context.mode === 'vertical') ? context.defaultOpenSubMenus.includes(index) : isOpened;
        // warning: Cannot update a component (`Menu`) while rendering a different component (`SubMenu`). 
        // setTimeout：解决 warning
        setTimeout(function () {
            context.changeIsOpen(isOpened);
        });
    }
    var classes = classNames('menu-item submenu-item', className, {
        'is-active': context.index === index,
        'is-opened': isOpened,
        'is-vertical': context.mode === 'vertical'
    });
    var handleClick = function (e) {
        var targetTagName = e.target.tagName;
        e.preventDefault();
        if (context.onSelect && index) {
            context.clearDefaultOpenSubMenus();
            if (targetTagName === 'LI') {
                context.onSelect(index, isOpened);
            }
            else {
                context.onSelect(index, !isOpened, SubMenu.displayName);
            }
        }
    };
    var timer;
    var handleMouse = function (e, toggle) {
        clearTimeout(timer);
        e.preventDefault();
        timer = setTimeout(function () {
            context.changeIsOpen(toggle);
        }, 300);
    };
    var clickEvents = context.mode === 'vertical' ? {
        onClick: handleClick
    } : {};
    var hoverEvents = context.mode !== 'vertical' ? {
        onMouseEnter: function (e) { handleMouse(e, true); },
        onMouseLeave: function (e) { handleMouse(e, false); }
    } : {};
    var renderChildren = function () {
        var subMenuClasses = classNames('mark-submenu', {
            'menu-opened': isOpened
        });
        var childrenComponent = React.Children.map(children, function (child, i) {
            var childElement = child;
            if (childElement.type.displayName === 'MenuItem') {
                return React.cloneElement(childElement, {
                    index: "".concat(index, "-").concat(i)
                });
            }
            else {
                console.error('Warning：SubMenu has a child which is not a MenuItem component');
            }
        });
        return (
        // in 表示什么时候添加这个 classNames 即 isOpened 为 true 的时候添加
        // 多少秒后 enter-done 即动画彻底结束
        // appear 表示 subMenu 默认展开的时候也有动画
        // unmountOnExit 将 ul 动态添加 动态移除
        React.createElement(CSSTransition, { in: isOpened, timeout: 300, classNames: 'zoom-in-top', appear: true, unmountOnExit: true },
            React.createElement("ul", { className: subMenuClasses }, childrenComponent)));
    };
    return (React.createElement("li", __assign({ key: index, className: classes }, hoverEvents, clickEvents),
        React.createElement("div", { className: 'submenu-title' },
            title,
            React.createElement(Icon, { icon: 'angle-down', className: 'arrow-icon' })),
        renderChildren()));
};
SubMenu.displayName = 'SubMenu';
export default SubMenu;
