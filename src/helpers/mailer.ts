import nodemailer from "nodemailer";
import User from "@/src/models/userModel";
import bcrypt from "bcryptjs";
import { log } from "console";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hasedToken = await bcrypt.hash(userId.toString(), 10);
    if (emailType == "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hasedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType == "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hasedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.USERNAME_ADMIN,
        pass: process.env.PASSWORD_ADMIN,
      },
    });
    const mailOptions = {
      from: "patilsanketshri12@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="${process.env.DOMAIN}/${
        emailType === "VERIFY" ? "verifyemail" : "resetpassword"
      }?token=${hasedToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }
      or copy paste this link in your browser: ${process.env.DOMAIN}/${
        emailType === "VERIFY" ? "verifyemail" : "resetpassword"
      }?token=${hasedToken}
      </p>`,
    };
    console.log("Email sent successfully");
    const mailresponse = await transport.sendMail(mailOptions);
    return mailresponse;
  } catch (error: any) {
    console.log("Email not sent", error);
    throw new Error(error.message);
  }
};
