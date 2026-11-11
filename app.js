// Set the current year in the footer.
document.getElementById("year").textContent = new Date().getFullYear();

// Highlight the navigation link of the section currently in view.
const links = document.querySelectorAll("nav a");
const sections = document.querySelectorAll("main section");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          links.forEach((link) => {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === "#" + entry.target.id
            );
          });
        }
      });
    },
    { rootMargin: "-30% 0px -60% 0px" }
  );

  sections.forEach((section) => observer.observe(section));
}
