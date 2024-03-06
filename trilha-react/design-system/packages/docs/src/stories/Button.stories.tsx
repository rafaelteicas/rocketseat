import { Meta, StoryObj } from '@storybook/react'
import { Button, ButtonProps } from '@ignite-ui/react'

export default {
  title: 'Button',
  component: Button,
} as Meta<ButtonProps>

export const Primary: StoryObj = {
  args: {
    children: 'enviar',
  },
}

export const Secondary: StoryObj = {}

export const Big: StoryObj<ButtonProps> = {
  args: {
    size: 'big',
  },
}