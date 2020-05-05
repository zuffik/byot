import { Injectable } from '@nestjs/common';
import { MailerOptions, TemplateAdapter } from '@nestjs-modules/mailer';
import * as path from 'path';
import * as fs from 'fs';
import * as Handlebars from 'handlebars';
import { Converter } from 'showdown';

@Injectable()
export class MarkdownCompilerService implements TemplateAdapter {
  private readonly converter;

  constructor() {
    this.converter = new Converter({});
  }

  compile(
    mail: any,
    callback: (err?: any, body?: string) => any,
    options: MailerOptions,
  ): void {
    const htmlFile = path.join(options.template.dir, '..', 'setup', 'base.hbs');
    const mdFile = path.join(options.template.dir, `${mail.data.template}.md`);
    const mdFileContent = Handlebars.compile(
      fs.readFileSync(mdFile).toString(),
    )(mail.data.context);
    const htmlFileContent = fs.readFileSync(htmlFile).toString();
    mail.data.html = Handlebars.compile(htmlFileContent)({
      body: this.converter.makeHtml(mdFileContent),
      title: mail.data.context.title || mail.data.subject,
    });
    callback(undefined);
  }
}
