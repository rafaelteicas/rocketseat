import { StoryObj, Meta } from '@storybook/react'
import { Button, ButtonProps } from '@rafaelteicas-ignite-ui/react'

export default {
  title: 'Form/Button',
  component: Button,
  args: {
    children: 'Enviar',
    variant: 'primary',
    disabled: false,
    size: 'md',
  },
  argTypes: {
    variant: {
      options: ['primary', 'secondary', 'tertiary'],
      control: {
        type: 'inline-radio',
      },
    },
    size: {
      options: ['sm', 'md'],
      control: {
        type: 'inline-radio',
      },
    },
    disabled: {
      control: {
        type: 'boolean',
      },
    },
    onClick: {
      action: 'click',
    },
  },
} as Meta<ButtonProps>

export const Primary: StoryObj = {}

export const Secondary: StoryObj = {
  args: {
    variant: 'secondary',
  },
}

export const Tertiary: StoryObj = {
  args: {
    variant: 'tertiary',
  },
}

export const Small: StoryObj = {
  args: {
    size: 'sm',
  },
}

export const Disabled: StoryObj = {
  args: {
    disabled: true,
  },
}
