import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Button, { ButtonProps, ButtonSize, ButtonType } from './button';
const defaultProps = {
  onClick: jest.fn()
}

const testProps: ButtonProps = {
  btnType: 'primary',
  size: 'lg',
  className: 'klass'
}

const disabledProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn()
}
const linkProps: ButtonProps = {
  btnType: 'link',
  href: 'www'
}
describe('test Button component', () => {
  it('should render correct default button', () => {
    const view = render(<Button {...defaultProps}>Nice</Button>)
    const element = screen.getByText('Nice') as HTMLButtonElement
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('BUTTON')
    expect(element).toHaveClass('btn btn-default')
    expect(element.disabled).toBeFalsy()
    fireEvent.click(element)
    expect(defaultProps.onClick).toHaveBeenCalled()
  })
  it('should render the correct component based on different props', () => {
    render(<Button {...testProps}>Button Props</Button>)
    const element = screen.getByText('Button Props') as HTMLButtonElement
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('BUTTON')
    expect(element).toHaveClass('btn-primary btn-lg klass')
  })
  it('should render disabled button when disabled set to true', () => {
    render(<Button {...disabledProps}>Disabled Button</Button>)
    const element = screen.getByText('Disabled Button') as HTMLButtonElement
    expect(element).toBeInTheDocument()
    expect(element.disabled).toBeTruthy()
    fireEvent.click(element)
    expect(disabledProps.onClick).not.toHaveBeenCalled()

  })
  it('should render a link when btnType equals link and href is provided', () => {
    render(<Button {...linkProps} >Link</Button >)
    const element = screen.getByText('Link')
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('A')
    expect(element).toHaveClass('btn btn-link')

  })
})