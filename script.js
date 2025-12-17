// קביעת משתנים קבועים לשימוש בפונקציות (משתנים שלא יישתנו ולכן הם בconst)
const toggleButton = document.getElementById('toggleButton')
const sidebar = document.getElementById('sidebar')
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
