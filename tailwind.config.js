/** @type {import('tailwindcss').Config} */


const flowbite = require("flowbite-react/tailwind");


module.exports = ({
  content: ["./src/**/*.{html,js,jsx}", flowbite.content()],
  theme: {
    fontFamily: {
      Roboto: ["Roboto", "sans-serif"],
      Poppins: ['Poppins', "sans-serif"],
    },
    extend: {
      screens: {
        "1000px": "1050px",
        "1100px": "1110px",
        "800px": "800px",
        "1300px": "1300px",
        "400px":"400px",
        "730px" : "730px",
        "xs" : "475px",
        "200px" : "200px"
      },
    },
  },
  plugins: [
    flowbite.plugin()
  ],
})

