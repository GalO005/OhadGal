const stats = () => {
        const counters = document.querySelectorAll('.cnt');
        const speedCnt = 200;
        // **start stats**
        counters.forEach(cnt => {
            const updateCnts = () => {
                const target = cnt.getAttribute('data-cnt') * 1;
                const c = cnt.innerText * 1;
                const i = target / speedCnt;
                if (c < target) {
                    cnt.innerText = Math.ceil(c + i);
                    setTimeout(updateCnts, 1);
                } else {
                    c.innerText = target;
                }
            }
            updateCnts();

        });
    }
    // **end stas**

// **start video modal** 
const cls = document.querySelector('.cls-modal');
const modal = document.querySelector('.play-modal');
const framesrc = document.querySelector('.play-modal-in-con iframe');
const closemodal = (e) => {
    e.preventDefault();
    modal.classList.remove('active');
    if (framesrc) {
        framesrc.setAttribute('src', '#');
    }


}
if (cls) {
    cls.addEventListener('click', closemodal);

}
const multimedia = document.querySelectorAll('.mediaplayer');
const playmedia = (e) => {
    e.preventDefault();
    const srcanchor = e.target.getAttribute('data-id');
    framesrc.setAttribute('src', srcanchor);
    setTimeout(function() {
        modal.classList.add('active');
        cls.focus();
    }, 1000);


}
multimedia.forEach((el) => {
        el.addEventListener('click', playmedia);
    })
    // **end video modal**

// **start posts systems and others**
document.addEventListener('click', function(e) {
        /*
        Added JavaScript functionality (dynamic design - click event)
        */
        if (e.target.classList.contains('writer-post')) {
            e.preventDefault();
            if (e.target.classList.contains('special')) {
                e.target.classList.remove('special');
            } else {
                e.target.classList.add('special');
            }
        }
        /*
        Turn "OFF" and "ON" post using aria-expanded attribute (attr of Accessibility)
        */
        if (e.target.className == 'postexp') {
            let audioclick = document.getElementById('clicksound');
            audioclick.play();
            let hasExpanded = e.target.parentNode.parentNode.getAttribute('aria-expanded');
            let showpostEl = e.target.parentNode.parentNode.children[1];
            if (hasExpanded == 'true') {
                e.target.parentNode.parentNode.setAttribute('aria-expanded', 'false');
                e.target.setAttribute('src', '/media/iconplus.png');
                showpostEl.classList.remove('active');
            } else {
                e.target.parentNode.parentNode.setAttribute('aria-expanded', 'true');
                e.target.setAttribute('src', '/media/iconminus.png');
                showpostEl.classList.add('active');

            }

        }
    })
    //Capture button of post page
const btnfeed = document.getElementById('sendfeed');
//numpost VAR helps to identify how many existing posts
const numpost = document.getElementsByClassName('posts');
// Wrap all posts - helps to append new posts
const secposts = document.getElementById('section-posts');
const sendfeeduser = (e) => {
    // PreventDefault for button => the button has a default event (submit)
    e.preventDefault();
    //Collection elements
    let shem = document.getElementById('shem');
    let fdb = document.getElementById('fdb');
    let errpos = document.getElementById('errposinpt');
    if (errpos.className === 'active') {
        errpos.innerText = '';
        errpos.className = '';
    }
    if (!(shem.value)) {
        shem.focus();
        errpos.className = 'active';
        errpos.innerText = errpos.getAttribute('data-errshem');
        return;
    }
    if (!fdb.value) {
        fdb.focus();
        errpos.className = 'active';
        errpos.innerText = errpos.getAttribute('data-errfdb');
        return;
    }
    shem = shem.value.trim();
    fdb = fdb.value.trim();
    let n = numpost.length + 1;
    //Create Elements and append them
    const article = document.createElement('article');
    const divpost = document.createElement('div');
    const divpostcon = document.createElement('div');
    const dtpost = new Date().toDateString();
    const tmpost = new Date().toLocaleTimeString('en-US');
    article.classList.add('posts');
    divpost.classList.add('post-details');
    divpostcon.classList.add('post-cont', 'active');
    article.setAttribute('aria-expanded', 'true');
    divpost.innerHTML = '<img src="/media/iconminus.png" class="postexp" alt="plus">' + '<p>' + n + '. ' + 'Posted: ' + dtpost + ',at: ' + tmpost + ', By:' + '</p>' + '<a class="writer-post" href="">' + shem + '</a>';
    divpostcon.innerHTML = '<p>' + fdb + '</p>';
    article.appendChild(divpost);
    article.appendChild(divpostcon);
    secposts.appendChild(article);



}
if (btnfeed) {
    btnfeed.addEventListener('click', sendfeeduser);
}
// **end posts systems and others**

