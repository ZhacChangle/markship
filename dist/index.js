import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
// 发布到 npm 上时将其注释掉
// import './styles/index.scss'
library.add(fas);
export { default as Button } from './components/Button';
export { default as Menu } from './components/PrimaryMenu';
export { default as AutoComplete } from './components/AutoComplete';
export { default as Icon } from './components/Icon';
export { default as Input } from './components/Input';
export { default as Progress } from './components/Progress';
export { default as Transition } from './components/Transition';
export { default as Upload } from './components/Upload';
export { default as Form } from './components/Form';
