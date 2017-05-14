require 'infermedica'
require 'excon'

class Api::SymptomsController < ApplicationController

  def create
    
    api = Infermedica::Api.new({api_id: ENV['infermedica_api_id'], api_key: ENV['infermedica_api_key']})

    key_word = params[:query][:symptoms]
    sex = params[:query][:sex]
    age = params[:query][:age]

    @symptom = api.search(key_word).first

    render 'api/symptoms/symptom'
  end

  def index
    api = Infermedica::Api.new({api_id: ENV['infermedica_api_id'], api_key: ENV['infermedica_api_key']})
    symptom_objects = api.get_symptoms

    @symptoms = []
    symptom_objects.keys.each do |key|
      @symptoms << symptom_objects[key]['name']
    end

    render 'api/symptoms/index'
  end
end
