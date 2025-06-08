document.addEventListener("DOMContentLoaded", () => {
  const identitySection = document.getElementById("identity-section");
  const opposedSection = document.getElementById("opposed-section");
  const penaltyOptions = document.getElementById("penalty-options");
  const nextButton = document.getElementById("next-button");
  const compareButton = document.getElementById("compare-button");
  const yesButton = document.getElementById("yes-button");
  const noButton = document.getElementById("no-button");
  const section2 = document.getElementById("section-2");
  const question3 = document.getElementById("question-3");
  const penaltySection = document.getElementById("penalty-section");
  const result = document.getElementById("result");

  const traitOptions = [
    "Race", "Ethnicity", "Religion", "Sex", "Age", "Financial Status", "Education Level", "Political Beliefs", "Attitude Toward Authority"
  ];

  function createDropdown(name, targetDiv) {
    traitOptions.forEach((trait) => {
      const label = document.createElement("label");
      label.textContent = `${trait}: `;
      const select = document.createElement("select");
      select.name = `${name}-${trait}`;
      const options = ["", "Privileged", "Marginalized"];
      options.forEach(opt => {
        const option = document.createElement("option");
        option.value = opt;
        option.textContent = opt;
        select.appendChild(option);
      });
      label.appendChild(select);
      targetDiv.appendChild(label);
      targetDiv.appendChild(document.createElement("br"));
    });
  }

  createDropdown("identity", identitySection);

  nextButton.addEventListener("click", () => {
    section2.classList.remove("hidden");
    createDropdown("opposed", opposedSection);
    nextButton.disabled = true;
  });

  compareButton.addEventListener("click", () => {
    question3.classList.remove("hidden");
    compareButton.disabled = true;
  });

  yesButton.addEventListener("click", () => {
    showFinalScore();
  });

  noButton.addEventListener("click", () => {
    penaltySection.classList.remove("hidden");
    traitOptions.forEach(trait => {
      const label = document.createElement("label");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.value = trait;
      label.appendChild(checkbox);
      label.appendChild(document.createTextNode(" " + trait));
      penaltyOptions.appendChild(label);
      penaltyOptions.appendChild(document.createElement("br"));
    });
    const warning = document.createElement("p");
    warning.innerHTML = "<strong>🎉 Congratulations, you're racist, sexist, ageist, etc.</strong>";
    penaltyOptions.appendChild(warning);
    showFinalScore(true);
  });

  function showFinalScore(isNo = false) {
    const portrayedScore = Math.floor(Math.random() * 20) + 60;
    const revealedScore = isNo ? portrayedScore - 30 : portrayedScore;

    result.innerHTML = `
      <h2>🧾 Final Scorecard</h2>
      <p>Portrayed Score: ${portrayedScore}</p>
      <p>Revealed Score: ${revealedScore}</p>
    `;
  }
});
