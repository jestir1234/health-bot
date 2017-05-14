require 'infermedica'


class Api::DiagnosisController < ApplicationController

  def create

    api = Infermedica::Api.new(api_id: 'c66ad306', api_key: 'd3104b6c3e05ad1c00e52ba4d05ec8d3')
    symptoms_id_collection = []
    symptom_ids = params[:query][:symptoms].keys
    symptom_ids.each do |id|
      symptoms_id_collection << params[:query][:symptoms][id]["symptoms"]["id"]
    end

    sex = params[:query][:sex]
    age = params[:query][:age]

    diag = Infermedica::Diagnosis.new(sex: sex, age: age)

    symptoms_id_collection.each do |symptom_id|
      diag.add_symptom(symptom_id, 'present')
    end

    @diag_response = api.diagnosis(diag)
    @diag = diag
    render 'api/diagnosis/diagnosis'
  end


end
