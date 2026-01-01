function init() {

    /* ================= ENQUIRY CONFIG ================= */
    let encodedPhone = "OTE4NDc2MDE2OTU1"; // encoded 918476016955


    /* ================= THANK YOU POPUP ================= */
    const thanksPopup = document.getElementById("thanksPopup");
    const closeThanksBtn = document.getElementById("closeThanks");
    const formLoader = document.getElementById("formLoader");

    function showThanksPopup() {
        if (!thanksPopup) return;
        thanksPopup.classList.add("show");
    }

    function closeThanksPopup() {
        if (!thanksPopup) return;
        thanksPopup.classList.remove("show");
    }

    function autoCloseThanks() {
        setTimeout(() => {
            closeThanksPopup();
            hideLoader();
        }, 3000);
    }

    closeThanksBtn && closeThanksBtn.addEventListener("click", closeThanksPopup);


    /* ================= LOADER ================= */
    function showLoader() {
        if (formLoader) formLoader.style.display = "block";
    }

    function hideLoader() {
        if (formLoader) formLoader.style.display = "none";
    }


    /* ================= FORM VALIDATION ================= */
    function validateForm() {
        let isValid = true;
        const fields = ["name", "email", "enqphone", "country", "message"];

        fields.forEach(id => {
            const input = document.getElementById(id);
            if (!input) return;

            const error = input.nextElementSibling;

            if (input.value.trim() === "") {
                isValid = false;
                input.classList.add("input-error");
                if (error) error.style.display = "block";
            } else {
                input.classList.remove("input-error");
                if (error) error.style.display = "none";
            }
        });

        return isValid;
    }


    /* ================= WHATSAPP SUBMIT ================= */
    window.sendWhatsApp = function () {
        if (!validateForm()) return;

        showLoader();

        let phone = atob(encodedPhone);

        let name = document.getElementById("name")?.value || "";
        let email = document.getElementById("email")?.value || "";
        let enqphone = document.getElementById("enqphone")?.value || "";
        let country = document.getElementById("country")?.value || "";
        let message = document.getElementById("message")?.value || "";

        let url = "https://wa.me/" + phone + "?text=" +
            "*Enquiry from Alije Group*%0A%0A" +
            "*Name:* " + name + "%0A" +
            "*Contact:* " + email + "%0A" +
            "*Whatsapp Number:* " + enqphone + "%0A" +
            "*Country:* " + country + "%0A" +
            "*Message:* " + message;

        showThanksPopup();
        autoCloseThanks();

        window.open(url, "_blank");
    };


    /* ================= EMAIL SUBMIT ================= */
    window.sendEmail = function () {
        if (!validateForm()) return;

        showLoader();

        let name = encodeURIComponent(document.getElementById("name")?.value || "");
        let email = encodeURIComponent(document.getElementById("email")?.value || "");
        let enqphone = encodeURIComponent(document.getElementById("enqphone")?.value || "");
        let country = encodeURIComponent(document.getElementById("country")?.value || "");
        let message = encodeURIComponent(document.getElementById("message")?.value || "");

        let mailTo =
            "mailto:enterprisesalije@gmail.com" +
            "?subject=Alije Group Enquiry from : " + name +
            "&body=Email: " + email +
            "%0AWhatsapp Number: " + enqphone +
            "%0ACountry: " + country +
            "%0A%0AMessage:%0A" + message;

        showThanksPopup();
        autoCloseThanks();

        window.location.href = mailTo;
    };


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


    /* ================= ACTIVE LINK ================= */
    function setActiveLink() {
        const current = (location.pathname.split("/").pop() || "index.html").toLowerCase();
        document.querySelectorAll(".nav-links a, .sidebar a").forEach(a => {
            const href = a.getAttribute("href")?.split("/").pop().toLowerCase();
            a.classList.toggle("active-link", href === current);
        });
    }
    setActiveLink();


    /* ================= FAQ ================= */
    document.querySelectorAll(".faq-item").forEach(item => {
        const q = item.querySelector(".faq-question");
        const a = item.querySelector(".faq-answer");

        q && q.addEventListener("click", () => {
            item.classList.toggle("active");
            a.style.display = a.style.display === "block" ? "none" : "block";
        });
    });


    /* ================= FULLSCREEN IMAGE PREVIEW ================= */
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
        if (e.target === fullscreenView) {
            fullscreenView.classList.remove("active");
        }
    });

    document.addEventListener("keydown", e => {
        if (e.key === "Escape") {
            fullscreenView && fullscreenView.classList.remove("active");
            closeSidebar();
        }
    });

}

/* INIT ON LOAD */
document.addEventListener("DOMContentLoaded", init);
