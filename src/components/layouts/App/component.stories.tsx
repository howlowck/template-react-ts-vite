/* eslint-disable @typescript-eslint/no-explicit-any */

import { Provider } from 'react-redux'
import App from './index'
import store from '../../../redux/store'
import { ComponentStory, ComponentMeta } from '@storybook/react'

export default {
  component: App,
  title: 'App',
  decorators: [(story: any) => <Provider store={store}>{story()}</Provider>],
} as ComponentMeta<typeof App>

const Template: ComponentStory<typeof App> = args => <App {...args} />

export const Main = Template.bind({})
