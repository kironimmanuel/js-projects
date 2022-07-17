// Intersection Observer, Fade in animation
// 1
const faders = document.querySelectorAll('.fade__in');
const appearOptions = {
  threshold: 0,
  rootMargin: '0px 0px -80px 0px',
};

const appearOnScroll = new IntersectionObserver(function (
  entries,
  appearOnScroll
) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      return;
    } else {
      entry.target.classList.add('appear');
      appearOnScroll.unobserve(entry.target);
    }
  });
},
appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});

// 2
const fadersIcon = document.querySelectorAll('.fade__in__long');
const appearOptionsIcon = {
  threshold: 0,
  rootMargin: '0px 0px -80px 0px',
};

const appearOnScrollIcon = new IntersectionObserver(function (
  entries,
  appearOnScrollIcon
) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      return;
    } else {
      entry.target.classList.add('appear');
      appearOnScrollIcon.unobserve(entry.target);
    }
  });
},
appearOptionsIcon);

fadersIcon.forEach(fader => {
  appearOnScrollIcon.observe(fader);
});

// 3
const faders3 = document.querySelectorAll('.fade__in__3');
const appearOptions3 = {
  threshold: 0,
  rootMargin: '0px 0px -80px 0px',
};

const appearOnScroll3 = new IntersectionObserver(function (
  entries,
  appearOnScroll3
) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      return;
    } else {
      entry.target.classList.add('appear');
      appearOnScroll3.unobserve(entry.target);
    }
  });
},
appearOptions3);

faders3.forEach(fader => {
  appearOnScroll3.observe(fader);
});

// 4
const faders4 = document.querySelectorAll('.fade__in__4');
const appearOptions4 = {
  threshold: 0,
  rootMargin: '0px 0px -80px 0px',
};

const appearOnScroll4 = new IntersectionObserver(
  function (entries, appearOnScroll4) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      } else {
        entry.target.classList.add('appear');
        appearOnScroll4.unobserve(entry.target);
      }
    });
  },

  appearOptionsIcon
);

faders4.forEach(fader => {
  appearOnScroll4.observe(fader);
});
