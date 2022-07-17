document.addEventListener('keydown', keyboardInputHandler);

function keyboardInputHandler(e) {
  let res = document.getElementById('result');

  if (e.key === '0') {
    res.value += '0';
  } else if (e.key === '1') {
    res.value += '1';
  } else if (e.key === '2') {
    res.value += '2';
  } else if (e.key === '3') {
    res.value += '3';
  } else if (e.key === '4') {
    res.value += '4';
  } else if (e.key === '5') {
    res.value += '5';
  } else if (e.key === '6') {
    res.value += '6';
  } else if (e.key === '7') {
    res.value += '7';
  } else if (e.key === '7') {
    res.value += '7';
  } else if (e.key === '8') {
    res.value += '8';
  } else if (e.key === '9') {
    res.value += '9';
  }

  if (e.key === '+') {
    res.value += '+';
  } else if (e.key === '-') {
    res.value += '-';
  } else if (e.key === '*') {
    res.value += '*';
  } else if (e.key === '/') {
    res.value += '/';
  }

  if (e.key === '.') {
    res.value += '.';
  }

  if (e.key === 'Enter') {
    res.value = eval(result.value || null);
  }

  if (e.key === 'Backspace') {
    let resultInput = res.value;

    res.value = resultInput.substring(0, res.value.length - 1);
  }
}

function clearScreen() {
  document.getElementById('result').value = '';
}

function liveScreen(value) {
  let res = document.getElementById('result');
  if (!res.value) {
    res.value = '';
  }
  res.value += value;
}

const toggleBtn = document.getElementById('dark-mode');

toggleBtn.addEventListener('click', () => {
  document.documentElement.classList.toggle('dark-theme');
  if (toggleBtn.innerHTML.includes('Dark')) {
    toggleBtn.innerHTML = `Light Mode <i class="fa-regular fa-lightbulb"></i></i>`;
  } else if (toggleBtn.innerHTML.includes('Light')) {
    toggleBtn.innerHTML = `Dark Mode <i class="fa-regular fa-moon"></i>`;
  }
});
