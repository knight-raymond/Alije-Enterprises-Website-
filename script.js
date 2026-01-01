function init() {

    /* ================= CONFIG ================= */
    const encodedPhone = "OTE4NDc2MDE2OTU1"; // encoded number
    const AJAX_URL = "submit-enquiry.php";


    /* ================= FORM & BUTTONS ================= */
    const form = document.getElementById("enquiryForm");
    const whatsappBtn = document.getElementById("sendWhatsAppBtn");
    const emailBtn = document.getElementById("sendEmailBtn");


    /* ================= POPUP & LOADER ================= */
    const thanksPopup = document.getElementById("thanksPopup");
    const closeThanksBtn = document.getElementById("closeThanks");
    const formLoader = document.getElementById("formLoader");

    function showThanksPopup() {
        thanksPopup && thanksPopup.classList.add("show");
    }

    function closeThanksPopup() {
        thanksPopup && thanksPopup.classList.remove("show");
    }

    function showLoader() {
        formLoader && (formLoader.style.display = "block");
    }

    function hideLoader() {
        formLoader && (formLoader.style.display = "none");
    }

    function autoCloseThanks() {
        setTimeout(() => {
            closeThanksPopup();
            hideLoader();
        }, 30000);
    }

    closeThanksBtn && closeThanksBtn.addEventListener("click", closeThanksPopup);


    /* ================= FORM VALIDATION ================= */
    function validateForm() {
        let isValid = true;
        const fields = ["name", "email", "enqphone", "country", "message"];

        fields.forEach(id => {
            const input = document.getElementById(id);
            if (!input) return;

            const error = input.nextElementSibling;

            if (!input.value.trim()) {
                isValid = false;
                input.classList.add("input-error");
                error && (error.style.display = "block");
            } else {
                input.classList.remove("input-error");
                error && (error.style.display = "none");
            }
        });

        return isValid;
    }


    /* ================= FORM DATA ================= */
    function getFormData() {
        return {
            name: document.getElementById("name")?.value.trim() || "",
            email: document.getElementById("email")?.value.trim() || "",
            enqphone: document.getElementById("enqphone")?.value.trim() || "",
            country: document.getElementById("country")?.value.trim() || "",
            message: document.getElementById("message")?.value.trim() || ""
        };
    }


    /* ================= AJAX ================= */
    function ajaxSubmit(data, callback) {
        fetch(AJAX_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(callback)
        .catch(() => callback({ success: false }));
    }


    /* ================= WHATSAPP ================= */
    whatsappBtn && whatsappBtn.addEventListener("click", function (e) {
        e.preventDefault();
        if (!validateForm()) return;

        showLoader();
        const data = getFormData();
        const phone = atob(encodedPhone);

        ajaxSubmit(data, () => {
            const url =
                "https://wa.me/" + phone + "?text=" +
                "*Enquiry from Alije Group*%0A%0A" +
                "*Name:* " + data.name + "%0A" +
                "*Contact:* " + data.email + "%0A" +
                "*Whatsapp Number:* " + data.enqphone + "%0A" +
                "*Country:* " + data.country + "%0A" +
                "*Message:* " + data.message;

            showThanksPopup();
            autoCloseThanks();
            window.open(url, "_blank");
        });
    });


    /* ================= EMAIL ================= */
    emailBtn && emailBtn.addEventListener("click", function (e) {
        e.preventDefault();
        if (!validateForm()) return;

        showLoader();
        const data = getFormData();

        ajaxSubmit(data, () => {
            showThanksPopup();
            autoCloseThanks();
        });
    });


    /* ================= PREVENT FORM SUBMIT ================= */
    form && form.addEventListener("submit", e => e.preventDefault());


    /* ================= HEADER SHRINK ================= */
    const header = document.getElementById("header");
    header && window.addEventListener("scroll", () => {
        header.classList.toggle("shrink", window.scrollY > 50);
    });


    /* ================= SIDEBAR ================= */
    const sidebar = document.getElementById("sidebar");
    const openBtn = document.getElementById("openSidebar");
    const closeBtn = document.getElementById("closeSidebar");

    function openSidebar() {
        if (!sidebar) return;
        sidebar.classList.add("open");
        document.body.classList.add("no-scroll");
    }

    function closeSidebar() {
        if (!sidebar) return;
        sidebar.classList.remove("open");
        document.body.classList.remove("no-scroll");
    }

    openBtn && openBtn.addEventListener("click", openSidebar);
    closeBtn && closeBtn.addEventListener("click", closeSidebar);

    window.addEventListener("resize", () => {
        if (window.innerWidth > 920) closeSidebar();
    });


    /* ================= ACTIVE LINKS ================= */
    function setActiveLink() {
        const current = (location.pathname.split("/").pop() || "index.html").toLowerCase();
        document.querySelectorAll(".nav-links a, .sidebar a").forEach(link => {
            const href = link.getAttribute("href")?.split("/").pop().toLowerCase();
            link.classList.toggle("active-link", href === current);
        });
    }
    setActiveLink();


    /* ================= FAQ ================= */
    document.querySelectorAll(".faq-item").forEach(item => {
        const q = item.querySelector(".faq-question");
        const a = item.querySelector(".faq-answer");
        if (!q || !a) return;

        q.addEventListener("click", () => {
            item.classList.toggle("active");
            a.style.display = a.style.display === "block" ? "none" : "block";
        });
    });


    /* ================= FULLSCREEN IMAGE GALLERY ================= */
    const images = document.querySelectorAll(".photo-item img");
    const fullscreenView = document.getElementById("fullscreenView");
    const fullscreenImg = document.getElementById("fullscreenImg");
    const previewCloseBtn = document.getElementById("closeBtn");

    images.forEach(img => {
        img.addEventListener("click", () => {
            fullscreenImg.src = img.src;
            fullscreenView.classList.add("active");
        });
    });

    previewCloseBtn && previewCloseBtn.addEventListener("click", () => {
        fullscreenView.classList.remove("active");
    });

    fullscreenView && fullscreenView.addEventListener("click", e => {
        if (e.target === fullscreenView) fullscreenView.classList.remove("active");
    });


    /* ================= ESC KEY ================= */
    document.addEventListener("keydown", e => {
        if (e.key === "Escape") {
            fullscreenView && fullscreenView.classList.remove("active");
            closeSidebar();
        }
    });
}

/* ================= INIT ================= */
document.addEventListener("DOMContentLoaded", init);
