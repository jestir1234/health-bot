document.addEventListener("DOMContentLoaded", function() {
  console.log("dom ready");
  var allSymptoms;

  responsiveVoice.speak("Please state your symptoms.");

  const fetchTranslate = function(text) {
    return $.ajax({
      method: "POST",
      url: "api/translations",
      data: {text: text}
    })
  }

  const fetchAllSymptoms = function(){
    return $.ajax({
      method: "GET",
      url: "api/symptoms",
      success: (symptoms) => { allSymptoms = symptoms.symptoms}
    })
  }

  fetchAllSymptoms();

  let recognition = new window.webkitSpeechRecognition();
  recognition.lang = 'en-US';
  recognition.continuous = true;
  recognition.interimResults = true;
  // recognition.interimResults = false;
  // recognition.maxAlternatives = 5;
  recognition.onstart = function() {
    console.log('Speech recognition service has started');
};

  recognition.onerror = function(event) {
      console.error(event);
  };

  recognition.onend = function() {
    console.log('Speech recognition service disconnected');
};

recognition.onresult = function(event) {
    let interim_transcript = '';
    let final_transcript = '';

    for (let i = event.resultIndex; i < event.results.length; ++i) {
        // Verify if the recognized text is the last with the isFinal property
        if (event.results[i].isFinal) {
            final_transcript += event.results[i][0].transcript;
        } else {
            interim_transcript += event.results[i][0].transcript;
        }
    }

    // Choose which result may be useful for you

    console.log("Interim: ", interim_transcript);

    // $('#symptoms-input').val(interim_transcript)

    console.log("Final: ",final_transcript);
    console.log(`final transcript is ${final_transcript}`);
    if (final_transcript === " add"){
      console.log("adding to symptoms");
      let thisBtn = document.getElementById("symptom-add-btn");
      thisBtn.click();
    } else if (final_transcript === " submit"){
      console.log("submitting form...")
      let thisBtn = document.getElementById("submit-btn");
      thisBtn.click();
    } else if (final_transcript === " yes") {
      console.log("answer is yes...")
      let thisBtn = document.getElementsByClassName("btn")[0];
      thisBtn.click();
    } else if (final_transcript === " no") {
      console.log("answer is no...")
      let thisBtn = document.getElementsByClassName("btn")[1];
      thisBtn.click();
    } else if (final_transcript === " don't know") {
      console.log("answer is don't know...")
      let thisBtn = document.getElementsByClassName("btn")[2];
      thisBtn.click();
    } else if (final_transcript === " clear") {
      $('.symptom-list').empty();
    } else if (final_transcript !== "") {
      $('#symptoms-input').val(final_transcript)
    }
};

recognition.start();

  const playVoice = function(text){
    if (currentDiag.most_likely_illness){
      text = text + `You might have a ${currentDiag.most_likely_illness}`
    }

    responsiveVoice.speak(text);

  }

  //
  // const clearSymptoms = () => {
  //   $('.symptom-list').empty();
  // }
  //
  // $('#symptom-clear-btn').on("click", clearSymptoms)
  //
  // let symptomsCollection = [];
  // let currentDiag;
  //
  // const fetchIssue = function() {
  //   return $.ajax({
  //     method: "POST",
  //     url: "api/diagnosis"
  //   })
  // };
  //
  // let fetchSymptoms = function(){
  //   let symptoms = $("#symptoms-input").val();
  //   let symptomItem = document.createElement("p");
  //   symptomItem.innerHTML = symptoms;
  //   let symptomList = document.getElementsByClassName('symptom-list')[0];
  //   symptomList.appendChild(symptomItem);
  //   $("#symptoms-input").val("");
  //   let sex = $("#sex-input").val();
  //   let age = $("#age-input").val();
  //   let query = {symptoms: symptoms, sex: sex, age: age};
  //   return $.ajax({
  //     method: "POST",
  //     url: 'api/symptoms',
  //     data: {query: query}
  //   })
  // }
  //
  // //
  // $("#symptom-add-btn").on("click", () => fetchSymptoms().then((symptom) => {
  //   console.log(symptom);
  //   symptomsCollection.push(symptom)
  //   }
  // ));
  //
  // $("#submit-btn").on("click", () => fetchDiagnosis(symptomsCollection).then((diag) => updateResponseText()));
  // //
  // const fetchDiagnosis = function(symptoms){
  //   let sex = $("#sex-input").val();
  //   let age = $("#age-input").val();
  //   let query = {symptoms: symptoms, sex: sex, age: age};
  //   return $.ajax({
  //     method: "POST",
  //     url: 'api/diagnosis',
  //     data: {query},
  //     success: function(diag) { currentDiag = diag}
  //   })
  // }
  //
  // const updateDiagnosis = function(answer){
  //
  //   return $.ajax({
  //     method: "POST",
  //     url: '/api/responses',
  //     data: {diag: currentDiag, answer: answer},
  //     success: function(diag){
  //       currentDiag = diag
  //     }
  //   })
  // }
  // //
  // const renderOptions = function(symptom) {
  //   let name = symptom.name;
  //   let symptom_id = symptom.id;
  //   let answerContainer = document.getElementById("answer-container");
  //   let symptomContainer = document.createElement("div");
  //   symptomContainer.setAttribute("class", "symptom");
  //
  //   answerContainer.appendChild(symptomContainer);
  //   let btnContainer = document.createElement("div");
  //   btnContainer.setAttribute("class", "btn-container");
  //   symptom.choices.forEach(function(choice){
  //     let choiceBtn = document.createElement('button');
  //     choiceBtn.setAttribute("class", "btn");
  //     btnContainer.appendChild(choiceBtn);
  //     choiceBtn.addEventListener("click", function(){
  //       updateDiagnosis(choice.id)
  //       .then( function() {
  //         updateResponseText()
  //       }
  //     )
  //   });
  //     choiceBtn.innerHTML = choice.label;
  //
  //     answerContainer.appendChild(btnContainer);
  //   });
  // }
  //
  // const fetchImages = (disease) => {
  //   return $.ajax({
  //     method: 'POST',
  //     url: 'api/images',
  //     data: {disease: disease}
  //   })
  // }
  //
  // const renderImages = (images) => {
  //
  //   images = images.images;
  //   let imagesContainer = document.getElementsByClassName("images-container")[0];
  //
  //   images.forEach((image) => {
  //     let imageDiv = document.createElement('img');
  //     imageDiv.src = image.display_sizes[0].uri
  //     imagesContainer.appendChild(imageDiv);
  //   });
  //
  // }
  //
  // const updateResponseText = function(){
  //   fetchImages(currentDiag.most_likely_illness).then((images) => renderImages(images));
  //   $('#answer-container').empty();
  //   let responseContainer = document.getElementById("response-container");
  //   let answerContainer = document.getElementById("answer-container");
  //   let illnessContainer = document.getElementById("illness-container");
  //
  //   let options = currentDiag.response.question.items;
  //
  //   options.forEach(function(symptom){
  //     renderOptions(symptom);
  //   });
  //
  //   console.log(options);
  //
  //   responseContainer.innerHTML = currentDiag.response.question.text;
  //   playVoice(currentDiag.response.question.text);
  //   illnessContainer.innerHTML = currentDiag.most_likely_illness || ""
  //
  // }


});
