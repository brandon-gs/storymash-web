/**
 * For reference about how to config this file check
 * {@link https://storybook.js.org/blog/get-started-with-storybook-and-next-js/ Storybook}
 */

import * as NextImage from "next/image";
import "../src/styles/globals.css";

const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, "default", {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
});

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
