import { Meta, StoryObj } from '@storybook/react'
import { Box } from '@ignite-ui/react'

export default {
  title: 'Button',
  component: Box,
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
