import React, { createContext, useState } from 'react';
import classNames from 'classnames';
export var MenuContext = createContext({ index: '0', isOpened: false, clearDefaultOpenSubMenus: function () { return; }, changeIsOpen: function () { return; } });
export var Menu = function (props) {
    var defaultIndex = props.defaultIndex, className = props.className, children = props.children, mode = props.mode, style = props.style, onSelect = props.onSelect, shrinkCurrentItem = props.shrinkCurrentItem;
    var defaultOpenSubMenus = props.defaultOpenSubMenus;
    var _a = useState(defaultIndex), currentActive = _a[0], setActive = _a[1];
    var _b = useState(''), subMenuItemActive = _b[0], setSubMenuItemActive = _b[1];
    var _c = useState(false), isOpened = _c[0], setIsOpened = _c[1];
    var _d = useState(defaultOpenSubMenus), defaultOpenSubMenusT = _d[0], setDefaultOpenSubMenusT = _d[1];
    var classes = classNames('mark-menu', className, {
        'menu-vertical': mode === 'vertical',
        'menu-horizontal': mode !== 'vertical'
    });
    var handleClick = function (index, OpenFlag, displayName) {
        // setActive 之后当前组件及其子组件全部更新 即代码全部重新执行
        if (index.indexOf('-') !== -1) {
            setSubMenuItemActive(index);
            if (shrinkCurrentItem) {
                OpenFlag = !OpenFlag;
                setIsOpened(OpenFlag);
            }
        }
        else {
            if (shrinkCurrentItem || displayName === 'SubMenu') {
                setIsOpened(OpenFlag);
            }
            setActive(index);
        }
        if (onSelect) {
            onSelect(index, OpenFlag);
        }
    };
    var clearDefaultOpenSubMenus = function () {
        setDefaultOpenSubMenusT(undefined);
    };
    var changeIsOpen = function (isOpenedFlag) {
        // passedContext.isOpened = isOpened
        // console.log(isOpened);
        setIsOpened(isOpenedFlag);
    };
    var passedContext = {
        index: currentActive ? currentActive : '0',
        onSelect: handleClick,
        mode: mode,
        defaultOpenSubMenus: defaultOpenSubMenusT,
        subMenuItemIndex: subMenuItemActive,
        isOpened: isOpened,
        clearDefaultOpenSubMenus: clearDefaultOpenSubMenus,
        changeIsOpen: changeIsOpen,
        shrinkCurrentItem: shrinkCurrentItem
    };
    var renderChildren = function () {
        return React.Children.map(children, function (child, index) {
            var childElement = child;
            var displayName = childElement.type.displayName;
            if (displayName === 'MenuItem' || displayName === 'SubMenu') {
                return React.cloneElement(childElement, {
                    index: index.toString()
                });
            }
            else {
                console.error('Warning:Menu has a child which is not a MenuItem component ');
            }
        });
    };
    return (React.createElement("ul", { className: classes, style: style, "data-testid": 'test-menu' },
        React.createElement(MenuContext.Provider, { value: passedContext }, renderChildren())));
};
Menu.defaultProps = {
    defaultIndex: "0",
    mode: 'horizontal',
    defaultOpenSubMenus: [],
    shrinkCurrentItem: false
};
export default Menu;
