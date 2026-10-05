const transporter = require("../config/mailConfig");
const Otp = require("../models/otp.model");

class SendEmail {
  static async verifyEmail(user) {
    try {
      const otp = Math.floor(1000 + Math.random() * 9000).toString();
      const newOtp = new Otp({
        userId: user._id,
        otp: otp,
      });
      await newOtp.save();

      await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: user.email,
        subject: "otp- verify your account",
        html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Verify Your Email</title>
        </head>

        <body style="
          margin: 0;
          padding: 0;
          background-color: #f4f6f8;
          font-family: Arial, Helvetica, sans-serif;
          color: #333333;
        ">

          <div style="
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          ">

            <!-- Header -->
            <div style="
              background-color: #F97316;
              padding: 25px;
              text-align: center;
            ">
              <h1 style="
                margin: 0;
                color: #ffffff;
                font-size: 24px;
              ">
                Verify Your Email
              </h1>
            </div>

            <!-- Content -->
            <div style="padding: 35px;">

              <h2 style="
                margin-top: 0;
                color: #222222;
              ">
                Hello ${user.name},
              </h2>

              <p style="
                font-size: 16px;
                line-height: 1.6;
              ">
                Thank you for creating an account with us.
                Please use the verification code below to verify your email address.
              </p>

              <!-- OTP -->
              <div style="
                margin: 30px 0;
                text-align: center;
              ">

                <p style="
                  margin-bottom: 10px;
                  color: #555555;
                  font-size: 15px;
                ">
                  Your Verification Code
                </p>

                <div style="
                  display: inline-block;
                  padding: 15px 30px;
                  background-color: #f3f4f6;
                  border: 1px solid #e5e7eb;
                  border-radius: 8px;
                  font-size: 30px;
                  font-weight: bold;
                  letter-spacing: 8px;
                  color: #F97316;
                ">
                  ${otp}
                </div>

              </div>

              <p style="
                font-size: 15px;
                line-height: 1.6;
                color: #555555;
              ">
                This OTP is required to verify your account.
                Please do not share this code with anyone.
              </p>

              <p style="
                font-size: 15px;
                line-height: 1.6;
                color: #555555;
              ">
                If you did not create this account, you can safely ignore this email.
              </p>

              <p style="
                margin-top: 30px;
                font-size: 15px;
              ">
                Thank you,<br />
                <strong>Admin Team</strong>
              </p>

            </div>

            <!-- Footer -->
            <div style="
              background-color: #f8f9fa;
              padding: 20px;
              text-align: center;
              color: #888888;
              font-size: 12px;
            ">
              <p style="margin: 0;">
                This is an automated email. Please do not reply.
              </p>
            </div>

          </div>

        </body>
        </html>
      `,
      });
    } catch (error) {
      throw error;
    }
  }

  static async forgotPasswordLink(user, resetToken) {
  try {
    const resetLink = `${process.env.FRONTEND_HOST}/reset-password?token=${resetToken}`;

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: user.email,
      subject: "Reset Your SkillSwap Password",
      html: `
        <!DOCTYPE html>
        <html lang="en">

        <head>
          <meta charset="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />

          <title>Reset Your Password</title>
        </head>

        <body style="
          margin: 0;
          padding: 0;
          background-color: #f4f6f8;
          font-family: Arial, Helvetica, sans-serif;
          color: #333333;
        ">

          <div style="
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          ">

            <!-- Header -->
            <div style="
              background-color: #F97316;
              padding: 25px;
              text-align: center;
            ">

              <h1 style="
                margin: 0;
                color: #ffffff;
                font-size: 24px;
              ">
                Reset Your Password
              </h1>

            </div>

            <!-- Content -->
            <div style="padding: 35px;">

              <h2 style="
                margin-top: 0;
                color: #222222;
              ">
                Hello ${user.name},
              </h2>

              <p style="
                font-size: 16px;
                line-height: 1.6;
              ">
                We received a request to reset the password
                for your SkillSwap account.
              </p>

              <p style="
                font-size: 16px;
                line-height: 1.6;
              ">
                Click the button below to create a new password.
              </p>

              <!-- Reset Button -->
              <div style="
                margin: 30px 0;
                text-align: center;
              ">

                <a
                  href="${resetLink}"
                  style="
                    display: inline-block;
                    padding: 14px 28px;
                    background-color: #F97316;
                    color: #ffffff;
                    text-decoration: none;
                    border-radius: 8px;
                    font-size: 16px;
                    font-weight: bold;
                  "
                >
                  Reset Password
                </a>

              </div>

              <p style="
                font-size: 15px;
                line-height: 1.6;
                color: #555555;
              ">
                This password reset link will expire after
                15 minutes.
              </p>

              <p style="
                font-size: 15px;
                line-height: 1.6;
                color: #555555;
              ">
                If you did not request a password reset,
                you can safely ignore this email.
              </p>

              <p style="
                margin-top: 30px;
                font-size: 15px;
              ">
                Thank you,<br />
                <strong>SkillSwap Team</strong>
              </p>

            </div>

            <!-- Footer -->
            <div style="
              background-color: #f8f9fa;
              padding: 20px;
              text-align: center;
              color: #888888;
              font-size: 12px;
            ">

              <p style="margin: 0;">
                This is an automated email. Please do not reply.
              </p>

            </div>

          </div>

        </body>
        </html>
      `,
    });
  } catch (error) {
    throw error;
  }
}


static async reporterUserMail(reporterUser) {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: reporterUser.email,
      subject: "Update on Your Report - SkillSwap",
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Report Update</title>
        </head>

        <body style="
          margin: 0;
          padding: 0;
          background-color: #f4f6f8;
          font-family: Arial, Helvetica, sans-serif;
          color: #333333;
        ">

          <div style="
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          ">

            <!-- Header -->
            <div style="
              background-color: #F97316;
              padding: 25px;
              text-align: center;
            ">
              <h1 style="
                margin: 0;
                color: #ffffff;
                font-size: 24px;
              ">
                Report Update
              </h1>
            </div>

            <!-- Content -->
            <div style="padding: 35px;">

              <h2 style="
                margin-top: 0;
                color: #222222;
              ">
                Hello ${reporterUser.name},
              </h2>

              <p style="
                font-size: 16px;
                line-height: 1.6;
              ">
                Thank you for taking the time to report a user on SkillSwap.
                Our admin team has reviewed your report.
              </p>

              <div style="
                margin: 25px 0;
                padding: 20px;
                background-color: #fff7ed;
                border-left: 4px solid #F97316;
                border-radius: 6px;
              ">
                <p style="
                  margin: 0;
                  font-size: 16px;
                  line-height: 1.6;
                  color: #444444;
                ">
                  After reviewing the information provided, we have decided
                  that the report does not meet the criteria for further action.
                  Therefore, the report has been rejected.
                </p>
              </div>

              <p style="
                font-size: 15px;
                line-height: 1.6;
                color: #555555;
              ">
                The reported user remains active on SkillSwap, so you may see
                this user again in your Discovery and Matching sections.
              </p>

              <p style="
                font-size: 15px;
                line-height: 1.6;
                color: #555555;
              ">
                We appreciate your contribution in helping us maintain a safe
                and respectful SkillSwap community.
              </p>

              <p style="
                margin-top: 30px;
                font-size: 15px;
              ">
                Thank you,<br />
                <strong>SkillSwap Admin Team</strong>
              </p>

            </div>

            <!-- Footer -->
            <div style="
              background-color: #f8f9fa;
              padding: 20px;
              text-align: center;
              color: #888888;
              font-size: 12px;
            ">
              <p style="margin: 0;">
                This is an automated email. Please do not reply.
              </p>
            </div>

          </div>

        </body>
        </html>
      `,
    });
  } catch (error) {
    throw error;
  }
}

