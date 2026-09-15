// Programme -> Course lookup table.
// Keys match the value="" attributes on the Programme <option> elements.
const coursesByProgramme = {
  cs: ["Data Structures", "Compilers", "Java Programming", "Cloud Computing"],
  af: ["Financial Accounting", "Cost Accounting", "Business Finance"],
  law: ["Introduction to Law", "Constitutional Law", "Contract Law"]
};

const programmeSelect = document.getElementById('programme');
const courseSelect = document.getElementById('course');
const form = document.getElementById('registrationForm');

// Rebuilds the Course dropdown whenever Programme changes.
programmeSelect.addEventListener('change', function () {
  const selectedProgramme = programmeSelect.value;

  // Clear out whatever was there before (old courses or the placeholder).
  courseSelect.innerHTML = '';

  if (!selectedProgramme) {
    courseSelect.innerHTML = '<option value="">-- Select Programme First --</option>';
    return;
  }

  const placeholder = document.createElement('option');
  placeholder.value = '';
  placeholder.textContent = '-- Select Course --';
  courseSelect.appendChild(placeholder);

  const courses = coursesByProgramme[selectedProgramme];
  courses.forEach(function (courseName) {
    const option = document.createElement('option');
    option.value = courseName;
    option.textContent = courseName;
    courseSelect.appendChild(option);
  });
});

// ---- Validation ----

function showError(fieldId, message) {
  document.getElementById(fieldId + 'Error').textContent = message;
}

function clearError(fieldId) {
  document.getElementById(fieldId + 'Error').textContent = '';
}

function validateName() {
  const value = document.getElementById('name').value.trim();
  if (value === '') {
    showError('name', 'Full name is required.');
    return false;
  }
  clearError('name');
  return true;
}

function validateStudentId() {
  const value = document.getElementById('studentId').value.trim();
  const pattern = /^[0-9]{9}$/;
  if (value === '') {
    showError('studentId', 'Student ID is required.');
    return false;
  }
  if (!pattern.test(value)) {
    showError('studentId', 'Student ID must be exactly 9 digits.');
    return false;
  }
  clearError('studentId');
  return true;
}

function validateProgramme() {
  const value = programmeSelect.value;
  if (value === '') {
    showError('programme', 'Please select a programme.');
    return false;
  }
  clearError('programme');
  return true;
}

function validateCourse() {
  const value = courseSelect.value;
  if (value === '') {
    showError('course', 'Please select a course.');
    return false;
  }
  clearError('course');
  return true;
}

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const isNameValid = validateName();
  const isStudentIdValid = validateStudentId();
  const isProgrammeValid = validateProgramme();
  const isCourseValid = validateCourse();

  if (isNameValid && isStudentIdValid && isProgrammeValid && isCourseValid) {
    alert('Form is valid. In a real app, this would submit to a server.');
    form.reset();
    courseSelect.innerHTML = '<option value="">-- Select Programme First --</option>';
  }
});