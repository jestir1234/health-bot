require 'excon'

class Api::ImagesController < ApplicationController

  def create
    disease = params[:disease]

    response = Excon.get("https://api.gettyimages.com/v3/search/images?phrase=#{disease}",
     body: "{\"text\": \"some text\"}",
     headers: {"Content-Type": "application/json", "Api-Key": ENV['getty_key']}
     )
     result = JSON.parse(response.body)
     images = result['images']
     @image_collection = [];

     5.times do |i|
       @image_collection << images[i]
     end

     render 'api/images/images'
     
  end

end
