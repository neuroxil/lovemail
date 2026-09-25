/*
|--------------------------------------------------------------------------
| DATE INVITATION — FRONTEND
|--------------------------------------------------------------------------
*/

const $ = (selector) =>
  document.querySelector(selector);


/* -----------------------------------------------------------------------
   Elements
------------------------------------------------------------------------ */

const card = $("#card");
const particles = $("#particles");

const questionScreen = $("#question-screen");
const placeScreen = $("#place-screen");
const dateScreen = $("#date-screen");
const timeScreen = $("#time-screen");
const finalScreen = $("#final-screen");

const buttonArea = $("#button-area");

const yesButton = $("#yes-button");
const noButton = $("#no-button");
const noMessage = $("#no-message");

const placeInput = $("#place-input");
const dateInput = $("#date-input");
const timeInput = $("#time-input");

const placeNext = $("#place-next");
const dateNext = $("#date-next");
const timeSubmit = $("#time-submit");

const finalPlace = $("#final-place");
const finalDate = $("#final-date");
const finalTime = $("#final-time");


/* -----------------------------------------------------------------------
   State
------------------------------------------------------------------------ */

const state = {
  place: "",
  date: "",
  time: ""
};


/* -----------------------------------------------------------------------
   Helpers
------------------------------------------------------------------------ */

function random(min, max) {
  return Math.random() * (max - min) + min;
}


function showScreen(screen) {
  document
    .querySelectorAll(".screen")
    .forEach((element) => {
      element.classList.remove("active");
    });

  screen.classList.add("active");

  card.animate(
    [
      {
        opacity: 0,
        transform: "translateY(18px) scale(.97)"
      },
      {
        opacity: 1,
        transform: "translateY(0) scale(1)"
      }
    ],
    {
      duration: 400,
      easing: "cubic-bezier(.16,1,.3,1)"
    }
  );
}


function shake(element) {
  element.animate(
    [
      { transform: "translateX(0)" },
      { transform: "translateX(-8px)" },
      { transform: "translateX(8px)" },
      { transform: "translateX(-5px)" },
      { transform: "translateX(5px)" },
      { transform: "translateX(0)" }
    ],
    {
      duration: 300,
      easing: "ease-out"
    }
  );
}


/* -----------------------------------------------------------------------
   NO BUTTON
   -----------------------------------------------------------------------
   The important part:
   The NO button lives inside .buttons.
   We calculate its position relative to that container.

   We also reserve the left side for YES, so NO can NEVER land
   directly on top of the YES button.
------------------------------------------------------------------------ */

let noAttempts = 0;

const noMessages = [
  "that's not really an option 😭",
  "nice try",
  "you almost got it",
  "wrong button 💀",
  "the button is shy",
  "bro just press YES",
  "why are we doing this 😭",
  "come onnn 🥺",
  "you can't escape"
];

const noTexts = [
  "no",
  "really?",
  "are you sure?",
  "hmm...",
  "nice try",
  "nope",
  "try again",
  "still no?",
  "😭"
];


function moveNoButton() {
  noAttempts++;

  const areaWidth = buttonArea.clientWidth;
  const areaHeight = buttonArea.clientHeight;

  const buttonWidth = noButton.offsetWidth;
  const buttonHeight = noButton.offsetHeight;

  /*
   * YES occupies approximately the left/middle part
   * of the button area.
   *
   * Therefore NO gets its own zone on the right.
   */

  const yesRect =
    yesButton.getBoundingClientRect();

  const areaRect =
    buttonArea.getBoundingClientRect();

  const yesLeft =
    yesRect.left - areaRect.left;

  const yesRight =
    yesRect.right - areaRect.left;

  const padding = 8;
  const separation = 18;

  /*
   * Available zones:
   *
   * 0 ------------------------------ width
   *
   *       YES
   *       ████
   *
   *                         NO
   *                         ███
   *
   * NO is only allowed to spawn to the right
   * of YES.
   */

  const minX =
    Math.max(
      padding,
      yesRight + separation
    );

  const maxX =
    Math.max(
      minX,
      areaWidth -
        buttonWidth -
        padding
    );

  /*
   * If the screen is narrow and there isn't enough
   * space to the right, use the LEFT side instead.
   */

  let x;

  if (
    maxX >= minX &&
    maxX - minX > 10
  ) {
    x = random(minX, maxX);
  } else {
    const leftMax =
      Math.max(
        padding,
        yesLeft -
          buttonWidth -
          separation
      );

    x = random(
      padding,
      Math.max(
        padding,
        leftMax
      )
    );
  }

  const maxY =
    Math.max(
      padding,
      areaHeight -
        buttonHeight -
        padding
    );

  const y =
    random(
      padding,
      maxY
    );

  /*
   * Gradually shrink the NO button.
   */

  const scale =
    Math.max(
      0.55,
      1 - noAttempts * 0.035
    );

  const rotation =
    random(-10, 10);

  noButton.style.left =
    `${x}px`;

  noButton.style.top =
    `${y}px`;

  noButton.style.transform =
    `rotate(${rotation}deg) scale(${scale})`;

  noButton.textContent =
    noTexts[
      Math.min(
        noAttempts,
        noTexts.length - 1
      )
    ];

  noMessage.textContent =
    noMessages[
      Math.min(
        noAttempts - 1,
        noMessages.length - 1
      )
    ];

  noMessage.classList.add("show");

  /*
   * Little wiggle.
   */

  noButton.animate(
    [
      {
        transform:
          `rotate(${rotation}deg) scale(${scale}) translateX(0)`
      },
      {
        transform:
          `rotate(${rotation}deg) scale(${scale}) translateX(-5px)`
      },
      {
        transform:
          `rotate(${rotation}deg) scale(${scale}) translateX(5px)`
      },
      {
        transform:
          `rotate(${rotation}deg) scale(${scale}) translateX(0)`
      }
    ],
    {
      duration: 220,
      easing: "ease-out"
    }
  );
}


