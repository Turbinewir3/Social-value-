const identityTraits = [
  { label: "Race", options: ["White", "Black", "Latino", "Asian", "Indigenous", "Mixed"] },
  { label: "Sex", options: ["Male", "Female", "Intersex"] },
  { label: "Gender", options: ["Cis", "Trans", "Non-binary"] },
  { label: "Sexuality", options: ["Straight", "Gay", "Lesbian", "Bisexual", "Asexual", "Pansexual"] },
  { label: "Religion", options: ["Christian", "Muslim", "Jewish", "Hindu", "Buddhist", "Atheist", "Agnostic", "Other"] },
  { label: "Financial Status", options: ["Poor", "Working Class", "Middle Class", "Rich"] },
  { label: "Age", options: ["Teen", "20s", "30s", "40s", "50s", "60+"] },
  { label: "Education", options: ["No HS", "High School", "College", "Grad School"] },
  { label: "Politics", options: ["Left", "Right", "Center", "Apolitical"] }
];

const virtuePoints = {
  White: 0, Black: 10, Latino: 8, Asian: 6, Indigenous: 10, Mixed: 7,
  Male: 0, Female: 5, Intersex: 7,
  Cis: 0, Trans: 10, "Non-binary": 10,
  Straight: 0, Gay: 10, Lesbian: 10, Bisexual: 7, Asexual: 6, Pansexual: 7,
  Christian: 2, Muslim: 8, Jewish: 6, Hindu: 6, Buddhist: 6, Atheist: 3, Agnostic: 3, Other: 5,
  Poor: 10, "Working Class": 6, "Middle Class": 3, Rich: 0,
  Teen: 5, "20s": 4, "30s": 3, "40s": 2, "50s": 1, "60+": 0,
  "No HS": 10, "High School": 6, College: 4, "Grad School": 2,
  Left: 10, Right: 0, Center: 4, Apolitical: 2
};

let userSelections = [];
let opposedSelections = [];

function createDropdowns(sectionId, storageArray) {
  const container = document.getElementById(sectionId);
  container.innerHTML = "";
  identityTraits.forEach((trait, index) => {
    const label = document.createElement("label");
    label.textContent = trait.label;
    const select = document.createElement("select");
    select.innerHTML = `<option disabled selected>Select ${trait.label}</option>` + 
      trait.options.map(opt => `<option value="${opt}">${opt}</option>`).join("");
    select.addEventListener("change", () => {
      storageArray[index] = select.value;
    });
    container.appendChild(label);
    container.appendChild(select);
  });
}

function calculateVirtueScore(traits) {
  return traits.reduce((total, trait) => total + (virtuePoints[trait] || 0), 0);
}

document.getElementById("next-button").addEventListener("click", () => {
  if (userSelections.length < identityTraits.length) {
    alert("Please complete all selections for Section 1.");
    return;
  }
  document.getElementById("section-1").classList.add("hidden");
  document.getElementById("section-2").classList.remove("hidden");
});

document.getElementById("compare-button").addEventListener("click", () => {
  if (opposedSelections.length < identityTraits.length) {
    alert("Please complete all selections for Section 2.");
    return;
  }
  document.getElementById("section-2").classList.add("hidden");
  document.getElementById("question-3").classList.remove("hidden");
});

document.getElementById("yes-button").addEventListener("click", () => {
  const userScore = calculateVirtueScore(userSelections);
  const otherScore = calculateVirtueScore(opposedSelections);
  const result = `
    <h3>Portrayed Virtue Score: ${userScore}</h3>
    <h3>Virtue Score of Other: ${otherScore}</h3>
    <p>You award virtue based on identity. Great job, Supreme Ally.</p>`;
  document.getElementById("result").innerHTML = result;
});

document.getElementById("no-button").addEventListener("click", () => {
  document.getElementById("question-3").classList.add("hidden");
  document.getElementById("penalty-section").classList.remove("hidden");

  const penalty = document.getElementById("penalty-options");
  penalty.innerHTML = "";
  identityTraits.forEach(trait => {
    const label = document.createElement("label");
    label.textContent = `Which ${trait.label}s do you exclude?`;
    const select = document.createElement("select");
    select.multiple = true;
    trait.options.forEach(opt => {
      const option = document.createElement("option");
      option.value = opt;
      option.textContent = opt;
      select.appendChild(option);
    });
    penalty.appendChild(label);
    penalty.appendChild(select);
  });

  const finalButton = document.createElement("button");
  finalButton.textContent = "Submit Hypocrisy";
  finalButton.addEventListener("click", () => {
    document.getElementById("penalty-section").classList.add("hidden");
    const msg = `<div class="result"><h3>Congratulations!</h3>
      <p>You're racist, sexist, ageist, classist, and more. You don't support identities — just opinions.</p></div>`;
    document.getElementById("result").innerHTML = msg;
  });

  penalty.appendChild(finalButton);
});

createDropdowns("identity-section", userSelections);
createDropdowns("opposed-section", opposedSelections);
