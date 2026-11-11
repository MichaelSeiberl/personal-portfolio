// Set the current year in the footer.
document.getElementById("year").textContent = new Date().getFullYear();

// Highlight the navigation link of the section currently in view.
// The active section is the last one whose top has passed just below the sticky
// navigation. At the very bottom of the page the last section is always active,
// because a short last section would otherwise never reach that line.
const nav = document.querySelector("nav");
const links = document.querySelectorAll("nav a");
const sections = document.querySelectorAll("main section");

// After a click on a navigation link, that section stays active until the user
// scrolls manually. Otherwise, on a short page, the last section would win
// even though another section was clicked.
let clickedId = null;

function updateActiveLink() {
  const line = nav.offsetHeight + 32;
  let current = null;

  sections.forEach((section) => {
    if (section.getBoundingClientRect().top <= line) {
      current = section;
    }
  });

  const atBottom =
    window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
  if (atBottom) {
    current = sections[sections.length - 1];
  }

  const activeId = clickedId || (current && current.id);

  links.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === "#" + activeId);
  });
}

links.forEach((link) => {
  link.addEventListener("click", () => {
    clickedId = link.getAttribute("href").slice(1);
    updateActiveLink();
  });
});

["wheel", "touchmove", "keydown"].forEach((type) => {
  window.addEventListener(
    type,
    () => {
      clickedId = null;
    },
    { passive: true }
  );
});

window.addEventListener("scroll", updateActiveLink, { passive: true });
window.addEventListener("resize", updateActiveLink);
updateActiveLink();
