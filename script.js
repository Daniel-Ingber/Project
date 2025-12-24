// קביעת משתנים קבועים לשימוש בפונקציות (משתנים שלא יישתנו ולכן הם בconst)
const toggleButton = document.getElementById('toggleButton')
const sidebar = document.getElementById('sidebar')
var isDark = document.documentElement.classList.contains("dark");
// פונקציה לפתיחת תפריט הניווט על ידי שינוי המחלקות שלהם (בשימוש עם toggle)
function toggleSidebar(){
    sidebar.classList.toggle('close')
    toggleButton.classList.toggle('rotate')
    closeAllSubMenus()
}

function toggleSubMenu(button){
// אם כפתור לא במחלקה של visible אז תריץ את הפונקציה שסוגרת את כל תתי הניווטים 
if(!button.nextElementSibling.classList.contains('show')){
    closeAllSubMenus()
}
    button.nextElementSibling.classList.toggle('show')
    button.classList.toggle('rotate')
// אם קיים בsidebar המחלקה close אז תוריד גם את close וגם לtoggleButton תשנה את rotate 
    if(sidebar.classList.contains('close')){
    sidebar.classList.toggle('close')
    toggleButton.classList.toggle('rotate')
    }
}

function closeAllSubMenus(){
  // לולאה שבודקת את כל הילדים של sidebar בשביל כל האלמנטים עם המחלקה visible ומריצה לולאה שבשביל כל ul בarray מורידים לו את המחלקה visible וגם מוחקת את המחלקה rotate בשביל אנימציה של שינוי הicon 
    Array.from(sidebar.getElementsByClassName('show')).forEach(ul => {
    ul.classList.remove('show')
    ul.previousElementSibling.classList.remove('rotate')})
}

function displayTab(className, idName, button){
    // הפונקצייה מכינה 2 מאגרים של מחלקות, אחד המאגר של כל הכפתורים שמופעלים, והשני המאגר של כל התוכן של הטאבים, היא משנה את כל הכפתורים שכרגע הם פועלים, מחביאה את כל התוכן של העמוד ואז מראה את התוכן הספציפי לפי מזהה ומשנה את הכפתור לפעיל. 
    var x = document.getElementsByClassName(className);
    var y = document.getElementsByClassName("activeTab");
    for (var i=0; i < y.length; i++) {
        y[i].classList.toggle("activeTab");
    }
    for (var i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    document.getElementById(idName).style.display =  "block";
    button.classList.toggle("activeTab");
}

// בודק את האכסון המקומי בשביל ההעדפה וכך
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


