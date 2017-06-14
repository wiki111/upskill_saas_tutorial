# Load the Rails application.
require_relative 'application'

# Initialize the Rails application.
Rails.application.initialize!

ActionMailer::Base.smtp_settigs = {
    :port       => ENV['MAILGUN_SMTP_PORT'],
    :address    => ENV['MAILGUN_SMTP_SERVER'],
    :user_name  => ENV['MAILGUN_SMTP_LOGIN'],
    :password   => ENV['MAILGUN_SMTP_PASSWORD'],
    :domain     => 'yourapp.heroku.com',
    :authentication => :plain,
}
ActionMailer::Base.deliviery_method = :smtp