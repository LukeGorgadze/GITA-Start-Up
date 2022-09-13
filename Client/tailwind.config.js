/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,tsx}'],
  theme: {
    colors: {
      'black': '#000000',
      'blue': '#1fb6ff',
      'purple': '#7e5bef',
      'pink': '#ff49db',
      'orange': '#ff7849',
      'green': '#13ce66',
      'yellow': '#f9ca24',
      'gray-dark': '#273444',
      'gray': '#576574',
      'gray-light': '#d3dce6',
      'white': '#ffff',
      'white-trans': 'rgba(0,0,0,0.5)',
      'yellow-light': '#ffeaa7',
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
      raleway : ['Raleway', 'sans-serif'],
      montserrat : ['Montserrat Alternates', 'sans-serif']
    },
    extend: {
      spacing: {
        '8xl': '96rem',
        '9xl': '128rem',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    }
  },
}