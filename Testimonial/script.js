const data = [
  {
    quote: `"Very simple to use, greate
          automation and keeps me on track with all I need to do.
          I also like that it can be shared with others."`,
    name: "Terry Ivans",
    position: "Project mananger",
    imageSrc: "./assets/logo.png",
    imageAlt: "Trello",
  },
  {
    quote: `"Very intuitive with Git, great
             version control and keeps my workflow organized.
             I love how easy it is to share repositories and 
             collaborate with others."`,
    name: "Luis Duarte",
    position: "Tech Lead",
    imageSrc: "./assets/gitlogo.png",
    imageAlt: "Git",
  },
  {
    quote: `"Git integration is seamless and reliable,
             branching and merging are straightforward.
             Perfect for teams working on complex projects."`,
    name: "María Fernández",
    position: "Software Engineer",
    imageSrc: "./assets/figma.png",
    imageAlt: "Figma",
  },
  {
    quote: `"Helps me track changes efficiently,
             the history is clear and easy to manage.
             A must-have tool for any developer."`,
    name: "Carlos Mendoza",
    position: "Full Stack Developer",
    imageSrc: "./assets/js.png",
    imageAlt: "JavaScript",
  },
];

let counter = 0;

function updateCard(data) {
  const { quote, name, position, imageSrc, imageAlt } = data;

  const img = document.querySelector(".card__picture img");
  const text = document.querySelector(".card__text");
  const userBox = document.querySelector(".card__user-name");

  // Step 1: Animate out to the left
  // img.classList.add("card--hidden-left");
  text.classList.add("card--hidden-left");
  userBox.classList.add("card--hidden-left");

  // Step 2: Wait for the exit animation to finish (500ms)
  img.classList.add("img-hidden");
  setTimeout(() => {
    // Reset position: set up for entry from the right
    // img.classList.remove("card--hidden-left");
    text.classList.remove("card--hidden-left");
    userBox.classList.remove("card--hidden-left");

    // img.classList.add("card--hidden-right");
    text.classList.add("card--hidden-right");
    userBox.classList.add("card--hidden-right");

    // Change the content while the elements are hidden off-screen to the right
    img.src = imageSrc;
    img.alt = imageAlt;
    text.textContent = quote;
    userBox.querySelector(".card__name").textContent = name;
    userBox.querySelector(".card__position").textContent = position;

    img.onload = () => {
      img.classList.remove("img-hidden");
    };

    // Force a reflow to ensure the browser applies the new classes (optional)
    void text.offsetWidth;
    void userBox.offsetWidth;

    // Step 3: Animate in from the right
    setTimeout(() => {
      img.classList.remove("card--hidden-right");
      text.classList.remove("card--hidden-right");
      userBox.classList.remove("card--hidden-right");
    }, 50); // a small delay to allow the entry transition to trigger
  }, 500); // this duration must match the exit transition duration
}

/* Dots */
const dots = document.querySelectorAll(".card__dot");

const btnLeft = document.getElementById("left");
const btnRight = document.getElementById("right");
const numberOfQuotes = data.length;

btnRight.addEventListener("click", () => {
  const currentQuote = (counter + 1) % numberOfQuotes;

  updateCard(data[currentQuote]);
  updateDot(currentQuote);
  counter++;
});

btnLeft.addEventListener("click", () => {
  let currentQuote = (counter - 1) % numberOfQuotes;

  if (currentQuote === -1) {
    currentQuote = 3;
    updateCard(data[currentQuote]);
    updateDot(currentQuote);

    counter = 3;
    return;
  }

  updateCard(data[currentQuote]);
  updateDot(currentQuote);
  counter--;
});

function updateDot(currentElement) {
  dots.forEach((dotElement) => {
    if (dotElement.classList.contains("card__dot--selected")) {
      dotElement.classList.remove("card__dot--selected");
    }
  });

  dots[currentElement].classList.add("card__dot--selected");
}
