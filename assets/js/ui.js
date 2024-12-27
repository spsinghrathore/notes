// GSAP Animations for smooth transitions on category selection
document.addEventListener("DOMContentLoaded", () => {
  gsap.from(".category", {
    opacity: 0,
    y: -50,
    stagger: 0.2,
    duration: 1
  });
});
