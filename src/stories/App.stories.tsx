import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import HomePage from "../pages/index";

export default {
  title: "Pages/Home",
  component: HomePage,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof HomePage>;

const Template: ComponentStory<typeof HomePage> = (args) => (
  <HomePage {...args} />
);

export const Default = Template.bind({});
Default.args = {
  user: {
    name: "Jane Doe",
  },
};

// export const LoggedIn = Template.bind({});
// LoggedIn.args = {
//   user: {
//     name: "Jane Doe",
//   },
// };

// export const LoggedOut = Template.bind({});
// LoggedOut.args = {};
