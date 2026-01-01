function init() {

    /* ================= CONFIG ================= */
    let encodedPhone = "OTE4NDc2MDE2OTU1"; // encoded 918476016955
    const AJAX_URL = "submit-enquiry.php"; // 🔁 change to your backend URL


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
        }, 3000);
    }

    closeThanksBtn && closeThanksBtn.addEventListener("click", closeThanksPopup);


    /* ================= VALIDATION ================= */
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


    /* ================= AJAX SUBMIT ================= */
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
    window.sendWhatsApp = function () {
        if (!validateForm()) return;

        showLoader();

        let phone = atob(encodedPhone);
        let data = getFormData();

        ajaxSubmit(data, () => {
            let url = "https://wa.me/" + phone + "?text=" +
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
    };


    /* ================= EMAIL ================= */
    window.sendEmail = function () {
        if (!validateForm()) return;

        showLoader();
        let data = getFormData();

        ajaxSubmit(data, () => {
            showThanksPopup();
            autoCloseThanks();
        });
    };


    /* ================= FORM DATA ================= */
    function getFormData() {
        return {
            name: document.getElementById("name")?.value || "",
            email: document.getElementById("email")?.value || "",
            enqphone: document.getElementById("enqphone")?.value || "",
            country: document.getElementById("country")?.value || "",
            message: document.getElementById("message")?.value || ""
        };
    }


    /* ================= HEADER ================= */
    const header = document.getElementById("header");
    header && window.addEventListener("scroll", () => {
        header.classList.toggle("shrink", window.scrollY > 50);
    });


    /* ================= SIDEBAR ================= */
    const sidebar = document.getElementById("sidebar");
    const openBtn = document.getElementById("openSidebar");
    const closeBtn = document.getElementById("closeSidebar");

    function openSidebar() {
        sidebar && sidebar.classList.add("open");
        document.body.classList.add("no-scroll");
    }

    function closeSidebar() {
        sidebar && sidebar.classList.remove("open");
        document.body.classList.remove("no-scroll");
    }

    openBtn && openBtn.addEventListener("click", openSidebar);
    closeBtn && closeBtn.addEventListener("click", closeSidebar);

    window.addEventListener("resize", () => {
        window.innerWidth > 920 && closeSidebar();
    });


    /* ================= ACTIVE LINKS ================= */
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


    /* ================= FULLSCREEN GALLERY ================= */
    const images = document.querySelectorAll(".photo-item img");
    const fullscreenView = document.getElementById("fullscreenView");
    const fullscreenImg = document.getElementById("fullscreenImg");
    const previewCloseBtn = document.getElementById("previewcloseBtn");

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

    document.addEventListener("keydown", e => {
        if (e.key === "Escape") {
            fullscreenView && fullscreenView.classList.remove("active");
            closeSidebar();
        }
    });
}

/* INIT */
document.addEventListener("DOMContentLoaded", init);
