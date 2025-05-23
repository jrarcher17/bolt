import dedent from "dedent";

export default {
  SUGGSTIONS: ['Create a portfolio website', 'Create a note taking app', 'Create an expense tracker app'],
  HERO_HEADING: 'What do you want to build?',
  HERO_DESC: 'Prompt, run, edit, and deploy full-stack web apps.',
  INPUT_PLACEHOLDER: 'How can we help you today?',
  SIGNIN_HEADING: 'Continue With AI Code Editor',
  SIGNIN_SUBHEADING: 'To use AI Code Editor you must log into an existing account or create one.',
  SIGNIn_AGREEMENT_TEXT: 'By using AI Code Editor, you agree to the collection of usage data for analytics.',


  DEFAULT_FILE: {
    '/public/index.html': {
      code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`
    },
    '/App.css': {
      code: `
            @tailwind base;
@tailwind components;
@tailwind utilities;`
    },
    '/tailwind.config.js': {
      code: `
            /** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`
    },
    '/postcss.config.js': {
      code: `/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
  },
};

export default config;
`
    }
  },
  DEPENDANCY: {

    "postcss": "^8",
    "tailwindcss": "^3.4.1",
    autoprefixer: "^10.0.0",
    "uuid4": "^2.0.3",
    "tailwind-merge": "^2.4.0",
    "tailwindcss-animate": "^1.0.7",
    "lucide-react": "^0.469.0",
    "react-router-dom": "^7.1.1",
    "firebase": "^11.1.0",
    "@google/generative-ai": "^0.21.0",
    "date-fns": "^4.1.0",
    "react-chartjs-2": "^5.3.0",
    "chart.js": "^4.4.7",
  },
  PRICING_DESC:'Start with a free account to speed up your workflow on public projects or boost your entire team with instantly-opening production environments.',
  PRICING_OPTIONS:[
    {
      name:'Pro',
      tokens:'50K',
      value:50000,
      desc:'Ideal for hobbyists and casual users for light, exploratory use.',
      price:5.00
    },
    {
      name:'Pro 10',
      tokens:'120K',
      value:120000,
      desc:'Designed for professionals who need to use AI Code Editor a few times per week.',
      price:10.00
    },
    {
      name:'Pro 20',
      tokens:'2.5M',
      value:2500000,
      desc:'Designed for professionals who need to use AI Code Editor a few times per week.',
      price:20.00
    },
    {
      name:'Pro 50',
      tokens:'10M',
      value:1000000,
      desc:'Designed for professionals who need to use AI Code Editor a few times per week.',
      price:50.00
    }
  ]


}