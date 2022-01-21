const navBar = document.querySelector('header');

scrollNavbar = () => {
    if (document.documentElement.scrollTop > 0) {
        navBar.style.backgroundColor = "var(--preto)";
    }
    else navBar.style.backgroundColor = "transparent";
}


window.onscroll = () => {scrollNavbar()}