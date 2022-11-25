// $(document).ready(function(){
//     $('header > .toggle-button').click(function(){
//         $('#navbar').slideToggle();
//     })
// })

/* Sidebar */

const sidebar = document.querySelector('#sidebar');
const sidebarToggler = document.querySelector('.sidebar_toggler');
const scrollArrow = document.getElementById('scroll-down');
const bannerSection = document.getElementById('body');


// Toggling the Sidebar
sidebarToggler.addEventListener('click', () => {
    sidebar.classList.toggle('show');
});


// Closing the Sidebar on clicking Outside and on the Sidebar-Links
window.addEventListener('click', (e) => {
    if (e.target.id !== 'sidebar' && e.target.className !== 'sidebar_toggler') {
        sidebar.classList.remove('show');
    }
});

window.addEventListener('scroll', e => {

    console.log(window.scrollY);
    if(window.scrollY >= 100){
        scrollArrow.style.visibility = "hidden";
    }
    else{
        scrollArrow.style.visibility = "visible";
    }
})
