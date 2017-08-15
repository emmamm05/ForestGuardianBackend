require 'net/http'
require 'uri'
require 'json'

class FirebaseCloudMessaging

  # @param [Report] report
  # @param [Array<User>] to
  def self.send_new_report_notification(to, report)

    if report.location_name.nil?
      message = "Reportó un incendio"
    else
      message = "Reportó un incendio en #{report.location_name}"
    end

    NotificationsJob.perform_later(to.map{|u| u.id}, {
        title: report.author.name,
        body: message
    },{ avatar: report.author.avatar.url,
        report: {
          id: report.id,
          geo_latitude: report.geo_latitude,
          geo_longitude: report.geo_longitude,
          title: report.title,
          description: report.description,
          location_name: report.location_name,
          picture_url: report.picture_url
        }
    })
  end

end