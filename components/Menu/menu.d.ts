import React from 'react';
type MenuMode = 'horizontal' | 'vertical';
type SelectCallback = (selectedIndex: string, isOpened: boolean, displayName?: string) => void;
export interface MenuProps {
    defaultIndex?: string;
    className?: string;
    mode?: MenuMode;
    style?: React.CSSProperties;
    onSelect?: SelectCallback;
    children?: React.ReactNode;
    defaultOpenSubMenus?: string[];
    shrinkCurrentItem?: boolean;
}
interface IMenuContext {
    index: string;
    onSelect?: SelectCallback;
    mode?: MenuMode;
    defaultOpenSubMenus?: string[];
    subMenuItemIndex?: string;
    isOpened: boolean;
    clearDefaultOpenSubMenus: () => void;
    changeIsOpen: (isOpened: boolean) => void;
    shrinkCurrentItem?: boolean;
}
export declare const MenuContext: React.Context<IMenuContext>;
export declare const Menu: React.FC<MenuProps>;
export default Menu;