/*
 * Desktop:
 * Move when mouse approaches.
 */

noButton.addEventListener(
  "mouseenter",
  moveNoButton
);


/*
 * Touch / mobile:
 * Move immediately when touched.
 */

noButton.addEventListener(
  "pointerdown",
  (event) => {
    event.preventDefault();
    moveNoButton();
  }
);


/*
 * Just in case click happens.
 */

noButton.addEventListener(
  "click",
  (event) => {
    event.preventDefault();
    moveNoButton();
  }
);


/* -----------------------------------------------------------------------
   YES
------------------------------------------------------------------------ */

yesButton.addEventListener(
  "click",
  () => {

    createBurst(
      window.innerWidth / 2,
      window.innerHeight / 2
    );

    setTimeout(() => {

      showScreen(placeScreen);

      placeInput.focus();

    }, 250);
  }
);


/* -----------------------------------------------------------------------
   PLACE
------------------------------------------------------------------------ */

placeNext.addEventListener(
  "click",
  () => {

    const value =
      placeInput.value.trim();

    if (!value) {
      shake(placeInput);
      placeInput.focus();
      return;
    }

    state.place = value;

    showScreen(dateScreen);

    setMinimumDate();

    setTimeout(() => {
      dateInput.focus();
    }, 300);
  }
);


/* -----------------------------------------------------------------------
   DATE
------------------------------------------------------------------------ */

function setMinimumDate() {

  const now =
    new Date();

  const year =
    now.getFullYear();

  const month =
    String(
      now.getMonth() + 1
    ).padStart(2, "0");

  const day =
    String(
      now.getDate()
    ).padStart(2, "0");

  dateInput.min =
    `${year}-${month}-${day}`;
}


dateNext.addEventListener(
  "click",
  () => {

    const value =
      dateInput.value;

    if (!value) {
      shake(dateInput);
      dateInput.focus();
      return;
    }

    state.date = value;

    showScreen(timeScreen);

    setTimeout(() => {
      timeInput.focus();
    }, 300);
  }
);


/* -----------------------------------------------------------------------
   TIME
------------------------------------------------------------------------ */

timeSubmit.addEventListener(
  "click",
  () => {

    const value =
      timeInput.value;

    if (!value) {
      shake(timeInput);
      timeInput.focus();
      return;
    }

    state.time = value;

    /*
     * IMPORTANT:
     *
     * We do NOT call fetch() here.
     *
     * This means the site works perfectly when opening
     * index.html directly.
     */

    showFinal();
  }
);


/* -----------------------------------------------------------------------
   FINAL SCREEN
------------------------------------------------------------------------ */

function showFinal() {

  finalPlace.textContent =
    state.place;

  finalDate.textContent =
    formatDate(state.date);

  finalTime.textContent =
    formatTime(state.time);

  showScreen(finalScreen);

  celebration();
}


/* -----------------------------------------------------------------------
   Formatting
------------------------------------------------------------------------ */

function formatDate(value) {

  const date =
    new Date(
      `${value}T12:00:00`
    );

  return new Intl.DateTimeFormat(
    "en-US",
    {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric"
    }
  ).format(date);
}


function formatTime(value) {

  const [
    hours,
    minutes
  ] = value
    .split(":")
    .map(Number);

  const date =
    new Date();

  date.setHours(
    hours,
    minutes,
    0,
    0
  );

  return new Intl.DateTimeFormat(
    "en-US",
    {
      hour: "numeric",
      minute: "2-digit"
    }
  ).format(date);
}


