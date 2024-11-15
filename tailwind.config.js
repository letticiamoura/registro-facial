/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.tsx",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'blue': '#012E40',
        'yellow': '#F28705',
        'ligth-blue': '#025159',
        'green': '#03A696'
      },
      textColor: {
        'blue': '#012E40',
        'yellow': '#F28705'
      },
      ringColor: {
        'blue': '#012E40',
        'yellow': '#F28705',
        'ligth-blue': '#025159',
        'green': '#03A696'
      },
      boxShadowColor: {
        'blue': '#012E40',
        'yellow': '#F28705',
        'ligth-blue': '#025159',
        'green': '#03A696'
      },
      borderColor: {
        'blue': '#012E40',
        'yellow': '#F28705',
        'ligth-blue': '#025159',
        'green': '#03A696'
      }
    },
  },
  plugins: [],
}

