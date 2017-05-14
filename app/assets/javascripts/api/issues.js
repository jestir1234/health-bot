document.addEventListener("DOMContentLoaded", () => {
  console.log("dom ready");

  // const fetchTranslate = (text) => {
  //   return $.ajax({
  //     method: "POST",
  //     url: "api/translations",
  //     data: {text: text}
  //   })
  // }
  //
  // // fetchTranslate("What are your symptoms?").then((voice) => playVoice(voice));
  //
  // // const playVoice = (voice) => {
  // //   debugger
  // //   let audio = new Audio(voice);
  // // }
  //
  // let symptomsCollection = [];
  // let currentDiag;
  //
  // const fetchIssue = () => {
  //   return $.ajax({
  //     method: "POST",
  //     url: "api/diagnosis"
  //   })
  // };
  //
  // const fetchSymptoms = () => {
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
  //     url: `api/symptoms`,
  //     data: {query: query}
  //   })
  // }
  //
  //
  // $("#symptom-add-btn").on("click", (e) => fetchSymptoms().then((symptom) => symptomsCollection.push(symptom)));
  // $("#submit-btn").on("click", (e) => fetchDiagnosis(symptomsCollection).then((diag) => updateResponseText()));

  const fetchDiagnosis = (symptoms) => {
    let sex = $("#sex-input").val();
    let age = $("#age-input").val();
    let query = {symptoms: symptoms, sex: sex, age: age};
    return $.ajax({
      method: "POST",
      url: `api/diagnosis`,
      data: {query},
      success: (diag) => { currentDiag = diag}
    })
  }

  const updateDiagnosis = (answer) => {

    return $.ajax({
      method: "POST",
      url: '/api/responses',
      data: {diag: currentDiag, answer: answer},
      success: (diag) => {
        currentDiag = diag
      }
    })
  }

  const renderOptions = (symptom) => {
    let name = symptom.name;
    let symptom_id = symptom.id;
    let answerContainer = document.getElementById("answer-container");
    let symptomContainer = document.createElement("div");
    symptomContainer.setAttribute("class", "symptom");
    symptomContainer.innerHTML = name;
    answerContainer.appendChild(symptomContainer);
    symptom.choices.forEach((choice) => {
      let choiceBtn = document.createElement('button');
      choiceBtn.setAttribute("class", "btn");
      choiceBtn.addEventListener("click", () => updateDiagnosis(choice.id).then(() => updateResponseText()));
      choiceBtn.innerHTML = choice.label;

      answerContainer.appendChild(choiceBtn);
    });
  }


  const updateResponseText = () => {
    $('#answer-container').empty();
    let responseContainer = document.getElementById("response-container");
    let answerContainer = document.getElementById("answer-container");
    let illnessContainer = document.getElementById("illness-container");

    let options = currentDiag.response.question.items;

    options.forEach((symptom) => {
      renderOptions(symptom);
    });

    console.log(options);

    responseContainer.innerHTML = currentDiag.response.question.text;
    illnessContainer.innerHTML = currentDiag.most_likely_illness || ""

  }


});
