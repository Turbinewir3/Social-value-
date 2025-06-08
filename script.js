document.addEventListener("DOMContentLoaded", function () {
  const identityFields = ["Race", "Ethnicity", "Religion", "Sex", "Age", "Financial Status", "Education Level", "Political Beliefs", "Attitude Toward Authority"];
  const categories = {
    "Race": ["White", "Black", "Asian", "Latino", "Indigenous", "Other"],
    "Ethnicity": ["Jewish", "Arab", "Latinx", "South Asian", "East Asian", "Other"],
    "Religion": ["Christian", "Muslim", "Jewish", "Atheist", "Hindu", "Other"],
    "Sex": ["Male", "Female", "Non-binary", "Other"],
    "Age": ["Under 18", "18–25", "26–40", "41–60", "60+"],
    "Financial Status": ["Wealthy", "Middle Class", "Working Class", "Poor"],
    "Education Level": ["PhD", "College Grad", "Some College", "High School", "No HS Diploma"],
    "Political Beliefs": ["Conservative", "Liberal", "Moderate", "Libertarian", "Socialist", "Other"],
    "Attitude Toward Authority": ["Respectful", "Skeptical", "Anti-authority"]
  };

  function buildForm(containerId) {
    const container = document.getElementById(containerId);
    identityFields.forEach(field => {
      const label = document.createElement("label");
      label.textContent = `${field}:`;
      const select = document.createElement("select");
      select.name = field;
      categories[field].forEach(option => {
        const opt = document.createElement("option");
        opt.value = option;
        opt.textContent = option;
        select.appendChild(opt);
      });
      container.appendChild(label);
      container.appendChild(select);
      container.appendChild(document.createElement("br"));
    });
  }

  buildForm("identity-section");
  buildForm("opposed-section");

  const nextButton = document.getElementById("next-button");
  const compareButton = document.getElementById("compare-button");
  const section2 = document.getElementById("section-2");
  const question3 = document.getElementById("question-3");
  const penaltySection = document.getElementById("penalty-section");
  const penaltyOptions = document.getElementById("penalty-options");
  const resultBox = document.getElementById("result");

  nextButton.addEventListener("click", () => {
    section2.classList.remove("hidden");
  });

  compareButton.addEventListener("click", () => {
    question3.classList.remove("hidden");
  });

  document.getElementById("yes-button").addEventListener("click", () => {
    resultBox.innerHTML = `<p>You’re willing to give virtue points across ideological lines. That's rare!</p>`;
  });

  document.getElementById("no-button").addEventListener("click", () => {
    penaltySection.classList.remove("hidden");
    identityFields.forEach(field => {
      const label = document.createElement("label");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.value = field;
      label.appendChild(checkbox);
      label.appendChild(document.createTextNode(` ${field}`));
      penaltyOptions.appendChild(label);
      penaltyOptions.appendChild(document.createElement("br"));
    });
  });
});
// Show Section 2 after Section 1 is submitted
document.getElementById("identityForm").addEventListener("submit", function (e) {
  e.preventDefault();
  document.getElementById("section1").style.display = "none";
  document.getElementById("section2").style.display = "block";
});

// React to user's answer in Section 2
document.getElementById("virtueDespiteDisagreement").addEventListener("change", function () {
  const value = this.value;
  const retractionOptions = document.getElementById("retractionOptions");
  if (value === "no") {
    retractionOptions.style.display = "block";
  } else {
    retractionOptions.style.display = "none";
  }
});

// Handle Section 2 submission
document.getElementById("moralityCheckForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const answer = document.getElementById("virtueDespiteDisagreement").value;
  if (answer === "no") {
    const selected = Array.from(document.getElementById("traitRetractions").selectedOptions).map(opt => opt.text);
    alert("⚠️ Hypocrisy detected!\nYou’re withholding virtue based on: " + selected.join(", "));
  } else {
    alert("✅ Consistency maintained. Moving on...");
  }

  // Proceed to Section 3 here...
});
