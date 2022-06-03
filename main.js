import { signature, logo } from '/assets/signature.js';

const body = document.body.innerHTML; //save for later use
let lastScrollY = window.scrollY;

//default messages
const messages = [
    "Hey, stranger!",
    "Welcome to my portfolio website.",
    "I'm <b>Jack Ieong</b>, a full-stack software engineer!",
    "",
    "I am passionate in creating, designing and building",
    "web and mobile applications",
    "that can benefit the human kind and",
    "change the world."
]

//when the page is reloaded/refreshed
window.addEventListener('load', ()=> welcome());

//press spacebar to jump straight to homepage
document.addEventListener('keypress', event => {
    if (event.key === 'Enter') {
        document.body.innerHTML = signature;
        display_signature();
    }
});

// navbar scroll event listener
window.addEventListener('scroll', ()=> {
    const navbar = document.getElementById("navbar");
    if (window.scrollY === 0) {
        navbar.style.backgroundColor = 'transparent';
        navbar.style.boxShadow = 'none';
    } else {
        if (lastScrollY < window.scrollY) {
            navbar.classList.add("nav-hidden");
        } else {
            navbar.classList.remove("nav-hidden");
            navbar.style.backgroundColor = 'rgba(15, 14, 14, 0.811)';
            navbar.style.boxShadow = 'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px';
            navbar.style['backdrop-filter'] = 'blur(8px)';
        }
    }
    lastScrollY = window.scrollY;
});


// homepage scroll event listener
document.addEventListener('scroll', function () {
    for (let box of document.querySelectorAll('.box')) {
        if(isInViewport(box)) {
            box.classList.add('fade-in-up');
            box.style.visibility = 'visible';
            while(box !== null) {
                const sibling = box.nextElementSibling;
                box.addEventListener('animationstart', ()=> {
                    sibling.classList.add('fade-in-up');
                    sibling.addEventListener('animationstart', ()=> sibling.style.visibility = 'visible');
                });
                box = sibling;
            }
        }
    }
}, {
    passive: true
}, {
    once : true
});

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

//welcome page, display message
function welcome() {
    document.body.style.fontSize = "1.65rem";
    document.body.style.fontFamily = 'var(--bs-second-font-family)';
    document.body.innerHTML = '';
    display_message(messages, 0);
}

//display a new message after the animation of the previous message ends 
function display_message(messages, index) {
    if (index === messages.length) {
        return;
    }
    const sentence = create_message(messages[index], index);
    document.body.appendChild(sentence);
    sentence.addEventListener('animationend', ()=> {
        const msg = document.getElementById('welcome-' + index)
        if (index === messages.length-1) {
            msg.classList.add('blink');
            display_button();
        } else {
            msg.style.borderRightStyle = 'hidden';
        }
        //recursion
        display_message(messages, index+1);
    })
}

//create each message
function create_message(message, index) {
    const center = document.createElement('center')
    const block = document.createElement('div');
    const typeout = document.createElement('div');
    block.classList.add('d-inline-block');
    if (index === 0) {
        typeout.classList.add('mt-5')
    }
    typeout.classList.add('typeout');
    typeout.id = 'welcome-' + index;
    typeout.style.color = 'white';
    typeout.style.animationDuration = `${message.length / 80}s`;
    if (index === 7) {
        typeout.style.animationDuration = `${message.length / 30}s`;
    }
    typeout.innerHTML = message;
    block.appendChild(typeout);
    center.appendChild(block);
    return center;
}

//design and display the welcome page button and its functionalities
function display_button() {
    const text = document.createElement('p');
    const center = document.createElement('center')
    const button = document.createElement('button');
    const enter = document.createElement('p');
    text.style.color = 'white';
    text.classList.add('fade-in', 'first-style');
    button.classList.add('fade-in', 'mt-3', 'ps-3', 'pe-3');
    enter.classList.add('fade-in', 'first-style');
    button.id = 'learn_more';
    text.innerHTML = "<br>Want to see what I've built?<br>";
    button.innerHTML = 'Sure bet!';
    enter.innerHTML = '<br>or press enter'
    center.appendChild(text);
    document.body.appendChild(center);
    text.addEventListener('animationstart', ()=> {
        center.appendChild(button);
        center.appendChild(enter);
    });
    button.addEventListener('mouseover', ()=> {
        button.style.color = 'white';
        button.style.backgroundColor = 'black';
        button.innerHTML = 'Click Me!';
    });
    button.addEventListener('mouseleave', ()=> {
        button.style.color = 'black';
        button.style.backgroundColor = 'white';
        button.innerHTML = 'Sure bet!'
    });
    button.addEventListener('click', ()=> {
        document.body.innerHTML = '';
        document.body.innerHTML = signature;
        display_signature();
    });
}

