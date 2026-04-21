import { Font } from '@react-email/components'

export function Fonts() {
  return (
    <>
      <Font
        fontFamily="IBM Plex Sans Condensed"
        fallbackFontFamily={['Arial', 'sans-serif']}
        webFont={{
          url: 'https://fonts.gstatic.com/s/ibmplexsanscondensed/v15/Gg8gN4UfRSqiPg7Jn2ZI12V4DCEwkj1E4LVeHY5a64vr.ttf',
          format: 'truetype',
        }}
        fontWeight={500}
        fontStyle="normal"
      />
      <Font
        fontFamily="Inter"
        fallbackFontFamily={['Arial', 'sans-serif']}
        webFont={{
          url: 'https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuOKfMZg.ttf',
          format: 'truetype',
        }}
        fontWeight={300}
        fontStyle="normal"
      />
      <Font
        fontFamily="Inter"
        fallbackFontFamily={['Arial', 'sans-serif']}
        webFont={{
          url: 'https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIa1ZL7W0Q5nw.woff2',
          format: 'woff2',
        }}
        fontWeight={400}
        fontStyle="normal"
      />
      <Font
        fontFamily="Inter"
        fallbackFontFamily={['Arial', 'sans-serif']}
        webFont={{
          url: 'https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuI6fMZg.ttf',
          format: 'truetype',
        }}
        fontWeight={500}
        fontStyle="normal"
      />
      <Font
        fontFamily="IBM Plex Mono"
        fallbackFontFamily="sans-serif"
        webFont={{
          url: 'https://fonts.gstatic.com/s/ibmplexmono/v20/-F63fjptAgt5VM-kVkqdyU8n1i8q131nj-o.woff2',
          format: 'truetype',
        }}
        fontWeight={400}
        fontStyle="normal"
      />
      <Font
        fontFamily="Inconsolata"
        fallbackFontFamily="sans-serif"
        webFont={{
          url: 'https://fonts.gstatic.com/s/inconsolata/v37/QldgNThLqRwH-OJ1UHjlKENVzkWGVkL3GZQmAwLYxYWI2qfdm7Lpp4U8WR32l3WdycuJDA.woff2',
          format: 'woff2',
        }}
        fontWeight={400}
        fontStyle="normal"
      />
      <Font
        fontFamily="Jersey 10"
        fallbackFontFamily="sans-serif"
        webFont={{
          url: 'https://fonts.gstatic.com/s/jersey10/v4/GftH7vZKsggXMf9n_J5n_5jh6V89Sg.woff2',
          format: 'woff2',
        }}
        fontWeight={400}
        fontStyle="normal"
      />
    </>
  )
}
