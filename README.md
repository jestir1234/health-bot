# HealthBot

[live](https://health-bot.herokuapp.com/)

HealthBot is a simple web application made to easier identify potential diagnosises based on given symptoms. The app uses a JavaScript/jQuery front-end and Ruby on Rails backend.

### Speech Recognition
The app uses JavaScript's speech recognition library to allow user's to tell the app their symptoms. Simple state your symptom and watch as it appears in the input box. Afterwards, say 'add' and the app will populate the symptoms list with the symptom. When the user is satisfied with their list of symptoms, they simply say 'submit' and the the app will send the symptoms to the backend via an ajax post request.

### Intelligent Medical API
The app leverages Infermedica's extensive API to match symptoms with potential diagnosises. Upon forwarding a list of symptoms, the backend makes a RESTful call to Infermedica's API and receives an initial diagnosis along with a JSON containing further questions and possible options for the user to narrow down their list of diagnosises. The backend also computes the highest probable condition the user has based on scores received from the JSON object.

### Text to Speech
The app uses the ResponsiveVoice library to allow the app to audibly give directions to the user, communicating possible illness's the user may have along with further questions regarding the user's symptoms.

### Getty API
Upon receiving the most probable condition, the app makes a 'GET' request to Getty's picture API, and fetches a list of relevant images related to the illness so the user can see what illness they may have.