static async reportedUserMail(reportedUser) {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: reportedUser.email,
      subject: "Your SkillSwap Account Has Been Blocked",
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Account Blocked</title>
        </head>

        <body style="
          margin: 0;
          padding: 0;
          background-color: #f4f6f8;
          font-family: Arial, Helvetica, sans-serif;
          color: #333333;
        ">

          <div style="
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          ">

            <!-- Header -->
            <div style="
              background-color: #dc2626;
              padding: 25px;
              text-align: center;
            ">
              <h1 style="
                margin: 0;
                color: #ffffff;
                font-size: 24px;
              ">
                Account Blocked
              </h1>
            </div>

            <!-- Content -->
            <div style="padding: 35px;">

              <h2 style="
                margin-top: 0;
                color: #222222;
              ">
                Hello ${reportedUser.name},
              </h2>

              <p style="
                font-size: 16px;
                line-height: 1.6;
              ">
                We are writing to inform you that your SkillSwap account has
                been reviewed following a report concerning your account.
              </p>

              <div style="
                margin: 25px 0;
                padding: 20px;
                background-color: #fef2f2;
                border-left: 4px solid #dc2626;
                border-radius: 6px;
              ">
                <p style="
                  margin: 0;
                  font-size: 16px;
                  line-height: 1.6;
                  color: #444444;
                ">
                  After reviewing the report, our admin team has decided to
                  block your account.
                </p>
              </div>

              <p style="
                font-size: 15px;
                line-height: 1.6;
                color: #555555;
              ">
                Your account is currently blocked, and you will no longer be
                able to use SkillSwap features such as Discovery, Matching,
                Swap Requests, and other user interactions.
              </p>

              <p style="
                font-size: 15px;
                line-height: 1.6;
                color: #555555;
              ">
                If you believe this action was taken in error, please contact
                the SkillSwap administration team for further assistance.
              </p>

              <p style="
                margin-top: 30px;
                font-size: 15px;
              ">
                Regards,<br />
                <strong>SkillSwap Admin Team</strong>
              </p>

            </div>

            <!-- Footer -->
            <div style="
              background-color: #f8f9fa;
              padding: 20px;
              text-align: center;
              color: #888888;
              font-size: 12px;
            ">
              <p style="margin: 0;">
                This is an automated email. Please do not reply.
              </p>
            </div>

          </div>

        </body>
        </html>
      `,
    });
  } catch (error) {
    throw error;
  }
}


}
module.exports = SendEmail;
