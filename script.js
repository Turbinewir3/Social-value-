const traitPoints = {
  black: 10,
  gay: 10,
  trans: 10,
  woman: 5,
  poor: 7,
  disabled: 8,
  left: 5,
  atheist: 3
};

function calculateScore() {
  const selfChecks = document.querySelectorAll("input[name='self']:checked");
  const opposedChecks = document.querySelectorAll("input[name='opposed']:checked");
  const grantVirtue = document.querySelector("input[name='grantVirtue']:checked");

  let userVirtueScore = 0;
  let opposedVirtueScore = 0;

  // Section 1: Score for user's selected identities
  selfChecks.forEach((input) => {
    if (traitPoints[input.value]) {
      userVirtueScore += traitPoints[input.value];
    }
  });

  // Section 2: Opponent traits do NOT accumulate any virtue score
  opposedChecks.forEach((input) => {
    if (traitPoints[input.value]) {
      opposedVirtueScore += 0; // Always zero
    }
  });

  // Section 3: Hypocrisy Detection
  let hypocrisyMessage = '';
  if (grantVirtue?.value === 'no' && opposedVirtueScore === 0 && opposedChecks.length > 0) {
    hypocrisyMessage = '<strong>Detected:</strong> You claimed to support marginalized traits, but denied virtue when they disagreed with you.';
    userVirtueScore = 0; // Disqualify for hypocrisy
  }

  // Display results
  const resultDiv = document.getElementById('results');
  resultDiv.innerHTML = `
    <p><strong>Your Virtue Signal Score:</strong> ${userVirtueScore}</p>
    <p><strong>Their Virtue Points:</strong> 0 (no matter what)</p>
    ${hypocrisyMessage ? `<p style="color: red;">${hypocrisyMessage}</p>` : ''}
  `;
}
