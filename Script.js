const weights = {
  black: 3,
  latina: 3,
  white: -2,
  poor: 2,
  rich: -2,
  trans: 3,
  gay: 2,
  straight: -1,
  nonbinary: 2,
  woman: 2,
  man: -1,
  left: 1,
  right: -2,
  neurodivergent: 1,
  religious: 0,
};

function calculateVirtue() {
  const self = Array.from(document.getElementById("self-identity").selectedOptions).map(o => o.value);
  const other = Array.from(document.getElementById("opposing-identity").selectedOptions).map(o => o.value);

  let score = 0;

  self.forEach(trait => score += weights[trait] || 0);
  other.forEach(trait => score -= weights[trait] || 0);

  let label = "Centrist Ghost";
  if (score >= 9) label = "Supreme Ally";
  else if (score >= 5) label = "Virtue Knight";
  else if (score >= 1) label = "Moderate Advocate";
  else if (score <= -4) label = "Problematic Patriot";
  else if (score <= -7) label = "Oppression Overlord";

  document.getElementById("result").innerHTML = `
    <h2>Your Score: ${score}</h2>
    <p>You earned the title: <strong>${label}</strong></p>
  `;
}