/* -----------------------------------------------------------------------
   Floating particles
------------------------------------------------------------------------ */

const particleSymbols = [
  "❤️",
  "💕",
  "💗",
  "💖",
  "🦋",
  "✨",
  "✦",
  "♡",
  "🌸",
  "🌷"
];


function createAmbientParticle() {

  const particle =
    document.createElement("div");

  particle.className =
    "particle";

  particle.textContent =
    particleSymbols[
      Math.floor(
        Math.random() *
        particleSymbols.length
      )
    ];

  particle.style.left =
    `${Math.random() * 100}%`;

  particle.style.fontSize =
    `${random(12, 26)}px`;

  particle.style.setProperty(
    "--drift",
    `${random(-120, 120)}px`
  );

  particle.style.setProperty(
    "--rotation",
    `${random(-180, 180)}deg`
  );

  particle.style.animationDuration =
    `${random(7, 14)}s`;

  particles.appendChild(
    particle
  );

  setTimeout(() => {
    particle.remove();
  }, 15000);
}


setInterval(
  createAmbientParticle,
  550
);


/* -----------------------------------------------------------------------
   Burst
------------------------------------------------------------------------ */

function createBurst(x, y) {

  const symbols = [
    "💗",
    "💕",
    "💖",
    "✨",
    "🦋"
  ];

  for (
    let i = 0;
    i < 35;
    i++
  ) {

    const particle =
      document.createElement("div");

    particle.textContent =
      symbols[
        Math.floor(
          Math.random() *
          symbols.length
        )
      ];

    particle.style.position =
      "fixed";

    particle.style.left =
      `${x}px`;

    particle.style.top =
      `${y}px`;

    particle.style.zIndex =
      "9999";

    particle.style.pointerEvents =
      "none";

    particle.style.fontSize =
      `${random(16, 30)}px`;

    document.body.appendChild(
      particle
    );

    const angle =
      Math.random() *
      Math.PI *
      2;

    const distance =
      random(80, 260);

    const endX =
      Math.cos(angle) *
      distance;

    const endY =
      Math.sin(angle) *
      distance;

    particle.animate(
      [
        {
          opacity: 1,
          transform:
            "translate(-50%, -50%) scale(.4)"
        },
        {
          opacity: 1,
          transform:
            `translate(
              calc(-50% + ${endX / 2}px),
              calc(-50% + ${endY / 2}px)
            )
            scale(1.1)`
        },
        {
          opacity: 0,
          transform:
            `translate(
              calc(-50% + ${endX}px),
              calc(-50% + ${endY}px)
            )
            scale(.7)`
        }
      ],
      {
        duration:
          random(700, 1300),

        easing:
          "cubic-bezier(.16,1,.3,1)"
      }
    ).finished.then(() => {
      particle.remove();
    });
  }
}


/* -----------------------------------------------------------------------
   Celebration
------------------------------------------------------------------------ */

function celebration() {

  const interval =
    setInterval(() => {

      createBurst(
        random(
          window.innerWidth * 0.2,
          window.innerWidth * 0.8
        ),
        random(
          window.innerHeight * 0.2,
          window.innerHeight * 0.8
        )
      );

    }, 400);

  setTimeout(() => {
    clearInterval(interval);
  }, 2400);
}


/* -----------------------------------------------------------------------
   Mouse parallax
------------------------------------------------------------------------ */

if (
  window.matchMedia(
    "(pointer: fine)"
  ).matches
) {

  window.addEventListener(
    "mousemove",
    (event) => {

      const x =
        event.clientX /
        window.innerWidth -
        0.5;

      const y =
        event.clientY /
        window.innerHeight -
        0.5;

      card.style.transform =
        `perspective(1000px)
         rotateX(${y * -3}deg)
         rotateY(${x * 3}deg)`;
    }
  );

  window.addEventListener(
    "mouseleave",
    () => {
      card.style.transform = "";
    }
  );
}


/* -----------------------------------------------------------------------
   Keyboard
------------------------------------------------------------------------ */

document.addEventListener(
  "keydown",
  (event) => {

    if (
      event.key === "Enter" &&
      document.activeElement === placeInput
    ) {
      placeNext.click();
    }

    if (
      event.key === "Enter" &&
      document.activeElement === dateInput
    ) {
      dateNext.click();
    }

    if (
      event.key === "Enter" &&
      document.activeElement === timeInput
    ) {
      timeSubmit.click();
    }
  }
);


/* -----------------------------------------------------------------------
   Initial particles
------------------------------------------------------------------------ */

for (
  let i = 0;
  i < 10;
  i++
) {

  setTimeout(
    createAmbientParticle,
    i * 200
  );
}