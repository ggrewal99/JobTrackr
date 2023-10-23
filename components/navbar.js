document.addEventListener("DOMContentLoaded", function () {
	const navbar = document.querySelector(".nav");

	navbar.innerHTML = `
        <div class="nav-title-div">
            <h1 class="nav--title-link">
                <a href="../index.html" class="nav--title-link"
                    >JobTrackr</a
                >
            </h1>
        </div>

        <div class="nav-links-div">
            <a
                href="../../pages/login.html"
                class="nav--links nav--login-link"
                >Log In</a
            >
            <a href="/pages/about.html" class="nav--links nav--about-link"
                >About</a
            >
            <a href="#footer--logos" class="nav--links nav--contact-link"
                >Contact</a
            >
        </div>
        <button class="btn-mobile-nav">
            <img
                class="icon-mobile-nav open"
                src="../assets/icons/icons8-menu-96.png"
            />
            <img
                class="icon-mobile-nav close"
                src="../assets/icons/icons8-close-96.png"
            />
        </button>
    `;

	const menu = document.querySelector(".btn-mobile-nav");
	const nav = document.querySelector(".nav");
	const logIn = document.querySelector(".nav--login-link");
	const about = document.querySelector(".nav--about-link");
	const contact = document.querySelector(".nav--contact-link");

	const setMenu = () => nav.classList.toggle("nav-open");
	menu.addEventListener("click", setMenu);
	logIn.addEventListener("click", setMenu);
	about.addEventListener("click", setMenu);
	contact.addEventListener("click", setMenu);
});
