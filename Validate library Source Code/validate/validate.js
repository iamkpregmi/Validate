let validationTimer;

// Function to validate name field
function validateNameField(input) {
  const name = input.value.trim();
  const regex = /^[a-zA-Z\s]*$/; // Only allows alphabets and spaces

  if (!name) {
    return "Name is required";
  } else if (name.length > 50) {
    return "Name must be less than 50 characters";
  } else if (!regex.test(name)) {
    return "Name must contain only letters and spaces";
  } else {
    return "";
  }
}

// Function to validate pincode field
function validatePincodeField(input) {
  const pincode = input.value.trim();
  const regex = /^\d{4,6}$/; // Allows 4 to 6 digits only

  if (!pincode) {
    return "Pincode is required";
  } else if (!regex.test(pincode)) {
    return "Pincode must be 4 to 6 digits long";
  } else if (pincode === "000000" | pincode === "00000" | pincode === "0000") {
    return "Invalid Pincode"; // Example of specific invalid pincode
  } else {
    return "";
  }
}

// Function to handle input event and trigger delayed validation
function handleInput(event) {
  clearTimeout(validationTimer);
  const input = event.target;
  
  if (input.getAttribute('validateName') !== null) {
    validationTimer = setTimeout(() => {
      const errorMessage = validateNameField(input);
      updateErrorMessage(input, errorMessage);
    }, 2000); // 2 seconds delay
  } else if (input.getAttribute('validatePincode') !== null) {
    validationTimer = setTimeout(() => {
      const errorMessage = validatePincodeField(input);
      updateErrorMessage(input, errorMessage);
    }, 2000); // 2 seconds delay
  }
}

// Function to handle form submission
function handleSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const inputs = form.querySelectorAll('input[validateName], input[validatePincode]');
  let isValid = true;

  inputs.forEach(input => {
    let errorMessage = "";
    if (input.getAttribute('validateName') !== null) {
      errorMessage = validateNameField(input);
    } else if (input.getAttribute('validatePincode') !== null) {
      errorMessage = validatePincodeField(input);
    }
    updateErrorMessage(input, errorMessage);

    if (errorMessage) {
      isValid = false;
    }
  });

  if (isValid) {
    // Submit the form or do any further processing
    console.log("Form is valid. Submitting...");
    form.submit();
  } else {
    console.log("Form is not valid. Please correct errors.");
  }
}

// Function to update error messages for input fields
function updateErrorMessage(input, errorMessage) {
  const errorElementId = input.id + '-error';
  const errorElement = document.getElementById(errorElementId);

  if (errorMessage) {
    if (errorElement) {
      errorElement.textContent = errorMessage;
    } else {
      const newErrorElement = document.createElement('div');
      newErrorElement.id = errorElementId;
      newErrorElement.classList.add('error');
      newErrorElement.textContent = errorMessage;
      input.parentNode.insertBefore(newErrorElement, input.nextSibling);
    }
  } else {
    if (errorElement) {
      errorElement.remove();
    }
  }
}

// Attach input event listener for real-time validation
document.querySelectorAll('input[validateName], input[validatePincode]').forEach(input => {
  input.addEventListener('input', handleInput);
});

// Attach submit event listener to form
document.getElementById('myForm').addEventListener('submit', handleSubmit);
