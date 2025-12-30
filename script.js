// תפריט הניווט, ניהול מקרי קיצון של פתיחת תפריט
const toggleButton = document.getElementById('toggleButton')
const sidebar = document.getElementById('sidebar')
let isDark = document.documentElement.classList.contains("dark");

function toggleSidebar(){
    sidebar.classList.toggle('close')
    toggleButton.classList.toggle('rotate')
    closeAllSubMenus()
}

function toggleSubMenu(button){

    if(!button.nextElementSibling.classList.contains('show')){closeAllSubMenus()}

    button.nextElementSibling.classList.toggle('show')
    button.classList.toggle('rotate')

    if(sidebar.classList.contains('close')){
        sidebar.classList.toggle('close')
        toggleButton.classList.toggle('rotate')
    }
}

function closeAllSubMenus(){
    Array.from(sidebar.getElementsByClassName('show')).forEach(ul => {
    ul.classList.remove('show')
    ul.previousElementSibling.classList.remove('rotate')})
}

function displayTab(className, idName, button){
    let x = document.getElementsByClassName(className);
    let y = document.getElementsByClassName("activeTab");

    for (let i=0; i < y.length; i++) {
        y[i].classList.toggle("activeTab");
    }

    for (let i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    
    document.getElementById(idName).style.display =  "block";
    button.classList.toggle("activeTab");
}


// מעבר מצב כהה למצב בהיר וחזרה, שמירת המצב בזיכרון ואפיונו
if (localStorage.getItem("theme") === "dark") {
    document.documentElement.classList.add("dark");
}

function toggleTheme() {
    const btn = document.getElementById("themeToggle");
    const icon = btn.querySelector(".icon");

    document.documentElement.classList.toggle("dark");

    const isDark = document.documentElement.classList.contains("dark");

    localStorage.setItem("theme", isDark ? "dark" : "light");
    btn.classList.add("animate");
    setTimeout(() => {
        icon.textContent = isDark ? "🌙" : "☀️";
        btn.classList.remove("animate");
    }, 200);
}

document.addEventListener("DOMContentLoaded", () => {
    const icon = document.querySelector("#themeToggle .icon");
    const isDark = document.documentElement.classList.contains("dark");

    icon.textContent = isDark ? "🌙" : "☀️";
});


// כפתור לעלות למעלה בדפים ארוכים
const toTop = document.getElementById('toTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        toTop.classList.add('show');
    } else {
        toTop.classList.remove('show');
    }
});

toTop.addEventListener('click', e => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});


// קרוסלת כרטיסים - שורת כרטיסים שזזה לפי כמות האינדקס
const cardsContainer = document.querySelector(".cards");
let cards = document.querySelectorAll(".card");

// העתקה של האלמנט הראשון והאחרון
const firstClone = cards[0].cloneNode(true);
const lastClone = cards[cards.length - 1].cloneNode(true);

firstClone.classList.add("clone");
lastClone.classList.add("clone");

// הכנסת ההעתקות לרשימה
cardsContainer.appendChild(firstClone);
cardsContainer.insertBefore(lastClone, cardsContainer.firstChild);

// עדכון רשימת הכרטיסים
cards = document.querySelectorAll(".card");

let cardWidth = cards[0].offsetWidth;
let cardIndex = 1;
let isAnimating = false; // מונע יציאה מגבולות

// מעבר בין כל כרטיס
function updateCard(animate = true) {
    isAnimating = animate; // נועל בזמן אנימציה
    cardsContainer.style.transition = animate ? "transform 0.3s ease" : "none";
    cardsContainer.style.transform = `translateX(${cardIndex * cardWidth}px)`;
}

// כפתורים
document.getElementById("next").addEventListener("click", () => {
    if (isAnimating) return; // מונע ספאם
    cardIndex++;
    updateCard(true);
});

document.getElementById("prev").addEventListener("click", () => {
    if (isAnimating) return; // מונע ספאם
    cardIndex--;
    updateCard(true);
});

// שרשור כרטיסים
cardsContainer.addEventListener("transitionend", () => {
    // אם transition בוטל — לא להפעיל לוגיקה
    const style = getComputedStyle(cardsContainer);
    if (style.transitionDuration === "0s") {
        isAnimating = false;
        return;
    }

    if (cards[cardIndex].classList.contains("clone")) {
        if (cardIndex === 0) {
            cardIndex = cards.length - 2; // קפיצה לכרטיס האחרון האמיתי
        } else if (cardIndex === cards.length - 1) {
            cardIndex = 1; // קפיצה לכרטיס הראשון האמיתי
        }
        updateCard(false); // ללא אנימציה
    }

    isAnimating = false;    
});

// רספונסיביות
window.addEventListener("resize", () => {
    cardWidth = cards[0].offsetWidth;
    updateCard(false);
});

const carouselWrapper = document.querySelector(".carousel");

if (window.ResizeObserver && carouselWrapper) {
    const observer = new ResizeObserver(() => {
        recalcCardWidth();
    });
    observer.observe(carouselWrapper);
}

function recalcCardWidth() {
    cardWidth = cards[0].offsetWidth;
    updateCard(false);
}


// קריאה התחלתית
updateCard(false);

// מעבר במכשירי טאצ' עם האצבע
let startX = 0;
let isDragging = false;

cardsContainer.addEventListener("touchstart", (e) => {
    if (isAnimating) return; 
    startX = e.touches[0].clientX;
    isDragging = true;
    cardsContainer.style.transition = "none";
});

cardsContainer.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    const diff = e.touches[0].clientX - startX;
    cardsContainer.style.transform = `translateX(${diff + cardIndex * cardWidth}px)`;
});

cardsContainer.addEventListener("touchend", (e) => {
    if (!isDragging) return;
    isDragging = false;

    const diff = e.changedTouches[0].clientX - startX;

    if (diff > 50 && !isAnimating) {
        cardIndex++;
    }
    else if (diff < -50 && !isAnimating) {
        cardIndex--;
    }

    updateCard(true);
});