//**Start FORM
let submitfrm = document.getElementById('frmcon');
let project = document.getElementById('project');
let countproj = document.getElementById('countproj');
const submitdata = (e) => {
    let allinptf = document.querySelectorAll('.inputfocus');
    allinptf.forEach(function(elem) {
        if (elem.classList.contains('err-f')) {
            elem.classList.remove('err-f');
            elem.removeAttribute('style');
        }
    })
    let fname = document.getElementById('fname');
    let lname = document.getElementById('lname');
    let mail = document.getElementById('mail');
    let validationmail = mail.value.split('@');
    validationmail = validationmail[1];
    let pwd = document.getElementById('pwd');
    let phone = document.getElementById('phone');
    let dmeet = document.getElementById('dmeet');
    let dmeetV = new Date(dmeet.value);
    let castcountproj = +countproj.value;
    let errmsg = document.getElementById('errwedev');
    if (errmsg.className === 'active') {
        let errchild = document.getElementById('errchild');
        errmsg.removeChild(errchild);
        errmsg.className = '';

    }
    let textnotes = document.getElementById('notes');
    let customerid = document.getElementById('customerid');
    if (!(fname.value.trim())) {
        e.preventDefault();
        let inptf = fname.parentNode.lastElementChild;
        inptf.classList.add('err-f');
        inptf.style.background = '#D82134';
        errmsg.className = 'active';
        errmsg.innerHTML = '<p id="errchild">שדה שם פרטי הינו שדה חובה</p>';
        fname.focus();
        return;
    }
    if (!(lname.value.trim())) {
        e.preventDefault();
        let inptf = lname.parentNode.lastElementChild;
        inptf.classList.add('err-f');
        inptf.style.background = '#D82134';
        errmsg.className = 'active';
        errmsg.innerHTML = '<p id="errchild">שדה שם משפחה הינו שדה חובה</p>';
        lname.focus();
        return;
    }
    if (!(mail.value.trim()) || (validationmail !== 'gmail.com')) {
        e.preventDefault();
        let inptf = mail.parentNode.lastElementChild;
        inptf.classList.add('err-f');
        inptf.style.background = '#D82134';
        errmsg.className = 'active';
        errmsg.innerHTML = '<p id="errchild">המייל שלך אינו  חוקי בשל אחת מן הסיבות הבאות: לא מילאת שדה זה, המייל שלך אינו מסתיים ב-gmail.com</p>';
        mail.focus();
        return;
    }
    let ckpwd = pwd.value.lastIndexOf(';');
    ckpwd = ckpwd > 4 ? true : false;
    if (!(pwd.value.trim()) || (!ckpwd) || (pwd.value.slice('-1') !== ';')) {
        e.preventDefault();
        let inptf = pwd.parentNode.lastElementChild;
        inptf.classList.add('err-f');
        inptf.style.background = '#D82134';
        errmsg.className = 'active';
        errmsg.innerHTML = '<p id="errchild">שדה סיסמא הינו שדה חובה, על הסיסמא להיות באורך 5 תווים לפחות ולהסתיים בנקודה פסיק(;)</p>';
        pwd.focus();
        return;
    }
    if (!(phone.value.trim()) || (phone.value.length !== 9)) {
        e.preventDefault();
        let inptf = phone.parentNode.lastElementChild;
        inptf.classList.add('err-f');
        inptf.style.background = '#D82134';
        errmsg.className = 'active';
        errmsg.innerHTML = '<p id="errchild">שדה טלפון הינו שדה חובה, על מספר הטלפון להיות באורך 9 ספרות בדיוק.</p>';
        phone.focus();
        return;
    }
    if (project.selectedIndex == 0) {
        e.preventDefault();
        errmsg.className = 'active';
        errmsg.innerHTML = '<p id="errchild">שדה בחירת פרויקט הינו שדה חובה, אנא בחר פרויקט מתוך רשימת הפרויקטים</p>';
        project.focus();
        return;
    }
    let dnow = new Date();
    dnow = dnow.setHours(0, 0, 0, 0);
    dmeetV = dmeetV.setHours(0, 0, 0, 0);
    if ((!dmeet.value) || (castcountproj < 2000 && dmeetV === dnow) || (dmeetV < dnow)) {
        e.preventDefault();
        let inptf = dmeet.parentNode.lastElementChild;
        inptf.classList.add('err-f');
        inptf.style.background = '#D82134';
        errmsg.className = 'active';
        errmsg.innerHTML = '<p id="errchild">תאריך הפגישה אינו חוקי בשל אחת מן הסיבות הבאות: לא הזנת שדה תאריך, הזנת תאריך שכבר עבר, הזנת כמות מבקרים נמוכה מ2000 וגם בחרת את תאריך היום הנוכחי</p>';
        dmeet.focus();
        return;

    }
    if (!(textnotes.value)) {
        textnotes.value = 'no notes';
    }
    customerid.value = Math.floor(Math.random() * 1000 + 1);
}
if (submitfrm) {
    submitfrm.addEventListener('submit', submitdata)
}
const rmvDisabled = () => {
    if (project.selectedIndex !== 0) {
        countproj.disabled = false;
        countproj.focus();
    } else {
        countproj.disabled = true;

    }
}
if (project) {
    project.addEventListener('change', rmvDisabled)
}
//Capture body of index page
let mainBody = document.getElementById('sc');
let flagStats = false;
//EventListener when user scroll for Statistical function
if (mainBody) {
    window.addEventListener('scroll', function(e) {
        if (parseInt(window.scrollY) > 300 && (!flagStats)) {
            stats();
            flagStats = true;
        }
    })
}
// Open Modal for project details => opening popup window by localStorage
const modalindex = localStorage.getItem('hasModalFinalProject');
if (!modalindex && mainBody) {
    modal.classList.add('active');
    localStorage.setItem('hasModalFinalProject', 'yes');
}