import type { Preview } from '@storybook/react';
import { fn } from '@storybook/test';

const preview: Preview = {
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
    options: {
      storySort: {
        order: [
          'Example',
          [
            'Pie Chart',
            'Donut Chart',
            'Partial Chart',
            'Labels',
            '',
            '*',
            'Misc',
          ],
        ],
      },
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  // tags: ['autodocs'],
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
};

export default preview;
