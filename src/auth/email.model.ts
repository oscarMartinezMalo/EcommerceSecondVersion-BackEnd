export interface EmailOptions {
    from: string;
    to: string | string[];
    subject: string;
    text?: string;
    html?: string;
    template?: string;
    attachment?;
    'recipient-variables'?: {
      [email: string]: any;
    };
  }