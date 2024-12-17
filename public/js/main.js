// ======================navbar toggle========================
const btn = document.querySelector(".mobile-menu-button");
            const menu = document.querySelector(".mobile-menu");
    
            btn.addEventListener("click", () => {
                menu.classList.toggle("hidden");
            });
    
            window.addEventListener("scroll", () => {
                if (!menu.classList.contains("hidden")) {
                    menu.classList.add("hidden");
                }
            });
//=============================navbar click heddin===================================
const navlink = document.querySelectorAll('.navlink');

const navLink = () =>{
    const navmenu = document.querySelector('.menu-mobuil');
    navmenu.classList.remove('show')
}

navlink.forEach(e => e.addEventListener("click" , navLink));

