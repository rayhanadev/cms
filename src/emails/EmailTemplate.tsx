// Get the full source code, including the theme and Tailwind config:
// https://github.com/resend/react-email/tree/canary/apps/demo/emails

import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from '@react-email/components'
import { render } from '@react-email/render'
import { Fonts } from './fonts'
import { tailwindConfig } from './theme'

const baseUrl = process.env.EMAIL_ASSETS_URL
  ? `https://${process.env.EMAIL_ASSETS_URL}`
  : 'https://email-assets.purduehackers.com'

interface EmailTemplateProps {
  heading?: string
  previewText: string
  body: string
  locationName?: string
  locationUrl?: string
  ctaLabel?: string
  ctaUrl?: string
}

export const EmailTemplate = ({
  heading,
  previewText,
  body,
  locationName,
  locationUrl,
  ctaLabel,
  ctaUrl,
}: EmailTemplateProps) => {
  const paragraphs = body.split('\n\n').filter(Boolean)

  return (
    <Tailwind config={tailwindConfig}>
      <Html>
        <Head>
          <Fonts />
        </Head>

        <Body className="bg-muted font-14 m-0 p-0 font-mono">
          <Preview>{previewText}</Preview>
          <Container className="bg-bg mx-auto max-w-[600px]">
            <Section className="mobile:px-2 px-8 pt-6 pb-4">
              <Link href="https://purduehackers.com/" className="inline-block">
                <Img
                  src={`${baseUrl}/static/glider.svg`}
                  alt="Purdue Hackers Logo"
                  width="32"
                  height="32"
                  className="block"
                />
              </Link>
            </Section>
            <Section className="mobile:px-2 mobile:py-10 px-8 pt-2 pb-10">
              <Section className="mobile:mb-8 mb-12">
                {heading && (
                  <Text className="font-40 font-pixel mobile:font-32 text-fg m-0 uppercase">
                    {heading}
                  </Text>
                )}
                {paragraphs.map((paragraph, index) => (
                  <Text key={index} className="font-15 text-fg-2 m-0 mt-[18px] font-sans">
                    {paragraph}
                  </Text>
                ))}
                <Text className="font-14 text-fg-2 m-0 mt-[18px] font-sans">
                  – 💛 Purdue Hackers –
                </Text>
              </Section>
              {ctaUrl && (
                <Button
                  href={ctaUrl}
                  className="bg-purple text-fg inline-block px-5 py-2 text-center uppercase font-mono"
                >
                  {ctaLabel || 'View on Events Site'}
                </Button>
              )}
            </Section>

            <Section className="w-full pt-[30px] pb-[38px] bg-bg-2 text-bg border-stroke border-t">
              <Row align="center">
                <Column align="center">
                  <Img
                    src={`${baseUrl}/static/sparkle.svg`}
                    alt="Sparkle Icon"
                    width="32"
                    height="32"
                    className="hidden"
                  />
                  <Img
                    src={`${baseUrl}/static/angry_dude_sprite.gif`}
                    alt="Pixel Graphic"
                    width="128"
                    height="128"
                    className="block"
                  />
                  <Text className="mobile:w-full w-3/4 mx-auto font-17 m-0 my-[28px] font-mono">
                    Have a question? A thought? A concern?
                    <br />
                    Reach us through our Discord server!
                  </Text>
                  <Button
                    href="https://puhack.horse/discord"
                    className="mx-auto bg-transparent text-purple border-2 border-purple inline-block px-5 py-2 text-center uppercase font-mono font-medium"
                  >
                    Join Now!!!
                  </Button>
                </Column>
              </Row>
            </Section>

            {/* Footer */}
            <Section className="mobile:px-2 mobile:py-12 border-stroke border-t px-8 py-16">
              <Text className="font-13 text-fg-2 m-0 max-w-[320px] font-sans">
                Replies to this address won&apos;t reach a human. To get in contact with us, send a
                message in the{' '}
                <Link href="https://puhack.horse/discord" className="text-fg font-bold">
                  Purdue Hackers Discord server
                </Link>
                .
              </Text>
              <Row align="left">
                <Column className="w-full align-top">
                  <Section align="left" className="mt-8 w-[152px]">
                    <Row align="left">
                      <Column className="w-[20px] pr-6">
                        <Link
                          href="https://purduehackers.com/"
                          className="text-yellow uppercase underline font-mono inline-block"
                        >
                          Site
                        </Link>
                      </Column>
                      <Column className="w-[20px] pr-6">
                        <Link
                          href="https://puhack.horse/discord"
                          className="text-yellow uppercase underline font-mono inline-block"
                        >
                          Discord
                        </Link>
                      </Column>
                      <Column className="w-[20px] pr-6">
                        <Link
                          href="https://instagram.com/purduehackers"
                          className="text-yellow uppercase underline font-mono inline-block"
                        >
                          Instagram
                        </Link>
                      </Column>
                      <Column className="w-[20px]">
                        <Link
                          href="https://github.com/purduehackers"
                          className="text-yellow uppercase underline font-mono inline-block"
                        >
                          Github
                        </Link>
                      </Column>
                    </Row>
                  </Section>
                </Column>
              </Row>
              <Row align="left">
                <Column className="hidden w-full pt-8 align-top">
                  <Text className="font-11 text-fg-2 m-0 font-sans">
                    <Link href="https://purduehackers.com/" className="inline-block">
                      purduehackers.com
                    </Link>
                  </Text>
                </Column>
              </Row>
              <Row align="left">
                <Column className="hidden w-full pt-5 align-top">
                  <Text className="font-11 text-fg-2 m-0 max-w-[160px] font-sans">
                    <Link href="https://example.com/" className="text-fg-2">
                      Unsubscribe
                    </Link>{' '}
                    from Purdue Hackers emails.
                  </Text>
                </Column>
              </Row>
            </Section>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  )
}

EmailTemplate.PreviewProps = {
  previewText: 'Test preview',
  body: 'Test body\n\nSecond paragraph',
  ctaLabel: 'View on Events Site',
  ctaUrl: 'https://example.com/',
} satisfies EmailTemplateProps

export async function renderEmailTemplate(props: EmailTemplateProps) {
  return render(<EmailTemplate {...props} />)
}
