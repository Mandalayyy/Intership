const REM_BASE = 10
const round = (num) =>
  num
    .toFixed(7)
    .replace(/(\.[0-9]+?)0+$/, '$1')
    .replace(/\.0$/, '')
const rem = (px, base = REM_BASE) => `${round(px / base)}rem`
const stripUnit = (value) => parseInt(value, 10)
const media = (resolution, mobileFirst = true) => {
  if (mobileFirst) {
    return `@media (min-width: ${stripUnit(resolution)}px)`
  }

  return `@media (max-width: ${stripUnit(resolution) - 1}px)`
}

function fluidType(minFontSize, maxFontSize, minVW = 375, maxVW = 1440) {
  const minFontRem = minFontSize / REM_BASE
  const maxFontRem = maxFontSize / REM_BASE
  const minVWRem = minVW / REM_BASE
  const maxVWRem = maxVW / REM_BASE

  const multiplier = (maxFontRem - minFontRem) / (maxVWRem - minVWRem)

  return {
    fontSize: `calc(${minFontRem}rem + ${multiplier} * (100vw - ${minVWRem}rem))`,
    [media(maxVW)]: {
      fontSize: `${maxFontRem}rem`,
    },
  }
}

function transition(
  properties,
  duration = '0.35s',
  easing = 'cubic-bezier(0.77, 0, 0.18, 1)',
) {
  return properties.map((prop) => `${prop} ${duration} ${easing}`).join(', ')
}

function hexToRgba(hex, alpha) {
  if (!hex) return hex
  hex = hex.replace(/^#/, '')

  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((char) => char + char)
      .join('')
  }

  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)

  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

const extraSizes = {
  '1/2': '50%',
  '1/3': '33.333333%',
  '2/3': '66.666667%',
  '1/4': '25%',
  '2/4': '50%',
  '3/4': '75%',
  '1/5': '20%',
  '2/5': '40%',
  '3/5': '60%',
  '4/5': '80%',
  '1/6': '16.666667%',
  '2/6': '33.333333%',
  '3/6': '50%',
  '4/6': '66.666667%',
  '5/6': '83.333333%',
  '1/12': '8.333333%',
  '2/12': '16.666667%',
  '3/12': '25%',
  '4/12': '33.333333%',
  '5/12': '41.666667%',
  '6/12': '50%',
  '7/12': '58.333333%',
  '8/12': '66.666667%',
  '9/12': '75%',
  '10/12': '83.333333%',
  '15/12': '125%',
  '1/10': '10%',
  '2/10': '20%',
  '3/10': '30%',
  '4/10': '40%',
  '5/10': '50%',
  '6/10': '60%',
  '7/10': '70%',
  '8/10': '80%',
  '9/10': '90%',
}

const SPACING = {
  full: '100%',
  0: 0,
  1: '1px',
  2: '2px',
  3: '3px',
  4: rem(4),
  5: rem(5),
  6: rem(6),
  7: rem(7),
  8: rem(8),
  9: rem(9),
  10: rem(10),
  11: rem(11),
  12: rem(12),
  13: rem(13),
  14: rem(14),
  15: rem(15),
  16: rem(16),
  18: rem(18),
  20: rem(20),
  24: rem(24),
  25: rem(25),
  26: rem(26),
  28: rem(28),
  30: rem(30),
  31: rem(31),
  32: rem(32),
  39: rem(39),
  35: rem(35),
  40: rem(40),
  41: rem(41),
  45: rem(45),
  48: rem(48),
  50: rem(50),
  55: rem(55),
  60: rem(60),
  64: rem(64),
  65: rem(65),
  70: rem(70),
  75: rem(75),
  80: rem(80),
  85: rem(85),
  90: rem(90),
  95: rem(95),
  100: rem(100),
  110: rem(110),
  115: rem(115),
  120: rem(120),
  130: rem(130),
  140: rem(140),
  145: rem(145),
  150: rem(150),
  155: rem(155),
  160: rem(160),
  165: rem(165),
  170: rem(170),
  180: rem(180),
  190: rem(190),
  200: rem(200),
  210: rem(210),
  220: rem(220),
  230: rem(230),
  240: rem(240),
  250: rem(250),
  260: rem(260),
  280: rem(280),
  300: rem(300),
  350: rem(350),
  400: rem(400),
  440: rem(440),
  500: rem(500),
  600: rem(600),
  640: rem(640),
  700: rem(700),
  800: rem(800),
  900: rem(900),
  1000: rem(1000),
  header: 'var(--header-h)',
  available: 'calc(100svh - var(--header-h))',
}

