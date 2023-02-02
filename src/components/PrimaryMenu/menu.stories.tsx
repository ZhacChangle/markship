import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Menu from './index'
import { number } from 'prop-types';

export default {
  title: 'Menu',
  component: Menu,
  subcomponent: { 'SubMenu': Menu.SubMenu, 'Item': Menu.Item },
  argTypes: {
    defaultOpenSubMenus: {
      control: 'object'
    }
  }
} as ComponentMeta<typeof Menu>

const Template: ComponentStory<typeof Menu> = (args) => {
  return (
    <Menu  {...args} >
      <Menu.Item>
        cool link
      </Menu.Item>
      <Menu.Item>
        cool link 2
      </Menu.Item>
      <Menu.Item disabled>
        disabled
      </Menu.Item>
      <Menu.SubMenu title="下拉选项">
        <Menu.Item>
          下拉选项一
        </Menu.Item>
        <Menu.Item>
          下拉选项二
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  )
}

export const DefaultMenu = Template.bind({})
DefaultMenu.args = {
  defaultIndex: '0'
}

export const VerticalMenu = Template.bind({})
VerticalMenu.args = {
  defaultIndex: '0',
  mode: 'vertical'
}

export const OpenedMenu = Template.bind({})
OpenedMenu.args = {
  defaultIndex: '0',
  defaultOpenSubMenus: ['2']
}