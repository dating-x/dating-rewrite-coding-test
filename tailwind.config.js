/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';

module.exports = {
    content: [
        './src/**/*.vue',
    ],

    darkMode: 'class',

    theme: {
        screens: {
            '2xsm': '320px',
            sm: '414px',
            md: '767px',
            lg: '1199px',
            '2xlg': '1440px',
            retina: '1441px',
        },
        extend: {
            fontFamily: {
                sans: ['Montserrat', 'SegoeUI', 'Helvetica Neue', 'Arial', 'sans-serif'],
                'sans-serif': ['sans-serif'],
            },
            fontSize: {
                '6xs': '8px',
                '5xs': '9px',
                '4xs': '10px',
                '3xs': '11px',
                '2xs': '12px',
                'xs': '13px',
                'xsm': '14px',
                'sm': [
                    '15px',
                    {
                        lineHeight: '1.4rem',
                    },
                ],
                'base': '16px',
                'md': '17px',
                'xmd': '18px',
                '2md': '19px',
                'xl': '20px',
                '2xl': '21px',
                '3xl': '22px',
                '4xl': '23px',
                '5xl': '25px',
                '6xl': '26px',
                '7xl': '27px',
                '8xl': '28px',
                '9xl': '29px',
                '10xl': '30px',
                '11xl': '31px',
                '12xl': '32px',
                '13xl': '33px',
                '14xl': '34px',
                '15xl': '35px',
                '16xl': '36px',
                '17xl': '37px',
                '18xl': '38px',
                '19xl': '39px',
                '20xl': '40px',
            },
            screens: {
                'tall-vh': {
                    raw: '(min-height: 1301px)',
                },
            },
            lineHeight: {
                default: 'normal',
                'extra-tight': 1.1,
                'extra-relaxed': 1.7,
                'semi-loose': 1.8
            },
            colors: {
                'black/50': 'rgba(0, 0, 0, 0.5)',
                'default': '#D93C61',
                'primary': '#ff4b77',
                'secondary': '#333334',
                'success': '#01b701',
                'danger': '#ec0015',
                'info': '#4285f4',
                'light': '#cac9e1',
                'dark': '#4c4c4c',
                'submit': '#3dba19',
            },
            backgroundImage: {
                'poly-pattern': 'url("@images/bg-poly.png")',
            },
            spacing: {
                '1.25': '5px',
                '2.75': '11px',
                '3.75': '15px',
                '4.5': '18px',
                '6.25': '25px',
                '7.5': '30px',
                '9.5': '38px',
                '13': '50px',
            }
        },
        listStyleType: {
            none: 'none',
            disc: 'disc',
            decimal: 'decimal',
            circle: 'circle',
        },
    },

    plugins: [typography],
};
