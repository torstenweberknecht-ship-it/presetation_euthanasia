const links = document.querySelectorAll(".nav-link");
const sections = [...links]
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const setActive = () => {
  const offset = window.scrollY + 120;
  let current = sections[0];

  for (const section of sections) {
    if (section.offsetTop <= offset) {
      current = section;
    }
  }

  links.forEach((link) => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${current.id}`
    );
  });
};

window.addEventListener("scroll", setActive, { passive: true });
setActive();
