import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'


import Select from './index'
export default {
  title: 'Select',
  component: Select,
  id: 'Select',
  subcomponents: { 'Option': Select.Option },
  decorators: [
    (Story) => (
      <div style={{ width: '350px' }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof Select>

export const ADefaultSelect: ComponentStory<typeof Select> = (args) => (
  <Select
    {...args}
    placeholder="请选择"
  >
    <Select.Option value="nihao" />
    <Select.Option value="nihao2" />
    <Select.Option value="nihao3" />
    <Select.Option value="disabled" disabled />
    <Select.Option value="nihao5" />
  </Select>
)
ADefaultSelect.storyName = 'Default Select'
export const BMultipleSelect: ComponentStory<typeof Select> = (args) => (
  <Select
    {...args}
    placeholder="支持多选欧！"
    multiple
  >
    <Select.Option value="nihao" />
    <Select.Option value="nihao2" />
    <Select.Option value="nihao3" />
    <Select.Option value="mark" />
    <Select.Option value="viking2" />
  </Select>
)
BMultipleSelect.storyName = 'Multiple Select'
export const CDisabledSelect: ComponentStory<typeof Select> = (args) => (
  <Select
    {...args}
    placeholder="禁用啦！"
    disabled
  >
    <Select.Option value="nihao" />
    <Select.Option value="nihao2" />
    <Select.Option value="nihao3" />
  </Select>
)
CDisabledSelect.storyName = 'Disabled Select'