const icons = document.querySelectorAll('[data-framer-name="Phone"] [data-framer-name="Icon"]');

for (const icon of icons) {
  icon.setAttribute("role", "button");
  icon.setAttribute("aria-expanded", "false");
  icon.setAttribute("aria-label", "Menu");
  const toggle = () => {
    const root = icon.closest(".framer-ozFmz");
    if (!root) return;
    const open = root.classList.contains("framer-v-g1p9jp");
    root.classList.toggle("framer-v-g1p9jp", !open);
    root.classList.toggle("framer-v-162syqf", open);
    icon.setAttribute("aria-expanded", open ? "false" : "true");
  };
  icon.addEventListener("click", toggle);
  icon.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggle();
    }
  });
}
