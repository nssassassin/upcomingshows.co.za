const menuIcon = document.querySelector(".menuIcon");
const menuIcons = document.querySelectorAll(".menuIcon .line");
const navLinks = document.querySelector(".nav-links");
const items = document.querySelectorAll(".nav-links li");
const logo = document.querySelector(".logo");
menuIcon.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  logo.classList.toggle("close");
  items.forEach((item) => {
    item.classList.toggle("fade");
  });
  menuIcons.forEach((Icon) => {
    Icon.classList.toggle("open");
  });
});

const menu = document.querySelector(".nav-links");
const menuItems = document.querySelectorAll(".nav-links li");

menuItems.forEach((item) => {
  item.addEventListener("click", function () {
    menu.querySelector(".active").classList.remove("active");
    item.classList.add("active");
  });
});