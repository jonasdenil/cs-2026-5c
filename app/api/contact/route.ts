import { NextResponse } from "next/server"
import { Resend } from "resend"

// TODO: Replace recipient with Charlotte's email once confirmed
const TO_EMAIL = "denil.jonas@gmail.com"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const { naam, email, boodschap } = await request.json()

    if (!naam || !email || !boodschap) {
      return NextResponse.json(
        { error: "Alle velden zijn verplicht." },
        { status: 400 }
      )
    }

    await resend.emails.send({
      from: "Charlotte Schaerlaecken <onboarding@resend.dev>",
      to: TO_EMAIL,
      subject: `Nieuw contactbericht van ${naam}`,
      replyTo: email,
      html: `
        <h2>Nieuw bericht via charlotteschaerlaecken.be</h2>
        <p><strong>Naam:</strong> ${naam}</p>
        <p><strong>E-mailadres:</strong> ${email}</p>
        <p><strong>Boodschap:</strong></p>
        <p>${boodschap.replace(/\n/g, "<br/>")}</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Contact form error:", error)
    return NextResponse.json(
      { error: "Er liep iets mis. Probeer het opnieuw." },
      { status: 500 }
    )
  }
}
