import nodemailer from "nodemailer";
import ejs from "ejs";
import { convert } from "html-to-text";
import {
  EMAIL_USERNAME,
  EMAIL_PASSWORD,
  EMAIL_PORT,
  EMAIL_HOST,
} from "@/config";

interface IEmail {
  user: { name: string; email: string };
}

class Email {
  to: string;
  name: string;
  from = `CaseCobra <hello@casecobra.com>`;

  transportOptions = {
    host: EMAIL_HOST,
    port: Number(EMAIL_PORT),
    secure: true,
    auth: {
      user: EMAIL_USERNAME,
      pass: EMAIL_PASSWORD,
    },
  };

  constructor({ user }: IEmail) {
    this.to = user.email;
    this.name = user.name;
  }

  private createTransport() {
    return nodemailer.createTransport(this.transportOptions);
  }

  private async send(subject: string, html: string) {
    const mailOptions = {
      html,
      subject,
      from: this.from,
      to: this.to,
      text: convert(html),
    };

    await this.createTransport().sendMail(mailOptions);
  }

  async sendEmailActivationMail(url: string) {
    const html = await ejs.renderFile(
      __dirname + "/templates/activation-mail.ejs",
      {
        name: this.name,
        activationUrl: url,
      }
    );

    await this.send("Activate your account", html);
  }

  async sendThankYouMail({
    orderDate,
    orderId,
  }: {
    orderId: string;
    orderDate: string;
  }) {
    const html = await ejs.renderFile(
      __dirname + "/templates/thank-u-mail.ejs",
      {
        name: this.name,
        orderDate,
        orderId,
      }
    );

    await this.send("Thank you for your order", html);
  }
}

export default Email;
