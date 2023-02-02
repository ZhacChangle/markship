import React, { useState } from 'react';
import logo from './logo.svg';
import './styles/index.scss';
import Button, { ButtonSize, ButtonType } from './components/Button/button';
import Menu, { MenuProps } from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import Icon from './components/Icon/icon';
import Transition from './components/Transition/transition';
library.add(fas)
function App() {
  const [show, setShow] = useState(false)
  return (
    <>
      <div className="App">
        <header className="App-header">

          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <Menu shrinkCurrentItem defaultOpenSubMenus={['3']} mode='horizontal' defaultIndex={'0'} onSelect={(index) => {
          console.log(index);
        }}>
          <MenuItem disabled >
            cool link
          </MenuItem>
          <MenuItem >
            cool link1
          </MenuItem>
          <MenuItem >
            cool link2
          </MenuItem>
          <SubMenu title='dropdown'>
            <MenuItem>dropdown 1</MenuItem>
            <MenuItem>dropdown 2</MenuItem>
            <MenuItem>dropdown 3</MenuItem>
          </SubMenu>
          <SubMenu title='dropdown1'>
            <MenuItem>dropdown1 1</MenuItem>
            <MenuItem>dropdown1 2</MenuItem>
            <MenuItem>dropdown1 3</MenuItem>
          </SubMenu>
        </Menu>

        {/* children 属性 可以使用 props 传入 也可以像下面这样传入 */}
        <Button className='custom' onClick={(e) => {
          e.preventDefault(); console.log(e.target);
          alert(123)
        }} >Hello</Button>
        <Button size={'lg'} onClick={() => { setShow(!show) }} >Toggle</Button>
        <Transition
          in={show}
          timeout={10000}
          animation='zoom-in-left'
        >
          <div>
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
          </div>
        </Transition>
        <Transition
          in={show}
          timeout={300}
          animation='zoom-in-left'
        >
          <Button>Hello</Button>
        </Transition>
      </div>

    </>
  );
}

export default App;
