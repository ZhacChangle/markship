import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { AutoComplete, AutoCompleteProps, DataSourceType } from './autoComplete'
interface LakerPlayerProps {
  value: string
  number: number
}
interface GithubUserProps {
  login: string
  url: string
  avatar_url: string
}
export default {
  title: 'AutoComplete',
  component: AutoComplete,
  id: 'AutoComplete',
  // Show code 显示代码块
  parameters: {
    docs: {
      source: {
        type: 'code'
      }
    }
  }
} as ComponentMeta<typeof AutoComplete>

export const SimpleComplete: ComponentStory<typeof AutoComplete> = (args) => {
  const lakers = ['bradley', 'pope', 'caruso', 'cook', 'cousins',
    'james', 'AD', 'green', 'howard', 'kuzma', 'McGee', 'rando']
  const handleFetch = (query: string) => {
    return lakers.filter(name => name.includes(query)).map(name => ({ value: name }))
  }
  return (
    <AutoComplete
      {...args}
      fetchSuggestions={handleFetch}
      placeholder='输入湖人队球员英文名试试'
    >
    </AutoComplete>
  )
}
SimpleComplete.storyName = 'SimpleComplete'

export const CustomComplete: ComponentStory<typeof AutoComplete> = (args) => {
  const lakersWithNumber = [
    { value: 'bradley', number: 11 },
    { value: 'pope', number: 1 },
    { value: 'caruso', number: 4 },
    { value: 'cook', number: 2 },
    { value: 'cousins', number: 15 },
    { value: 'james', number: 23 },
    { value: 'AD', number: 3 },
    { value: 'green', number: 14 },
    { value: 'howard', number: 39 },
    { value: 'kuzma', number: 0 },
  ]
  const handleFetch = (query: string) => {
    return lakersWithNumber.filter(player => player.value.includes(query))
  }
  const renderOption = (item: DataSourceType) => {
    const itemWithNumber = item as DataSourceType<LakerPlayerProps>
    return (
      <>
        <b>name:{itemWithNumber.value}</b>
        <span>number:{itemWithNumber.number}</span>
      </>
    )
  }
  return (
    <AutoComplete
      renderOption={renderOption}
      {...args}
      fetchSuggestions={handleFetch}
      placeholder='renderOption'
    ></AutoComplete>
  )
}
CustomComplete.storyName = 'CustomComplete'

export const AjaxComplete: ComponentStory<typeof AutoComplete> = (args: AutoCompleteProps) => {
  const handleFetch = (query: string) => {
    return fetch(`https://api.github.com/search/users?q=${query}`)
      .then(res => res.json())
      .then(({ items }) => {
        if (items)
          return items.slice(0, 10).map((item: any) => ({ value: item.login, ...item }))
      })
  }

  const renderOption = (item: DataSourceType) => {
    const itemWithGithub = item as DataSourceType<GithubUserProps>
    return (
      <>
        <b>Name:{itemWithGithub.value}</b>
        <span>url:{itemWithGithub.url}</span>
      </>
    )
  }

  return (
    <AutoComplete
      {...args}
      fetchSuggestions={handleFetch}
      placeholder='Github Name'
      renderOption={renderOption}
    ></AutoComplete>
  )
}
AjaxComplete.storyName = 'Async Search'