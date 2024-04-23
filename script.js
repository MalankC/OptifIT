const passwordText = document.querySelector('.password-text');
const passwordLengthValue = document.querySelector('.password-length-value');
const sliderPassword = document.querySelector('.slider-password');
const uppercaseCheckbox = document.querySelector('#uppercase-checkbox');
const lowercaseCheckbox = document.querySelector('#lowercase-checkbox');
const numbersCheckbox = document.querySelector('#numbers-checkbox');
const symbolsCheckbox = document.querySelector('#symbols-checkbox');
const strengthDisplay = document.querySelector('.strength-display');
const generatePasswordButton = document.querySelector('.generate-password');
const copyButton = document.querySelector('.copy-button');
const copiedText = document.querySelector('.copied-text');

const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
const numberChars = '0123456789';
const symbolChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

let password = '';
let passwordLength = sliderPassword.value;

function generatePassword() {
  let chars = '';
  if (uppercaseCheckbox.checked) chars += upperCaseChars;
  if (lowercaseCheckbox.checked) chars += lowerCaseChars;
  if (numbersCheckbox.checked) chars += numberChars;
  if (symbolsCheckbox.checked) chars += symbolChars;

  password = '';
  for (let i = 0; i < passwordLength; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars.charAt(randomIndex);
  }

  passwordText.value = password;
  updateStrengthDisplay();
}

function updateStrengthDisplay() {
  const strength = calculatePasswordStrength();
  strengthDisplay.style.backgroundColor = getStrengthColor(strength);
}

function calculatePasswordStrength() {
  let strength = 0;
  if (uppercaseCheckbox.checked) strength++;
  if (lowercaseCheckbox.checked) strength++;
  if (numbersCheckbox.checked) strength++;
  if (symbolsCheckbox.checked) strength++;
  if (passwordLength >= 8) strength++;
  if (passwordLength >= 12) strength++;
  return strength;
}

function getStrengthColor(strength) {
  switch (strength) {
    case 0:
    case 1:
      return '#f44336'; // Red
    case 2:
      return '#ffa500'; // Orange
    case 3:
      return '#ffd700'; // Yellow
    case 4:
      return '#cddc39'; // Lime
    case 5:
    case 6:
      return '#4caf50'; // Green
    default:
      return '#bbb'; // Gray
  }
}

function copyPassword() {
  passwordText.select();
  document.execCommand('copy');
  copiedText.style.visibility = 'visible';
  setTimeout(() => {
    copiedText.style.visibility = 'hidden';
  }, 2000);
}

sliderPassword.addEventListener('input', () => {
  passwordLength = sliderPassword.value;
  passwordLengthValue.textContent = passwordLength;
  generatePassword();
});

uppercaseCheckbox.addEventListener('change', generatePassword);
lowercaseCheckbox.addEventListener('change', generatePassword);
numbersCheckbox.addEventListener('change', generatePassword);
symbolsCheckbox.addEventListener('change', generatePassword);

generatePasswordButton.addEventListener('click', generatePassword);

copyButton.addEventListener('click', copyPassword);