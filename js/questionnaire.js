document.addEventListener("DOMContentLoaded", function () {
  const quizForm = document.getElementById("quizForm");
  const quizHeader = document.querySelector("#quiz h2");
  const originalTitle = quizHeader.textContent;

  // Create results container
  const resultsContainer = document.createElement("div");
  resultsContainer.id = "quizResults";
  resultsContainer.style.display = "none";
  resultsContainer.innerHTML = `
    <div class="result-content"></div>
    <button class="quiz-btn retry-btn">Take Quiz Again</button>
  `;
  quizForm.parentNode.appendChild(resultsContainer);

  quizForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get selected answers
    const rockReady = document.querySelector(
      'input[name="rock_ready"]:checked',
    );
    const whatRock = document.querySelector('input[name="what_rock"]:checked');

    // Calculate result
    const result = calculateResult(
      rockReady ? rockReady.value : null,
      whatRock ? whatRock.value : null,
    );

    // Display result
    showResult(result);

    // Update UI
    quizForm.style.display = "none";
    resultsContainer.style.display = "block";
    quizHeader.textContent = "Rock-readiness analysis";
  });

  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("retry-btn")) {
      quizForm.style.display = "block";
      resultsContainer.style.display = "none";
      quizForm.reset();
      quizHeader.textContent = originalTitle;
    }
  });

  function calculateResult(readyValue, rockValue) {
    let score = 0;
    let title = "";
    let description = "";

    if (readyValue) {
      score += parseInt(readyValue) * 10;
    }

    if (score <= 25) {
      title = "Some preparation required";
      description =
        "Your rock-readiness could use a boost. <a href='https://pseudorandom-ensemble.teemill.com/'>Why not acquire some PRE merchandise to help with that?</a>";
    } else if (score <= 45) {
      title = "Mostly rock-ready";
      description =
        "You're pretty much there -- try waving your hands in the air and going 'woo'. Meanwhile, perhaps some <a href='https://pseudorandom-ensemble.teemill.com/'>merchandise</a> would get you over the line?";
    } else {
      title = "Possibly over-prepared";
      description =
        "Excellent, excellent. <a href='https://pseudorandom-ensemble.teemill.com/'>You still need a t-shirt, though, don't you?</a>";
    }

    return { title, description, score };
  }

  function showResult(result) {
    document.querySelector(".result-content").innerHTML = `
      <h3>${result.title}</h3>
      <p>${result.description}</p>
    `;
  }
});
