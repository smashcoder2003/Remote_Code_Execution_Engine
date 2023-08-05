function toggleDarkMode() {
    const body = document.body;
    const header = document.querySelector("header");
    const containers = document.querySelectorAll(".editor-container, .output-container");
    const textarea = document.getElementById("codeInput");
    const pre = document.getElementById("output");

    // Toggle dark mode class on the necessary elements
    body.classList.toggle("dark-mode");
    header.classList.toggle("dark-mode");
    containers.forEach(container => container.classList.toggle("dark-mode"));
    textarea.classList.toggle("dark-mode");
    pre.classList.toggle("dark-mode");
}
