require 'infermedica'

class Api::ResponsesController < ApplicationController


  def create
    api = Infermedica::Api.new(api_id: ENV['infermedica_api_id'], api_key: ENV['infermedica_api_key'])

    old_diag = params[:diag][:diag]

    potential_symptom = params[:diag][:response][:question][:items]['0']['id']
    sex = old_diag[:sex]
    age = old_diag[:age]
    old_symptom_ids = old_diag[:symptoms].keys
    old_symptoms = []
    old_symptom_ids.each do |id|
      old_symptoms << params[:diag][:diag][:symptoms][id]['id']
    end
    answer_to_question = params[:answer]

    diag = Infermedica::Diagnosis.new(sex: sex, age: age)

    old_symptoms.each do |symptom_id|
      diag.add_symptom(symptom_id, 'present')
    end

    if answer_to_question == "yes"
      diag.add_symptom(potential_symptom, 'present')
    else
      diag.add_symptom(potential_symptom, 'absent')
    end
    
    @response = api.diagnosis(diag)
    conditions = @response['conditions']

    @most_likely_illness = conditions[0]['name']
    probability = 0

    conditions.each do |condition|
      if condition['probability'] > probability
        probability = condition['probability']
        @most_likely_illness = condition['name']
      end
    end

    @diagnosis = diag

    render 'api/responses/response'
  end
end
