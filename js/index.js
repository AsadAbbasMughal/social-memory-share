AOS.init({
  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 120, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 700, // values from 0 to 3000, with step 50ms
  easing: 'ease', // default easing for AOS animations
  once: false, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

});

// document.getElementById("toggleDarkMode").addEventListener("click", () => {
//   document.body.classList.toggle("dark-mode");

//   // Save preference in localStorage
//   if (document.body.classList.contains("dark-mode")) {
//       localStorage.setItem("darkMode", "enabled");
//   } else {
//       localStorage.setItem("darkMode", "disabled");
//   }
// });

// // Check user preference on load
// if (localStorage.getItem("darkMode") === "enabled") {
//   document.body.classList.add("dark-mode");
// }

const toggleTheme = () => {
  let currentTheme = document.documentElement.getAttribute("data-theme");
  
  if (currentTheme === "dark") {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
  } else {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);
});
