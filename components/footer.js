document.addEventListener("DOMContentLoaded", function () {
	const footer = document.querySelector(".footer");

	footer.innerHTML = `
        <div class="footer-content">
            <h1 class="footer--title">JobTrackr</h1>
            <div class="footer--links">
                <a href="/pages/about.html" class="footer--links-about"
                    >About</a
                >
                <a href="/" class="footer--links-tos">Terms of Service</a>
                <a href="/" class="footer--links-policy">Privacy Policy</a>
            </div>
            <div class="footer--logos" id="footer--logos">
                <a
                    href="https://www.linkedin.com/in/guruvindersingh-grewal-642245227/"
                    target="_blank"
                    ><img
                        src="../../assets/logos/icons8-linkedin-48.png"
                        alt="Linkedin logo"
                        class="linkedin-logo"
                /></a>
                <a href="https://twitter.com/" target="_blank"
                    ><img
                        src="../../assets/logos/icons8-twitterx-50.png"
                        alt="X logo"
                        class="x-logo"
                /></a>
                <a href="https://facebook.com/" target="_blank"
                    ><img
                        src="../../assets/logos/icons8-facebook-48.png"
                        alt="Facebook logo"
                        class="facebook-logo"
                /></a>
            </div>
            <p class="address">123 Sydney St, NSW 0000, Australia</p>
            <p class="copyright">&copy; 2023 Guruvindersingh Grewal</p>
        </div>
    `;
});
