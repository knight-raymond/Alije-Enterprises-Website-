let encodedPhone = "OTE4NDc2MDE2OTU1";  // encoded +918476016955

function sendWhatsApp() {
    let phone = atob(encodedPhone);

    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var enqphone = document.getElementById("enqphone").value;
    var country = document.getElementById("country").value;
    var message = document.getElementById("message").value;

    var url = "https://wa.me/" + phone + "?text=" +
        "*Enquiry from Alije Enterprises*" + "%0A%0A" +
        "*Name:* " + name + "%0A" +
        "*Contact:* " + email + "%0A" +
        "*Whatsapp Number:* " + enqphone + "%0A" +
        "*Country:* " + country + "%0A" +
        "*Message:* " + message;

    window.open(url, "_blank");
}

function sendEmail() {
    var name = encodeURIComponent(document.getElementById("name").value);
    var email = encodeURIComponent(document.getElementById("email").value);
    var enqphone = encodeURIComponent(document.getElementById("enqphone").value);
    var country = encodeURIComponent(document.getElementById("country").value);
    var message = encodeURIComponent(document.getElementById("message").value);

    var mailTo = "mailto:enterprisesalije@gmail.com"
        + "?subject=Alije Enterprises Enquiry from : " + name
        + "&body=Email: " + email
        + "%0AWhatsapp Number: " + enqphone
        + "%0ACountry: " + country
        + "%0A%0AMessage:%0A" + message;

    window.location.href = mailTo;
}

// ================= Header Shrink on Scroll =================
const header = document.getElementById("header");

function onScroll() {
    if (window.scrollY > 50) {
        header.classList.add("shrink");
    } else {
        header.classList.remove("shrink");
    }
}
window.addEventListener("scroll", onScroll);

// ================= Sidebar Toggle =================
const sidebar = document.getElementById("sidebar");
const openBtn = document.getElementById("openSidebar");
const closeBtn = document.getElementById("closeSidebar");

function openSidebar() {
    sidebar.classList.add("open");
    sidebar.setAttribute("aria-hidden", "false");
    document.documentElement.classList.add("no-scroll");
    document.body.classList.add("no-scroll");
}

function closeSidebar() {
    sidebar.classList.remove("open");
    sidebar.setAttribute("aria-hidden", "true");
    document.documentElement.classList.remove("no-scroll");
    document.body.classList.remove("no-scroll");
}

function toggleSidebar() {
    if (sidebar.classList.contains("open")) closeSidebar();
    else openSidebar();
}

if (openBtn) openBtn.addEventListener("click", toggleSidebar);
if (closeBtn) closeBtn.addEventListener("click", closeSidebar);

window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeSidebar();
});
window.addEventListener("resize", () => {
    if (window.innerWidth > 920) closeSidebar();
});

// ================= Active Link Highlight =================
const navLinks = document.querySelectorAll(".nav-links a");
const sidebarLinks = document.querySelectorAll(".sidebar a");

function setActiveLink() {
    const current = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    const allLinks = document.querySelectorAll(".nav-links a, .sidebar a");

    allLinks.forEach(a => {
        a.classList.remove("active-link");
        const href = a.getAttribute("href");
        if (!href) return;

        const url = href.split("?")[0].split("#")[0].split("/").pop().toLowerCase();
        if (url === current || (current === "index.html" && (url === "" || url === "index.html"))) {
            a.classList.add("active-link");
        }
    });
}
setActiveLink();

navLinks.forEach(a =>
    a.addEventListener("click", () => {
        if (window.innerWidth <= 920) closeSidebar();
    })
);
sidebarLinks.forEach(a => a.addEventListener("click", closeSidebar));

// ================= FAQ Toggle =================
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    question.addEventListener("click", () => {
        item.classList.toggle("active");
        answer.style.display = answer.style.display === "block" ? "none" : "block";
    });
});
});