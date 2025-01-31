/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        circular: ['Circular Std', 'sans-serif'],
        circularBook: ['Circular Book', 'sans-serif']
      },
      colors: {
        white: {
          full: '#FFFFFF',
          100: '#FFFFFF10',
          200: '#FFFFFF20',
          300: '#FFFFFF30',
          400: '#FFFFFF40'
        },
        green: '#00FF5B',
        gray: '#1D1D1D'
      },
      fontSize: {
        xs: ['12px', '16px'],
        sm: ['14px', '20px'],
        base: ['16px', '24px'],
        lg: ['18px', '28px'],
        xl: ['20px', '28px'],
        '2xl': ['24px', '32px'],
        '3xl': ['30px', '36px'],
        '4xl': ['36px', '40px'],
        '5xl': ['38px', '42px'],
        '6xl': ['54px', '60px']
      },
      spacing: {
        px: '1px',
        0: '0px',
        1: '4px',
        2: '8px',
        3: '12px',
        4: '16px',
        5: '20px',
        6: '24px',
        7: '28px',
        8: '32px',
        10: '40px',
        11: '44px',
        12: '48px'
      },
      borderRadius: {
        none: '0',
        sm: '2px',
        base: '4px',
        md: '6px',
        lg: '8px',
        xl: '12px',
        '2xl': '16px',
        half: '50%',
        divider: '500px',
        full: '9999px'
      }
    }
  },
  plugins: []
}
