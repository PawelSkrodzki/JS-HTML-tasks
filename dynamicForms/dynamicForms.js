function validateSettings(settings) {
  const structure = ['action', 'method', 'inputs'];
  const settingsKeys = Object.keys(settings);

  structure.forEach((key) => {
    if (!settingsKeys.includes(key)) {
      throw new Error(`${key} key required in SettingsKeys`);
    }
  });
  if (!Array.isArray(settings.inputs)) {
    throw new Error(`Inputs key has to be an Array`);
  }
  if (settings.method !== 'POST' && settings.method !== 'GET') {
    throw new Error(`Form method must be POST or GET`);
  }
}

function getObjectFromInputsArr(testSettings, typeValue) {
  const resultArray = testSettings.inputs.filter((element) => {
    return Object.values(element).includes(typeValue);
  });
  return resultArray;
}

class FormBuiilder {
  constructor(settings) {
    this.settings = settings;
    validateSettings(settings);
  }

  buildForm() {
    const form = document.createElement('form');
    form.setAttribute('method', this.settings.method);
    form.setAttribute('action', this.settings.action);

    const headerSettings = getObjectFromInputsArr(this.settings, 'header');

    headerSettings.forEach((element) => {
      const h4 = document.createElement('h4');
      h4.setAttribute('type', element.type);
      h4.textContent = element.label;
      form.appendChild(h4);
    });

    const emailInputSettings = getObjectFromInputsArr(this.settings, 'email');
    emailInputSettings.forEach((element) => {
      const emailInput = document.createElement('input');

      emailInput.setAttribute('name', element.name);
      emailInput.setAttribute('type', element.type);
      emailInput.setAttribute('placeholder', element.placeholder);
      form.appendChild(emailInput);
    });

    const textareaSettings = getObjectFromInputsArr(this.settings, 'textarea');

    textareaSettings.forEach((element) => {
      const textarea = document.createElement('textarea');
      textarea.style.display = 'block';
      textarea.setAttribute('name', element.name);
      textarea.setAttribute('type', element.type);
      textarea.setAttribute('placeholder', element.placeholder);
      form.appendChild(textarea);
    });

    const submitButtonSettings = getObjectFromInputsArr(this.settings, 'submit');

    submitButtonSettings.forEach((element) => {
      const submitButton = document.createElement('input');

      submitButton.setAttribute('type', element.type);
      submitButton.setAttribute('label', element.label);
      form.appendChild(submitButton);
    });
    document.body.appendChild(form);
  }
}

const testSettings = {
  action: '/contact/by-mail',
  method: 'POST',
  inputs: [
    { type: 'header', label: 'Skontaktuj się z nami' },
    { name: 'email', type: 'email', placeholder: 'Wpisz swój email' },
    {
      name: 'content',
      type: 'textarea',
      placeholder: 'Wpisz treść wiadomości'
    },
    { type: 'submit', label: 'Wyślij wiadomość' }
  ]
};

const newForm = new FormBuiilder(testSettings);

newForm.buildForm();
