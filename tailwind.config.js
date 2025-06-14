/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
  extend: {
    fontSize: {
      base: '18px', // Subimos el tamaño base de fuente
    },
    maxWidth: {
      'content': '1440px', // Más ancho para el contenedor central
    },
  },
},
  plugins: [],
};
