import { createTransport } from 'nodemailer'
import type { SendVerificationRequestParams } from 'next-auth/providers/email'

export async function sendVerificationRequest(params: SendVerificationRequestParams) {
  const { identifier, url, provider, theme } = params

  const { host } = new URL(url)

  const transport = createTransport(provider.server)

  const result = await transport.sendMail({
    to: identifier,
    from: provider.from,
    subject: `Sign in to ${host}`,
    text: text({ url, host }),
    html: html({ url, host, theme }),
  })

  const failed = result.rejected.concat(result.pending).filter(Boolean)
  if (failed.length) {
    throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`)
  }
}

function html({ url, host, theme }: { url: string, host: string, theme?: any }) {
  const brandColor = theme?.brandColor || "#346df1"
  const color = {
    background: "#f9f9f9",
    text: "#444",
    mainBackground: "#ffffff",
    buttonBackground: brandColor,
    buttonBorder: brandColor,
    buttonText: "#ffffff",
  }

  return `
  <body style="background: ${color.background}; padding: 10px;">
    <table width="100%" border="0" cellspacing="20" cellpadding="0"
      style="background: ${color.mainBackground}; max-width: 600px; margin: auto; border-radius: 10px;">
      <tr>
        <td align="center" style="padding: 10px 0;">
          <h1 style="color: ${color.text};">Sign in to ${host}</h1>
        </td>
      </tr>
      <tr>
        <td align="center" style="padding: 20px;">
          <a href="${url}" style="background: ${color.buttonBackground}; color: ${color.buttonText}; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">Sign in</a>
        </td>
      </tr>
      <tr>
        <td style="padding: 10px; color: ${color.text}; font-size: 14px;" align="center">
          If you did not request this email, you can safely ignore it.
        </td>
      </tr>
    </table>
  </body>
  `
}

function text({ url, host }: { url: string, host: string }) {
  return `Sign in to ${host}\n${url}\n\n`
}
