import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const body = await request.json();
  const { firstName, lastName, email, company, role, country, sector, engagement, budget, message } = body;

  const required = ['firstName','lastName','email','company','role','country','sector','engagement','message'];
  for (const field of required) {
    if (!body[field]) return Response.json({ error: `Missing: ${field}` }, { status: 400 });
  }

  await resend.emails.send({
    from: 'Altura Website <noreply@alturaholdings.io>',
    to: 'jb.nkusi@alturaholdings.io',
    replyTo: email,
    subject: `New Proposal Request — ${company} | ${sector}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0B1622;color:#F5F0E8;padding:40px;border:1px solid rgba(201,151,58,0.2);">
        <div style="border-top:3px solid #C9973A;margin-bottom:32px;"></div>
        <h1 style="font-size:24px;font-weight:300;color:#F5F0E8;margin-bottom:8px;">New Proposal Request</h1>
        <p style="color:#C9973A;font-size:12px;letter-spacing:0.3em;text-transform:uppercase;margin-bottom:32px;">${sector} · ${engagement}</p>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:10px 0;color:#4A6070;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;width:140px;">Contact</td><td style="padding:10px 0;color:#F5F0E8;">${firstName} ${lastName}</td></tr>
          <tr><td style="padding:10px 0;color:#4A6070;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;">Email</td><td style="padding:10px 0;"><a href="mailto:${email}" style="color:#C9973A;">${email}</a></td></tr>
          <tr><td style="padding:10px 0;color:#4A6070;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;">Company</td><td style="padding:10px 0;color:#F5F0E8;">${company}</td></tr>
          <tr><td style="padding:10px 0;color:#4A6070;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;">Role</td><td style="padding:10px 0;color:#F5F0E8;">${role}</td></tr>
          <tr><td style="padding:10px 0;color:#4A6070;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;">Country</td><td style="padding:10px 0;color:#F5F0E8;">${country}</td></tr>
          <tr><td style="padding:10px 0;color:#4A6070;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;">Sector</td><td style="padding:10px 0;color:#F5F0E8;">${sector}</td></tr>
          <tr><td style="padding:10px 0;color:#4A6070;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;">Engagement</td><td style="padding:10px 0;color:#F5F0E8;">${engagement}</td></tr>
          ${budget ? `<tr><td style="padding:10px 0;color:#4A6070;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;">Budget</td><td style="padding:10px 0;color:#F5F0E8;">${budget}</td></tr>` : ''}
        </table>
        <div style="border-top:1px solid rgba(201,151,58,0.15);margin:24px 0;"></div>
        <p style="color:#4A6070;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;margin-bottom:12px;">Project Brief</p>
        <p style="color:#8A9BB0;line-height:1.7;white-space:pre-wrap;">${message}</p>
        <div style="border-top:1px solid rgba(201,151,58,0.15);margin-top:32px;padding-top:20px;">
          <p style="color:#2A3A4E;font-size:11px;">Sent from alturaholdings.io contact form</p>
        </div>
      </div>
    `,
  });

  await resend.emails.send({
    from: 'Jean Bosco Nkusi — Altura <jb.nkusi@alturaholdings.io>',
    to: email,
    subject: 'Brief received — Altura Management Consulting',
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0B1622;color:#F5F0E8;padding:40px;border:1px solid rgba(201,151,58,0.2);">
        <div style="border-top:3px solid #C9973A;margin-bottom:32px;"></div>
        <h1 style="font-size:28px;font-weight:300;color:#F5F0E8;margin-bottom:16px;">Brief Received.</h1>
        <p style="color:#8A9BB0;line-height:1.75;margin-bottom:24px;">Thank you ${firstName}. I have received your project brief and will review it personally. You can expect a response within 48 business hours.</p>
        <p style="color:#8A9BB0;line-height:1.75;margin-bottom:32px;">If your matter is urgent, you can reach me directly at <a href="mailto:jb.nkusi@alturaholdings.io" style="color:#C9973A;">jb.nkusi@alturaholdings.io</a>.</p>
        <p style="color:#4A6070;font-size:12px;">Jean Bosco Nkusi<br>Founder & Managing Director<br>Altura Management Consulting</p>
        <div style="border-top:1px solid rgba(201,151,58,0.15);margin-top:32px;padding-top:20px;">
          <a href="https://alturaholdings.io" style="color:#C9973A;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;text-decoration:none;">alturaholdings.io</a>
        </div>
      </div>
    `,
  });

  return Response.json({ success: true });
}
