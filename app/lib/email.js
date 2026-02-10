import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 465),
  secure: process.env.SMTP_SECURE !== "false",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

/**
 * Utility to send security alerts with professional HTML template
 */
export async function sendSecurityAlert(
  toEmail,
  details
) {
  const dateStr = new Date().toLocaleString("en-US", { 
    timeZone: "UTC",
    dateStyle: "full",
    timeStyle: "long"
  });

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        .container { font-family: -apple-system, sans-serif; line-height: 1.6; color: #1e293b; max-width: 500px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; }
        .header { text-align: center; padding-bottom: 20px; }
        .alert-box { background-color: #fef2f2; border: 1px solid #fee2e2; padding: 15px; border-radius: 8px; margin-bottom: 20px; }
        .label { font-weight: bold; color: #64748b; font-size: 12px; text-transform: uppercase; }
        .value { font-family: monospace; color: #0f172a; margin-bottom: 12px; }
        .footer { font-size: 12px; color: #94a3b8; text-align: center; margin-top: 30px; }
        .btn { display: inline-block; background: #2563eb; color: #ffffff !important; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: bold; margin-top: 15px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2 style="color: #dc2626; margin: 0;">Security Alert</h2>
          <p style="color: #64748b;">New login detected for your CMS account</p>
        </div>

        <div class="alert-box">
          <p style="margin: 0; color: #991b1b; font-weight: 600;">A new session was initialized.</p>
        </div>

        <div>
          <div class="label">Time (UTC)</div>
          <div class="value">${dateStr}</div>

          <div class="label">Location</div>
          <div class="value">${details.country} (IP: ${details.ip})</div>

          <div class="label">Device</div>
          <div class="value">${details.device.split(')')[0] + ')'}</div>
        </div>

        <div style="text-align: center; border-top: 1px solid #e2e8f0; margin-top: 20px;">
          <p style="font-size: 14px;">If this wasn't you, your account may be compromised.</p>
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/admin/reset-password" class="btn">Secure Account</a>
        </div>

        <div class="footer">
          &copy; ${new Date().getFullYear()} Portfolio OS Security System
        </div>
      </div>
    </body>
    </html>
  `;

  const mailOptions = {
    from: `"Security Team" <${process.env.SMTP_USER}>`,
    to: toEmail,
    subject: `⚠️ Security Alert: New Login from ${details.country}`,
    text: `New login detected. IP: ${details.ip}, Country: ${details.country}, Device: ${details.device}`,
    html: html,
  };

  // Using a simple retry logic to ensure delivery
  let attempts = 0;
  while (attempts < 2) {
    try {
      return await transporter.sendMail(mailOptions);
    } catch (error) {
      attempts++;
      if (attempts >= 2) throw error;
      await new Promise(res => setTimeout(res, 1000));
    }
  }
}