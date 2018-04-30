const sendgrid = require('sendgrid');

const keys = require('../config/keys');

const helper = sendgrid.mail;


class Mailer extends helper.Mail {
  constructor({ subject, recipients }, content ) {
    super();

    this.from_email = new helper.Email('no-reply@emaily.com');
    this.subject = subject;
    this.body = new helper.Content('text/html', content);
    this.recipients = this.formatAddresses(recipients);

    this.addContent(this.body);
    this.addClickTracking();
    this.addRecipients();
  }

  formatAddresses(recipients) {
    return recipients.map(({ email }) => {
      return new helper.Email(email);
    });
  }

  addClickTracking() {
    const trackSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    trackSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackSettings);
  }

}

module.exports = Mailer;