//display the signature
function display_signature() {
    document.getElementById('step-1').addEventListener('animationend', ()=>{
        document.getElementById('step-2').classList.add('signature');
        document.getElementById('step-2').style.visibility = 'visible';
        document.getElementById('step-3').classList.add('signature');
        document.getElementById('step-3').style.visibility = 'visible';
        document.getElementById('step-4').classList.add('signature');
        document.getElementById('step-4').style.visibility = 'visible';
    });
    document.getElementById('step-2').addEventListener('animationend', ()=> {
        return_homepage();
    })
}

//return back to home page
function return_homepage() {
    document.body.innerHTML = body;
    document.body.style.fontFamily = 'var(--bs-body-font-family)';
    document.body.style.fontSize = 'var(--bs-body-font-size)';
    document.body.style.paddingTop = '100px';
    trigger_navi_animation('fade-in-b-r');
    const brand = document.getElementById('logo');
    brand.innerHTML = logo;
    toggle_activate();
    brand.addEventListener('animationend', ()=> {
        brand.classList.remove('signature');
    })
    brand.addEventListener('mouseover', ()=> {
        brand.classList.add('signature');
    });
    brand.addEventListener('mouseleave', ()=> {
        brand.classList.remove('signature');
    });
    document.getElementById("navbar").style.boxShadow = 'none';
    document.getElementById('language').addEventListener('click', ()=> click_display('language'));
    document.getElementById('tech').addEventListener('click', ()=> click_display('tech'));
    document.getElementById('tool').addEventListener('click', ()=> click_display('tool'));
    shake_icons();
}

//trigger navi animation for trigger_static_animation function
function trigger_navi_animation(animation) {
    const nav0 = document.getElementById("nav-item-0");
    const nav1 = document.getElementById("nav-item-1");
    const nav2 = document.getElementById("nav-item-2");
    const nav3 = document.getElementById("nav-item-3");
    const nav4 = document.getElementById("nav-item-4");
    nav0.classList.add(animation);
    nav0.style.visibility = 'visible';
    nav0.addEventListener('animationstart', ()=> {
        nav1.classList.add(animation);
    });
    nav1.addEventListener('animationstart', ()=> {
        nav1.style.visibility = 'visible';
        nav2.classList.add(animation);
    });
    nav2.addEventListener('animationstart', ()=> {
        nav2.style.visibility = 'visible';
        nav3.classList.add(animation);
    });
    nav3.addEventListener('animationstart', ()=> {
        nav3.style.visibility = 'visible';
        nav4.classList.add(animation);
    });
    nav4.addEventListener('animationstart', ()=> {
        nav4.style.visibility = 'visible';
    });      
}

function click_display(id) {
    const item_id = id + '-item';
    const item = document.getElementById(item_id);
    if (item.style.display === 'flex') {
        item.classList.remove('fade-in');
        item.style.display = 'none';
        document.getElementById(id).style.filter = 'brightness(0.2)';
    } else {
        item.classList.add('fade-in');
        item.style.display = 'flex';
        document.getElementById(id).style.filter = 'brightness(1)';
    }
}


function toggle_activate() {
    const bsCollapse = new bootstrap.Collapse(document.getElementById('navbarSupportedContent'), {
        toggle: false,
        show: true,
        hide: false
    });
    document.getElementById('navbarSupportedContent').addEventListener('show.bs.collapse', ()=>{
        document.getElementById("navbar").style.backgroundColor = 'rgba(15, 14, 14, 0.811)';
        // document.getElementById("navbar").style['-webkit-backdrop-filter'] = 'blur(8px)';
        // document.getElementById("navbar").style['backdrop-filter'] = 'blur(8px)';
        window.addEventListener('scroll', ()=> {
            bsCollapse.hide();
        }, {passive: true});
        window.addEventListener('click', ()=> {
            bsCollapse.hide();
        }, {passive: true});
        for (const child of document.querySelectorAll('.navbar-nav')) {
            child.addEventListener('click', ()=> {
                bsCollapse.hide();
            }, {passive: true})
        }
    });
    // document.getElementById('navbarSupportedContent').addEventListener('hide.bs.collapse', ()=>{
    //     document.body.style.overflowY = 'visible';
    // });
}

function shake_icons() {
    for (const card of document.querySelectorAll('.card')) {
        card.addEventListener('click', ()=> {
            for (const icon of card.querySelectorAll('i')) {
                icon.classList.toggle('i-shake');
            }
        }, {passive: true});
    }
}