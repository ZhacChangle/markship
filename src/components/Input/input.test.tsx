import React from 'react';
import { render, fireEvent, screen, getByRole } from '@testing-library/react';

import { Input, InputProps } from './input'
import { findRenderedComponentWithType } from 'react-dom/test-utils';

const defaultProps: InputProps = {
  onChange: jest.fn(),
  placeholder: 'test-input'
}

describe('test Input component', () => {
  it('it should render the correct default Input', () => {
    render(<Input {...defaultProps}></Input>)
    const testNode = screen.getByPlaceholderText('test-input') as HTMLInputElement
    expect(testNode).toBeInTheDocument()
    expect(testNode).toHaveClass('mark-input-inner')
    fireEvent.change(testNode, { target: { value: '23' } })
    expect(defaultProps.onChange).toHaveBeenCalled()
    expect(testNode.value).toEqual('23')
  })
  it('should render the disabled Input on disabled property', () => {
    render(<Input placeholder='disabled' disabled></Input>)
    const testNode = screen.getByPlaceholderText('disabled') as HTMLInputElement
    expect(testNode.disabled).toBeTruthy()
  })
  it('should render different input sizes on size property', () => {
    const view = render(<Input placeholder='sizes' size='lg'></Input>)
    const testContainer = view.container.querySelector('.mark-input-wrapper')
    expect(testContainer).toHaveClass('input-size-lg')
  })
  it('should render prepand and append element on prepand/append property', () => {
    const { queryByText, container } = render(<Input placeholder='pend' prepend='https://' append='.com' ></Input>)
    const testContainer = container.querySelector('.mark-input-wrapper')
    expect(testContainer).toHaveClass('input-group input-group-append input-group-prepend')
    expect(queryByText('https://')).toBeInTheDocument()
    expect(queryByText('.com')).toBeInTheDocument()
  })
})