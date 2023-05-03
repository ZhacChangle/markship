import React, { useState } from 'react';
import './styles/index.scss';
import Button from './components/Button/button';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import Transition from './components/Transition/transition';
library.add(fas);
function App() {
    var _a = useState(false), show = _a[0], setShow = _a[1];
    return (React.createElement(React.Fragment, null,
        React.createElement(Button, null),
        React.createElement("div", { className: "App" },
            React.createElement("header", { className: "App-header" },
                React.createElement("a", { className: "App-link", href: "https://reactjs.org", target: "_blank", rel: "noopener noreferrer" }, "Learn React")),
            React.createElement(Menu, { shrinkCurrentItem: true, defaultOpenSubMenus: ['3'], mode: 'horizontal', defaultIndex: '0', onSelect: function (index) {
                    console.log(index);
                } },
                React.createElement(MenuItem, { disabled: true }, "cool link"),
                React.createElement(MenuItem, null, "cool link1"),
                React.createElement(MenuItem, null, "cool link2"),
                React.createElement(SubMenu, { title: 'dropdown' },
                    React.createElement(MenuItem, null, "dropdown 1"),
                    React.createElement(MenuItem, null, "dropdown 2"),
                    React.createElement(MenuItem, null, "dropdown 3")),
                React.createElement(SubMenu, { title: 'dropdown1' },
                    React.createElement(MenuItem, null, "dropdown1 1"),
                    React.createElement(MenuItem, null, "dropdown1 2"),
                    React.createElement(MenuItem, null, "dropdown1 3"))),
            React.createElement(Button, { className: 'custom', onClick: function (e) {
                    e.preventDefault();
                    console.log(e.target);
                    alert(123);
                } }, "Hello"),
            React.createElement(Button, { size: 'lg', onClick: function () { setShow(!show); } }, "Toggle"),
            React.createElement(Transition, { in: show, timeout: 10000, animation: 'zoom-in-left' },
                React.createElement("div", null,
                    React.createElement("p", null,
                        "Edit ",
                        React.createElement("code", null, "src/App.tsx"),
                        " and save to reload."),
                    React.createElement("p", null,
                        "Edit ",
                        React.createElement("code", null, "src/App.tsx"),
                        " and save to reload."),
                    React.createElement("p", null,
                        "Edit ",
                        React.createElement("code", null, "src/App.tsx"),
                        " and save to reload."),
                    React.createElement("p", null,
                        "Edit ",
                        React.createElement("code", null, "src/App.tsx"),
                        " and save to reload."),
                    React.createElement("p", null,
                        "Edit ",
                        React.createElement("code", null, "src/App.tsx"),
                        " and save to reload."))),
            React.createElement(Transition, { in: show, timeout: 300, animation: 'zoom-in-left' },
                React.createElement(Button, null, "Hello")))));
}
export default App;