const OPACITY = {
  0: '0',
  10: '0.1',
  20: '0.2',
  30: '0.3',
  40: '0.4',
  50: '0.5',
  60: '0.6',
  70: '0.7',
  80: '0.8',
  90: '0.9',
  100: '1',
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  important: false,
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      screens: {},
    },
    extend: {
      opacity: OPACITY,
      borderOpacity: OPACITY,
      height: (theme, { breakpoints }) => ({
        ...breakpoints(theme('screens')),
        ...SPACING,
        ...extraSizes,
        screen: '100svh',
      }),
      minHeight: (theme, { breakpoints }) => ({
        ...breakpoints(theme('screens')),
        ...SPACING,
        ...extraSizes,
        screen: '100svh',
      }),
      minWidth: (theme, { breakpoints }) => ({
        ...breakpoints(theme('screens')),
        ...SPACING,
        ...extraSizes,
      }),
      maxWidth: (theme, { breakpoints }) => ({
        ...breakpoints(theme('screens')),
        ...SPACING,
        ...extraSizes,
      }),
      spacing: {
        ...SPACING,
        ...extraSizes,
      },
      inset: (theme) => ({
        ...SPACING,
        ...extraSizes,
        ...theme('spacing'),
        ...theme('width'),
      }),
      transitionTimingFunction: {
        linear: 'linear',
        in: 'cubic-bezier(0.25,0.46,0.45,0.94)',
        out: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
        'in-out': 'cubic-bezier(0.65,0.05,0.36,1);',
        back: 'cubic-bezier(0.68,-0.55,0.27,1.55)',
      },
      transitionDelay: {
        0: '0ms',
      },
      zIndex: {
        n1: '-1',
        n2: '-2',
        n3: '-3',
        n4: '-4',
        n5: '-5',
        1: '1',
        2: '2',
        3: '3',
        4: '4',
        5: '5',
      },
      aspectRatio: {
        none: 0,
        square: '1/1',
        '16/9': '16/9',
        '4/3': '4/3',
        '21/9': '21/9',
      },
      scale: {
        ...OPACITY,
      },
      borderColor: ({ theme }) => ({
        ...theme('colors'),
        DEFAULT: theme('currentColor'),
      }),
      borderWidth: {
        DEFAULT: '0.1rem',
        0: '0',
        2: '0.2rem',
        4: '0.4rem',
        8: '0.8rem',
      },
      screens: {
        xs: '375px',
        sm: '410px',
        md: '768px',
        lg: '1024px',
        laptop: '1280px',
        xl: '1366px',
        '2xl': '1440px',
        '3xl': '1650px',
        fhd: '1920px',
        'h-min': { raw: '(max-height: 725px) and (min-width: 1280px)' },
        land: { raw: '(orientation: landscape) and (max-width: 1023px)' },
      },
      fontFamily: {
        primary: ['var(--font-primary)'],
        secondary: ['var(--font-secondary)'],
      },
      fontSize: {
        xxs: rem(10),
        xs: rem(12),
        sm: rem(14),
        base: rem(15),
        md: rem(20),
        lg: rem(24),
        xl: rem(32),
        '5xl': rem(50),
        '6xl': rem(60),
        '7xl': rem(70),
      },
      lineHeight: {
        xs: '0.8',
        none: '1',
        tight: '1.1',
        small: '1.2',
        base: '1.3',
        relaxed: '1.4',
        loose: '1.5',
        high: '1.7',
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter: '-0.02em',
        tight: '-0.01em',
        normal: '0',
        high: '0.01em',
        higher: '0.02em',
        highest: '0.04em',
      },
      borderRadius: {
        none: '0',
        xs: '0.4rem',
        sm: '0.5rem',
        DEFAULT: '1rem',
        md: '1.2rem',
        lg: '1.5rem',
        xl: '2rem',
        '2xl': '3rem',
        full: '9999px',
        circle: '50%',
      },
      colors: {
        white: '#ffffff',
        blue: {
          900: '#151C40',
          DEFAULT: '#232C5B',
        },
        red: '#F74117',
        gray: {
          100: '#E8E9F5',
          200: '#f2f2f2',
          300: ' #F3F4F7',
          800: '#2C2D32',
          900: '#151619',
          DEFAULT: '#696A6F',
        },
        black: {
          ...Object.keys(OPACITY).reduce(
            (acc, key) => ({
              ...acc,
              [`${key}0`]: `rgba(0,0,0, ${OPACITY[key]})`,
            }),
            {},
          ),
          DEFAULT: '#000',
        },
      },
      backgroundImage: {
        'gradient-purple-radial':
          'radial-gradient(45% 45% at 50% 50%, #dbcfeb 0%, #b39eca 100%)',
        'gradient-pink': 'linear-gradient(to top, #DDBEF0 , #ACA5F2 )',
        'gradient-preloader-purple':
          'linear-gradient(to bottom, #AAA4F3 , #E3C0F0, #F2E5EA )',
        'gradient-preloader-blue':
          'linear-gradient(to bottom, #232C5B, #151C40 )',
        'gradient-purple': 'linear-gradient(to top, #AAA4F3 , #F2E5EA )',
        'gradient-triple-vertical':
          'linear-gradient(to bottom, theme("colors.purple[400]"), theme("colors.purple[100]") 51%, theme("colors.pink[100]"))',
        'gradient-purple-pink':
          'linear-gradient(to bottom, theme("colors.purple[300]") , theme("colors.purple[100]") )',
        'gradient-purple-pink-light':
          'linear-gradient(to bottom, theme("colors.purple[200]") , theme("colors.pink[200]") )',
        'gradient-purple-pink-darker':
          'linear-gradient(to bottom, theme("colors.purple[400]") , theme("colors.pink[100]") )',
        'gradient-blue-dark':
          'linear-gradient(to bottom, theme("colors.blue.DEFAULT") 32% , theme("colors.blue[900]") )',
      },
      animation: {
        arrowRoll: 'arrowRoll 1s ease-in-out infinite',
        arrowRollDown: 'arrowRollDown 3s ease-in-out infinite',
        rotateLogo: 'spin 5s linear infinite',
      },
    },
  },
  plugins: [
    ({ addComponents, theme, addBase }) => {
      const nonAppearance = {
        appearance: 'none',
      }

      const BUTTON_STATES =
        '&:hover, .group:not(.group--no-events):hover &, &.is-active, .bzOpening:hover &'

      addBase({
        html: {
          fontSize: `${REM_BASE}px`,
          marginTop: '0 !important',

          [media(theme('screens.2xl'))]: {
            fontSize: `${1000 / stripUnit(theme('screens.2xl'))}vw`,
          },
        },

        // '[lang="de"]': {
        //   hyphens: 'auto',
        //   overflowWrap: 'break-word',
        // },

        'html, body': {
          width: '100%',
          minHeight: '100%',
          'overscroll-behavior-y': 'none',
        },

        body: {
          lineHeight: 1.2,
          fontSize: theme('fontSize.base'),
          fontFamily: theme('fontFamily.primary'),
          fontWeight: theme('fontWeight.normal'),
          '-webkit-font-smoothing': 'antialiased',
          background: theme('colors.white'),
          color: theme('colors.gray[800]'),
          // letterSpacing: '-0.02em',
          fontKerning: 'none',
        },

        '*': {
          '-webkit-tap-highlight-color': 'transparent',
        },

        'div[style="width: 0; height: 0;"]': {
          position: 'fixed',
          zIndex: -9999,
        },

        '.is-loading': {
          height: '100%',
          overflow: 'hidden',
          position: 'fixed',

          body: {
            height: '100%',
            overflow: 'hidden',
            position: 'fixed',
          },
        },

        '.is-changing': {
          pointerEvents: 'none !important',
        },

        '.is-loading, .is-rendering.is-changing': {
          pointerEvents: 'none !important',
          '[data-animation]': {
            opacity: '0',
          },
        },

        '.is-loaded [data-component^="lazyload"]': {
          transition: transition(['opacity']),
          opacity: '0',

          '&.loaded': {
            opacity: '1',
          },
        },

        // '.lenis': {
        //   "&.lenis-smooth": {
        //     scrollBehavior: 'auto',

        //     '[data-lenis-prevent]': {
        //       overscrollBehavior: 'contain',
        //     },
        //   },

        //   '&.lenis-stopped': {
        //     overflow: 'hidden',
        //   },

        //   '&.lenis-scrolling iframe': {
        //     pointerEvents: 'none',
        //   },
        // },

        '[data-lenis-prevent]': {
          overscrollBehavior: 'contain',
        },

        '.resize-active': {
          '*': {
            transition: ' none!important',
          },
        },

        '.cursor-none': {
          '*': {
            cursor: 'none !important',
          },
        },

        '[style^="--aspect"]': {
          aspectRatio: 'var(--aspect)',
        },

        'main[tabindex="-1"]': {
          outline: 'none',
        },

        '[data-component="page-overlay"]': {
          position: 'fixed',
          zIndex: '1000',
          pointerEvents: 'none',
          width: '100%',
          height: '100%',
          top: '0',
        },

        '.is-transitioning, .is-animating': {
          pointerEvents: 'none !important',
          cursor: 'progress !important',
        },

        button: {
          '&:focus': {
            outline: 'none',
          },
        },

        p: {
          marginBottom: '1.25em',
        },

        'h1, .h1': {
          ...fluidType(32, 70),
          lineHeight: 1,
          fontWeight: 500,
          letterSpacing: '-0.04em',

          '&--large': {
            ...fluidType(40, 190),
          },
        },

        'h2, .h2': {
          ...fluidType(24, 34),
          lineHeight: 1.1,
          fontWeight: 400,
          letterSpacing: '-0.02em',
        },

        'h3, .h3': {
          ...fluidType(18, 22),
          lineHeight: 1,
          fontWeight: 400,
        },

        'h4, .h4': {
          ...fluidType(16, 20),
          lineHeight: 1,
          fontWeight: 400,
        },

        // '.big-body': {
        //   ...fluidType(18, 22),
        //   lineHeight: 1,
        //   fontWeight: 400,
        // },


        '.title-dot': {
          position: 'absolute',
          display: 'none',
          right: 0,
          top: '0.1em',
          width: '1.1rem',
          height: '1.1rem',
          borderRadius: '100%',
          backgroundColor: 'currentColor',

          [media(theme('screens.md'))]: {
            display: 'block',
          },
        },

        '.title-counter': {
          flexShrink: 0,
          width: '1.8rem',
          height: '1.8rem',
          color: 'currentColor',
          borderRadius: '0.5rem',
          backgroundColor: 'transparent',
          border: `0.1rem solid currentColor`,
          marginRight: '0.6rem',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          ...fluidType(8, 12),
          lineHeight: 1,
          fontWeight: theme('fontWeight.medium'),
          position: 'relative',
          top: '0.4em',

          [media(theme('screens.md'))]: {
            width: '2rem',
            height: '2rem',
          },
        },

        // Text inputs
        "input[type='text'], input[type='password'], input[type='email'], input[type='tel'], textarea":
        {
          width: '100%',
          backgroundColor: 'transparent',
          borderRadius: 0,
          borderWidth: '0 0 1px',
          borderColor: hexToRgba(theme('colors.black.DEFAULT'), 0.2),
          fontFamily: theme('fontFamily.primary'),
          fontSize: rem(18),
          padding: "2rem 0",
          fontWeight: theme('fontWeight.normal'),
          lineHeight: theme('lineHeight.small'),
          letterSpacing: theme('letterSpacing.tighter'),
          // height: rem(42),
          transition: transition(['color', 'border-color', 'background-color']),
          appearance: 'none',
          color: 'currentColor',

            '&:focus, &:focus-visible': {
              borderColor: theme('colors.black.DEFAULT'),
            },

            '&.light': {
              borderColor: hexToRgba(theme('colors.white'), 0.2),

              '&::placeholder': {
                transition: transition(['opacity']),
                color: 'currentColor',
                opacity: 1,
              },

              '&:hover': {
                '&::placeholder': {
                  opacity: 0.4,
                },
              },

              '&:focus, &:focus-visible': {
                borderColor: theme('colors.white'),
              },

              '.is-invalid &': {
                borderColor: theme('colors.red'),
                color: theme('colors.red'),
              },
            },

            [media(theme('screens.md'))]: {
              fontSize: rem(22),
              padding: '1rem 0',
            },
          },

        textarea: {
          minHeight: rem(42),
        },

        '.rounded-inherit': {
          borderRadius: 'inherit',
        },

        '.reset-last': {
          '> *:last-child': {
            marginBottom: '0',
          },
        },

        'input, textarea': {
          '&::placeholder': {
            transition: transition(['opacity']),
            color: 'currentColor',
            opacity: 0.4,
          },

          '&:hover': {
            '&::placeholder': {
              opacity: 1,
            },
          },

          '&:focus': {
            outline: 'none',

            '&::placeholder': {
              opacity: 0,
            },
          },

          '&:not(:placeholder-shown)': {
            opacity: 1,
          },

          '.is-invalid &': {
            borderColor: theme('colors.red'),
            color: theme('colors.red'),
          },
        },

        // Checkboxes
        'input[type="checkbox"]': {
          transition: transition(['background-color', 'box-shadow']),
          appearance: 'none',
          backgroundColor: 'transparent',
          margin: 0,
          font: 'inherit',
          color: 'currentColor',
          width: '2rem',
          height: '2rem',
          boxShadow: 'inset 0 0 0 0.1rem rgba(0, 0, 0)',
          borderRadius: '0.6rem',
          flexShrink: 0,
          margin: '0 1.2rem 0 0',
          position: 'relative',

          '&:checked': {
            boxShadow:
              'inset 0 0 0 0.1rem rgba(theme("colors.blue.DEFAULT"), 0.2)',
            backgroundColor: theme('colors.pink.DEFAULT'),
            opacity: 1,
            backgroundRepeat: 'no-repeat',
            backgroundSize: '1.1rem 0.8rem',
            backgroundPosition: '50% 50%',
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='11' height='8' viewBox='0 0 11 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E %3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M10.3459 1.36183L3.70108 7.69024L0.65625 4.7904L1.34591 4.06627L3.70108 6.30929L9.65625 0.637695L10.3459 1.36183Z' fill='%23232C5B'/%3E %3C/svg%3E ")`,
          },
        },

        // Radio
        'input[type="radio"]': {
          appearance: 'none',
          backgroundColor: 'transparent',
          width: '2rem',
          height: '2rem',
          border: '0.1rem solid currentColor',
          borderRadius: '50%',
          position: 'relative',
          flexShrink: 0,
          margin: '0 1.5rem 0 0',

          '&:checked': {
            backgroundColor: 'currentColor',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '0.9rem 0.8rem',
            backgroundPosition: '50% 50%',
            opacity: 1,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='9' height='8' viewBox='0 0 9 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E %3Cpath d='M1 3.5L3.33333 6L8 1' stroke='%230A0A0A' stroke-width='2' stroke-linecap='round'/%3E %3C/svg%3E ")`,
          },
        },

        '.cursor-none': {
          '*': {
            cursor: 'none !important',
          },
        },
      })

      addComponents({
        '.container': {
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: rem(20),
          paddingRight: rem(20),
        },

        '.site-section': {
          
          '&:first-of-type': {
            paddingTop: '6rem',

            [media(theme('screens.md'))]: {
              paddingTop: '5rem',
            }
          },
        },

        '.btn__text': {
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          // justifyContent: 'space-between',
          width: '100%',
          marginTop: 'auto',
        },

        '.btn__ic': {
          transition: transition(['flex-grow'], '0.6s'),
          display: 'flex',
          flexGrow: 1,
          justifyContent: 'flex-end',
          alignItems: 'center',
          // paddingLeft: rem(16),
          position: 'relative',
        },

        '.btn__icon': {
          flexShrink: 0,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: rem(16),
          height: rem(16),
          borderRadius: '100%',
          backgroundColor: theme('colors.white'),
          color: theme('colors.blue.DEFAULT'),
          padding: rem(4),
          overflow: 'hidden',
          transition: transition(['transform'], '0.6s'),
        },

        '.btn, .bzButtonApply': {
          '-webkit-appearance': 'none',
          transition: transition(['opacity'], '0.6s'),
          color: theme('colors.white'),
          backgroundColor: theme('colors.blue.DEFAULT'),
          cursor: 'pointer',
          fontSize: rem(16),
          padding: '1rem',
          lineHeight: theme('lineHeight.small'),
          letterSpacing: theme('letterSpacing.tighter'),
          fontWeight: theme('fontWeight.medium'),
          fontFamily: theme('fontFamily.primary'),
          userSelect: 'none',
          justifyContent: 'space-between',
          borderRadius: '.5rem',
          // minWidth: '30rem',
          width: '100%',
          height: '3.2rem',
          willChange: 'transform',
          overflow: 'hidden',
          textAlign: 'left',
          position: 'relative',
          textTransform: 'uppercase',
          display: 'inline-flex',
          alignItems: 'center',
          cursor: 'pointer',

          [media(theme('screens.md'))]: {
            fontSize: rem(16),
          },

          '&:before': {
            content: "''",
            position: 'absolute',
            backgroundColor: 'rgba(0,0,0,0.3)',
            pointerEvents: 'none',
            transition: transition(['opacity'], '0.6s'),
            borderRadius: 'inherit',
            opacity: 0,
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
          },

          [BUTTON_STATES]: {
            '.btn__icon': {
              transform: 'rotate(45deg)',
              // animation: 'arrowRoll 0.8s cubic-bezier(0.215, 0.61, 0.355, 1)',
            },

            '&:before': {
              opacity: 1,
            },

            // '.btn__ic': {
            //   flexGrow: 0
            // },

            '.char': {
              transform: 'translateY(-100%) translateY(-0.3em)',
            },
          },

          '&:disabled': {
            pointerEvents: 'none',
            opacity: 0.7,
          },

          '&:focus': {
            outline: 'none',
          },

          '&--large': {
            fontSize: rem(16),
            height: rem(102),
            padding: '1rem',
            alignItems: 'end',
            fontFamily: theme('fontFamily.secondary'),
            lineHeight: 1,

            [media(theme('screens.lg'))]: {
              height: rem(204),
            },

            [media(theme('screens.laptop'))]: {
              height: rem(400),
              fontSize: rem(30),
              padding: '2rem',

              '[lang="de"] &': {
                fontSize: rem(25),
              },
            },

            '.btn__ic': {
              position: 'absolute',
              right: 0,
              top: 0,
            },

            '.btn__text': {
              marginTop: '1rem',
              height: '100%',
              alignItems: 'end',
            },
          },

          '&--black': {
            color: theme('colors.black.DEFAULT'),
            backgroundColor: theme('colors.white'),

            '.btn__icon': {
              color: theme('colors.white'),
              backgroundColor: theme('colors.black.DEFAULT'),
            },

            '&:before': {
              backgroundColor: theme('colors.gray.DEFAULT'),
            },
          },

          '&--secondary': {
            background: theme('colors.white'),
            color: theme('colors.blue.DEFAULT'),
            borderColor: theme('colors.brand.white'),

            '&:before': {
              backgroundColor: theme('colors.gray.DEFAULT'),
            },

            '.btn__icon': {
              color: theme('colors.white'),
              backgroundColor: theme('colors.blue.DEFAULT'),
            },
          },
        },

        '.custom-link': {
          display: 'inline-flex',
          alignItems: 'center',
          userSelect: 'none',

          svg: {
            transition: transition(['transform'], '0.7s'),
            marginLeft: '0.35em',

            '&:first-child': {
              marginLeft: 0,
              marginRight: '0.35em',
            },
          },

          [BUTTON_STATES]: {
            '.no-touch &': {
              '.char': {
                transform: 'translateY(-100%) translateY(-0.3em)',
              },

              '&[data-animate="right"]': {
                svg: {
                  transform: 'translateX(0.3em)',
                },
              },

              '&.nav-links': {
                '.char': {
                  transform: 'translateY(-100%)',
                },
              },
            },
          },
        },

        '.case-large-title': {
          '[lang="de"] &': {
            maxWidth: '96%',
          },
        },

        // '.break-long-word': {
        //   wordBreak: 'break-word',
        //   overflowWrap: 'break-word',
        //   hyphens: 'auto',
        // },

        '.custom-link__text,.btn__chars': {
          display: 'grid',
          overflow: 'hidden',
          height: '1.4em',
          gap: '0.1em',

          '.char': {
            transition: transition(['transform']),
            display: 'inline-block',
            transitionDelay: 'var(--d)',
            verticalAlign: '-0.25em',
            willChange: 'transform',

            '.nav-links &': {
              verticalAlign: '0',
            },
          },

          '.nav-links &': {
            height: '1.2em',
          },
        },

        '.btn-circle': {
          transition: transition(['color', 'background-color', 'transform']),
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: rem(30),
          height: rem(30),
          borderRadius: '100%',

          [media(theme('screens.md'))]: {
            width: rem(22),
            height: rem(22),
          },

          '&:before': {
            transition: transition(['opacity', 'background-color']),
            content: "''",
            position: 'absolute',
            width: '100%',
            borderRadius: 'inherit',
            height: '100%',
            border: '1px solid',
            borderColor: 'currentColor',
            opacity: 0.1,
          },

          [BUTTON_STATES]: {
            '&:before': {
              opacity: 0.5,
            },
          },
        },

        '.form-control': {
          position: 'relative',
        },

        '.form-error': {
          position: 'absolute',
          left: 0,
          top: '100%',
          padding: '1rem 0',
          color: theme('colors.red'),
        },

        '.btn-rounded': {
          transition: transition(['transform', 'color']),
          width: rem(50),
          height: rem(50),
          borderRadius: theme('borderRadius.full'),
          background: theme('colors.white'),
          color: theme('colors.blue.DEFAULT'),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          position: 'relative',

          [media(theme('screens.md'))]: {
            width: rem(30),
            height: rem(30),
          },

          '&:before': {
            transition: 'inherit',
            content: "''",
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            borderRadius: 'inherit',
            background: theme('colors.blue.DEFAULT'),
            transform: 'scale(0)',
            transformOrigin: 'center',
          },

          svg: {
            width: '40%',
            height: '40%',
            obejctFit: 'contain',
            position: 'relative',

            path: {
              fill: 'currentColor',
            },
          },

          [BUTTON_STATES]: {
            color: theme('colors.white'),

            '&:before': {
              transform: 'scale(1)',
            },
          },

          // '&--right': {
          //   [BUTTON_STATES]: {
          //     'svg': {
          //       animation: 'arrowRollRight 0.8s cubic-bezier(0.215, 0.61, 0.355, 1)',
          //     },

          //   },

          // },

          // '&--left': {
          //   [BUTTON_STATES]: {
          //     'svg': {
          //       animation: 'arrowRollLeft 0.8s cubic-bezier(0.215, 0.61, 0.355, 1)',
          //     },

          //   },
          // },
        },

        '.text--dot': {
          display: 'flex',
          alignItems: 'baseline',

          '&:before': {
            content: "''",
            display: 'inline-flex',
            width: '1.1rem',
            height: '1.1rem',
            borderRadius: '100%',
            backgroundColor: 'currentColor',
            marginRight: '0.5rem',
          },
        },

        '.list-colon': {
          display: 'flex',
          flexWrap: 'wrap',
          '>*:not(:last-child)::after': {
            content: "','",
            marginRight: '0.3em',
          },
        },

        '.list--dot': {
          // [media(theme('screens.laptop'))]: {
          //   display: 'flex',
          //   alignItems: 'center',
          //   flexWrap: 'wrap',
          // },
          

          li: {
            display: 'flex',
            alignItems: 'center',

            '&:before': {
              content: "'•'",
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '0.5em',

              // [media(theme('screens.laptop'))]: {
              //   margin: '0 0.5em',
              // }
            },

            // '&:first-child': {
            //   [media(theme('screens.laptop'))]: {
            //     '&:before': {
            //       display: 'none',
            //     }
            //   }
            // }
          },
        },

        '.list-colon': {
          display: 'flex',
          flexWrap: 'wrap',
          '>*:not(:last-child)::after': {
            content: "','",
            marginRight: '0.3em',
          },
        },


        '.text--dot-outline': {
          display: 'flex',
          alignItems: 'baseline',
          textTransform: 'uppercase',

          '&:before': {
            content: "''",
            transition: transition(['border-color', 'color']),
            borderRadius: theme('borderRadius.full'),
            border: '1px solid currentColor',
            width: '.6em',
            height: '.6em',
            backgroundColor: 'transparent',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '0.3em',
            position: 'relative',
            top: '-0.15em',

            '.is-active &': {
              backgroundColor: 'currentColor',
              borderColor: 'transparent',
            },
          },
        },

        '.text--slash': {
          display: 'flex',
          alignItems: 'baseline',
          textTransform: 'uppercase',

          '&:before': {
            content: "'/'",
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '0.5em',
          },
        },

        '.tl, .bl': {
          position: 'absolute',
          left: 0,
          width: '100%',
          height: '1px',
          backgroundColor: 'currentColor',
          opacity: 0.2,
        },

        '.ls, .rs': {
          position: 'absolute',
          width: '1px',
          height: '100%',
          backgroundColor: 'currentColor',
          opacity: 0.2,
        },

        '.tl': { top: 0 },
        '.bl': { bottom: 0 },

        '.link': {
          position: 'relative',
          cursor: 'pointer',
          display: 'inline-block',
          verticalAlign: 'top',

          '&:after': {
            content: "''",
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: '-0.1em',
            height: '1px',
            background: 'currentColor',
            willChange: 'transform',
            transformOrigin: '100% 100%',
            transform: 'scaleX(0)',
            pointerEvents: 'none',
            transition: transition(['transform']),
          },

          '&:hover, .group.is-active &, .group:hover &, &.is-active': {
            '&:after': {
              '.no-touch &': {
                transformOrigin: '0 0',
                transform: 'scaleX(1)',
                opacity: 1,
              },
            },
          },

          '.group.is-active &, &.is-active, .active &': {
            '&:after': {
              transformOrigin: '0 0',
              transform: 'scaleX(1)',
            },
          },

          '&--secondary': {
            '&:after': {
              opacity: 0.2,
            },
          },

          '&--underline': {
            '&:after': {
              transformOrigin: '0 0',
              transform: 'scaleX(1)',
              animation: 'none',
            },

            '&:hover, .group.is-active &, .group:hover &, &.is-active': {
              '&:after': {
                '.no-touch &': {
                  animation: 'link 0.75s forwards',
                },
              },
            },

            '.group.is-active &, &.is-active': {
              '&:after': {
                animation: 'link 0.75s forwards',
              },
            },

            // '.touch &': {
            //   textDecoration: 'underline',

            //   '&:after': {
            //     display: 'none',
            //   },
            // },
          },

          '&--underline-default': {
            textDecoration: 'underline',

            '&:after': {
              display: 'none',
            },

            '&:hover, .group.is-active &, .group:hover &, &.is-active': {
              textDecoration: 'none',
            },
          },

          '&--custom': {
            display: 'inline-block',
            verticalAlign: 'top',

            '&:after': {
              bottom: '-0.15em',
            },

            '.link__inner': {
              overflow: 'hidden',
              position: 'relative',
              display: 'block',
            },

            '.link__hover-text, .link__default-text': {
              display: 'block',
              position: 'relative',
              transition: transition(['transform']),
            },

            '.link__hover-text': {
              position: 'absolute',
              left: 0,
              top: 0,
              transform: 'translateY(125%)',
            },

            '&:hover, .group.is-active &, .group:hover &, &.is-active': {
              '.no-touch &': {
                '.link__hover-text': {
                  transform: 'none',
                },

                '.link__default-text': {
                  transform: 'translateY(-125%)',
                },
              },
            },

            '.group.is-active &, &.is-active': {
              '.link__hover-text': {
                transform: 'none',
              },

              '.link__default-text': {
                transform: 'translateY(-125%)',
              },
            },
          },

          '&--innactive': {
            '&:after': {
              display: 'none',
            },

            '.splitter-row': {
              overflow: 'visible !important',

              '.link': {
                display: 'inline-block !important',
                verticalAlign: 'top',
              },
            },
          },
        },

        '.forms-switcher': {
          position: 'relative',
          height: rem(60),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1,

          [media(theme('screens.md'))]: {
            height: rem(86),
          },

          '&:before': {
            transition: transition(['transform', 'opacity']),
            content: '""',
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            backgroundColor: theme('colors.gray.DEFAULT'),
            transform: 'scaleY(1)',
            transformOrigin: 'top',
            zIndex: -1,
          },

          '&.is-active': {
            pointerEvents: 'none',

            '&:before': {
              transform: 'scaleY(0)',
            },
          },

          '&:hover': {
            '&:before': {
              opacity: 0.6,
            },
          },
        },

        '.header': {
          transition: transition(['color', 'transform'], '0.5s'),
          '&[data-theme="light"]': {
            color: theme('colors.white'),
          },
          '&[data-theme="dark"],&.menu--active ': {
            color: theme('colors.black.DEFAULT'),
          },

          '.lenis-scrolling &': {
            transition: transition(['color', 'transform'], '0.15s'),
          },

          // '&.hide-header, &.show-header': {
          //   transition: transition(['color', 'transform'], '0.25s'),
          // },

          '&.hide-header:not(.menu--active)': {
            transform: 'translateY(-100%)',
          },
        },

        '.header-menu-item__thumb': {
          transition: transition(['clip-path'], '0.5s'),
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
          // clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',

          '.group:hover &,.header-menu-item--active &': {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            // clipPath: 'polygon(0 100%, 100% 100%, 100% 0, 0 0)',
          },
        },

        // '.faq-item': {
        //   counterIncrement: 'section',
        // },

        '.lists-container': {
          counterReset: 'section',

          '.faq-item': {
            counterIncrement: 'section',
          },
        },

        '.wysiwyg': {

          counterReset: 'titleItem',

          '> *:last-child': {
            marginBottom: '0',
          },

          counterReset: 'titleItem',

          'h1, h2, h3, h4': {
            margin: '5.5rem 0 3.2rem',
            display: 'inline-flex',
            width: '100%',
            position: 'relative',

            

            [media(theme('screens.md'))]: {
              paddingRight: '16%',
            },

            '&:after': {
              content: "''",
              position: 'absolute',
              display: 'none',
              right: 0,
              top: '0.3em',
              width: '1.1rem',
              height: '1.1rem',
              borderRadius: '100%',
              backgroundColor: theme('colors.gray[800]'),

              [media(theme('screens.md'))]: {
                display: 'block',
              },
            },

            '&:first-child': {
              marginTop: '0 !important',
            },
          },

          h2: {
            position: 'relative',
            marginBottom: '5.2rem',

            [media(theme('screens.md'))]: {
              marginBottom: '3.2rem',
            },
            '&:before': {
              content: "''",
              width: '2rem',
              height: '2rem',
              borderRadius: '0.5rem',
              marginRight: '0.6rem',
              backgroundPosition: '50% 50%',
              backgroundSize: 'contain',
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='28' height='28' viewBox='0 0 28 28' fill='none' xmlns='http://www.w3.org/2000/svg'%3E %3CforeignObject x='-10' y='-10' width='48' height='48'%3E%3Cdiv xmlns='http://www.w3.org/1999/xhtml' style='backdrop-filter:blur(5px);clip-path:url(%23bgblur_0_313_1789_clip_path);height:100%25;width:100%25'%3E%3C/div%3E%3C/foreignObject%3E%3Cpath data-figma-bg-blur-radius='10' d='M28 6C28 2.68629 25.3137 0 22 0H6C2.68629 0 0 2.68629 0 6V22C0 25.3137 2.68629 28 6 28H22C25.3137 28 28 25.3137 28 22V6Z' fill='%232C2D32'/%3E %3Cpath d='M8 20.9992C8.09706 20.7799 8.17461 20.6013 8.25495 20.424C10.087 16.3785 11.9208 12.334 13.7463 8.28584C13.8429 8.07109 13.9651 7.99479 14.1986 8.00027C14.7847 8.01398 15.3708 8.00484 16 8.00484C15.9619 8.10034 15.9382 8.16705 15.9094 8.23147C14.0138 12.4236 12.1177 16.6157 10.2174 20.8055C10.1822 20.8827 10.0907 20.9892 10.0233 20.9905C9.36716 21.0047 8.71098 20.9988 8 20.9988V20.9992Z' fill='white'/%3E %3Cpath d='M18.9995 8.00577C18.6778 8.71591 18.3737 9.38495 18.0709 10.0549C16.4599 13.6211 14.8475 17.1869 13.2425 20.7559C13.1618 20.9354 13.0682 21.0044 12.866 20.9998C12.2578 20.9865 11.6495 20.9948 11 20.9948C11.134 20.6924 11.2536 20.4171 11.3774 20.1435C13.1664 16.19 14.9573 12.2379 16.7413 8.28206C16.8322 8.08066 16.9402 7.99435 17.1711 8.00029C17.764 8.01536 18.3574 8.00531 19 8.00531L18.9995 8.00577Z' fill='white'/%3E %3Cdefs%3E %3CclipPath id='bgblur_0_313_1789_clip_path' transform='translate(10 10)'%3E%3Cpath d='M28 6C28 2.68629 25.3137 0 22 0H6C2.68629 0 0 2.68629 0 6V22C0 25.3137 2.68629 28 6 28H22C25.3137 28 28 25.3137 28 22V6Z'/%3E %3C/clipPath%3E%3C/defs%3E %3C/svg%3E ")`,
              backgroundRepeat: 'no-repeat',

              [media(theme('screens.md'))]: {
                width: '3rem',
                height: '3rem',
              },
            },
          },

          h3: {
            '&:before': {
              counterIncrement: 'titleItem',
              content: '""counter(titleItem)""',
              flexShrink: 0,
              width: '1.6rem',
              height: '1.6rem',
              color: theme('colors.white'),
              borderRadius: '0.5rem',
              backgroundColor: theme('colors.gray[800]'),
              marginRight: '0.6rem',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              ...fluidType(8, 12),
              lineHeight: 1,
              fontWeight: theme('fontWeight.medium'),

              [media(theme('screens.md'))]: {
                width: '2rem',
                height: '2rem',
              },
            },
          },

          a: {
            transition: 'opacity 0.3s',
            textDecoration: 'underline',

            '&:hover': {
              opacity: 0.5,
            },
          },

          'ol, ul, p': {
            margin: '0 0 2rem',
            opacity: 0.4,

            [media(theme('screens.md'))]: {
              paddingRight: '16%',
            },
          },

          img: {
            width: '100%',
            height: 'auto',
          },

          '.image': {
            margin: '4rem 0',

            '.image__container': {
              margin: 0,
            },

            figcaption: {
              marginTop: rem(12),
              fontSize: rem(14),
              position: 'relative',
              // color: hexToRgba(theme('colors.blue.DEFAULT'), 1),

              // '&:before': {
              //   content: '""',
              //   position: 'absolute',
              //   left: 0,
              //   top: 0,
              //   bottom: '0.2em',
              //   width: '2px',
              //   borderRadius: rem(10),
              //   backgroundColor: theme('colors.brand.blue.DEFAULT'),
              // }
            },
          },

          '.media': {
            margin: '4rem 0',
          },

          'ol, ul': {
            [media(theme('screens.md'))]: {
              position: 'relative',
            },

            'ul, ol': {
              paddingTop: '2em',
            },

            li: {
              marginBottom: '2em',

              '&:last-child': {
                marginBottom: 0,
              },
            },
          },

          ol: {
            listStyle: 'none !important',
            counterReset: 'item',

            li: {
              counterIncrement: 'item',
              position: 'relative',
              paddingLeft: '2rem',

              [media(theme('screens.md'))]: {
                paddingLeft: '2.5rem',
              },

              '&:last-child': {
                marginBottom: 0,
              },
              '&::before': {
                content: 'counter(item, lower-alpha) ")"',
                position: 'absolute',
                left: 0,
              },
            },
          },

          ul: {
            listStyle: 'none !important',

            li: {
              position: 'relative',

              paddingLeft: '2rem',

              [media(theme('screens.md'))]: {
                paddingLeft: '2.5rem',
              },

              '&:before': {
                content: '""',
                width: '0.5rem',
                height: '0.5rem',
                borderRadius: '100%',
                background: 'currentColor',
                position: 'absolute',
                left: '0rem',
                top: '0.3em',
              },
            },
          },

          blockquote: {
            padding: '2px',
            borderRadius: rem(15),
            backgroundColor: theme('colors.white'),
            padding: rem(16),
            position: 'relative',
            fontSize: rem(16),
            lineHeight: 1.4,
            margin: '3.2rem 0',

            [media(theme('screens.md'))]: {
              padding: rem(32),
            },

            '&:before': {
              content: "''",
              position: 'absolute',
              left: '2px',
              right: '2px',
              top: '2px',
              bottom: '2px',
              borderRadius: 'inherit',
              background:
                'linear-gradient(to bottom, #ffffff 0%,  #E9F3FF 100%)',
            },

            '*': {
              position: 'relative',
            },

            'p:first-child': {
              fontStyle: 'italic',
              marginBottom: rem(24),
              fontSize: rem(18),
              lineHeight: 1.4,

              [media(theme('screens.md'))]: {
                fontSize: rem(20),
              },

              '&:before, &:after': {
                content: '"\\""',
              },
            },

            '> *:last-child': {
              marginBottom: 0,
            },
          },

          '&--default': {
            'ol, ul': {
              paddingLeft: '1rem',

              [media(theme('screens.md'))]: {
                position: 'relative',
                left: 0,
              },

              'ul, ol': {
                paddingTop: '0.5em',
              },

              li: {
                marginBottom: '0.5em',
                paddingLeft: '1.5rem',

                '&:last-child': {
                  marginBottom: 0,
                },
              },
            },

            ol: {
              listStyle: 'none',
              counterReset: 'item',

              li: {
                '&:last-child': {
                  marginBottom: 0,
                },
                '&::before': {
                  content: 'counter(item) "."',
                  position: 'absolute',
                  left: 0,
                },
              },
            },

            ul: {
              listStyle: 'none',

              li: {
                position: 'relative',

                '&:before': {
                  content: '""',
                  width: '0.5rem',
                  height: '0.5rem',
                  borderRadius: '100%',
                  background: 'currentColor',
                  position: 'absolute',
                  left: '0rem',
                  top: '0.3em',
                },
              },
            },
          },
        },

        '.notes-list': {
          listStyle: 'none',

          li: {
            paddingLeft: '1.6rem',
            position: 'relative',
            display: 'flex',
            marginBottom: '0.6em',

            '&:before': {
              content: '""',
              width: '1.1rem',
              height: '1.1rem',
              borderRadius: '100%',
              background: 'currentColor',
              position: 'absolute',
              left: '0rem',
              top: '0.2em',
            },

            '&:last-child': {
              marginBottom: 0,
            },
          },
        },

        '.dot-pattern': {
          backgroundImage:
            'radial-gradient(circle, rgba(0,0,0,0.2) 1px, transparent 1px)',
          backgroundSize: '3.6rem 3.6rem',
        },

        // '[data-logo-rotate]': {
        //   transformOrigin: 'center',
        //   transformBox: 'fill-box',
        //   animation: 'rotateFull 20s linear infinite'
        // }
      })
    },
  ],
  future: {
    // removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  variants: {
    aspectRatio: ['responsive'],
    textColor: ['responsive', 'hover', 'focus', 'group-hover', 'checked'],
    borderColor: ['responsive', 'hover', 'focus', 'group-hover', 'checked'],
    backgroundColor: ['responsive', 'hover', 'focus', 'group-hover', 'checked'],
    fontFamily: ['responsive', 'hover', 'group-hover'],
    opacity: ['responsive', 'hover', 'focus', 'group-hover', 'checked'],
    transform: ['responsive', 'group-hover'],
    translate: ['responsive', 'hover', 'focus', 'group-hover'],
    scale: ['responsive', 'hover', 'focus', 'group-hover'],
    transformOrigin: ['responsive', 'hover', 'focus', 'group-hover'],
    mixBlendMode: ['responsive'],
    backgroundBlendMode: ['responsive'],
    isolation: ['responsive'],
    transitionTimingFunction: ['responsive', 'hover', 'group-hover'],
    transitionDuration: ['responsive', 'hover', 'group-hover'],
    transitionDelay: ['responsive', 'hover', 'group-hover'],
    pointerEvents: ['responsive', 'hover', 'group-hover'],
  },
  experimental: {
    optimizeUniversalDefaults: true,
  },
}
