import { StoryObj, Meta } from '@storybook/react'
import { MultiStep, MultiStepProps } from '@rafaelteicas-ignite-ui/react'

export default {
  title: 'Form/MultiStep',
  component: MultiStep,
  args: {
    size: 4,
    currentStep: 1,
  },
} as Meta<MultiStepProps>

export const Primary: StoryObj<MultiStepProps> = {}

export const Full: StoryObj = {
  args: {
    currentStep: 4,
  },
}
