/* eslint-disable @typescript-eslint/no-explicit-any */
import IdPicker from './index'
import { Provider } from 'react-redux'
import store from '../../../redux/store'
import { pause } from '../../../helpers/story'
import { expect } from '@storybook/jest'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { within, userEvent } from '@storybook/testing-library'

export default {
  title: 'IdPicker',
  component: IdPicker,
  decorators: [(story: any) => <Provider store={store}>{story()}</Provider>],
} as ComponentMeta<typeof IdPicker>

const Template: ComponentStory<typeof IdPicker> = args => <IdPicker {...args} />

export const CanChangeIdWithButtons = Template.bind({})

CanChangeIdWithButtons.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const input: HTMLInputElement = canvas.getByTitle('id-input')
  const initialValue = parseInt(input.value, 10)
  await pause(100)
  await userEvent.click(canvas.getByText('+'))
  await expect(input.value).toEqual(`${initialValue + 1}`)
  await pause(100)
  await userEvent.click(canvas.getByText('-'))
  await expect(input.value).toEqual(`${initialValue}`)
}
