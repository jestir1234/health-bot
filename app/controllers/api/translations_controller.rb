require 'excon'

class Api::TranslationsController < ApplicationController

  def create
    debugger
    text = params[:text]
    response = Excon.post("https://stream.watsonplatform.net/text-to-speech/api/v1/synthesize",
     body: "{\"text\": \"some text\"}",
     headers: {"Content-Type": "application/json", "Accept": "audio/wav"},
     user: ENV['ibm_username'],
     password: ENV['ibm_password'],
     output: 'result.wav'
     )

     @voice = response.body.to_s
    render 'api/translations/translations'
  end
end
