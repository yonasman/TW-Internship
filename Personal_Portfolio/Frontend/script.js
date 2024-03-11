// navigation bar styling
let sections = document.querySelectorAll('section')
let navLinks = document.querySelectorAll('nav ul a')
// console.log(navLinks)

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id')
        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('nav ul a[href *=' + id + ']').classList.add('active')
                // console.log(a)
            })
        }
    })
}
// typewriter functionality
class Typewriter {
    constructor(elem,options) {
        this.elem = elem;
        this.words = [...this.elem.dataset.typewriter.split(',')];
        this.speed = options?.speed || 100;
        this.delay = options?.delay || 1200;
        this.repeat = options?.repeat;
        this.initTyping();

    }
    // async await function
    await = (ms) => new Promise((resolve) => setTimeout(resolve,ms))
    
    toggleTyping = () => {
        this.elem.classList.toggle('typing');
    }
    async typewrite(word) {
        await this.await(this.delay)
        this.toggleTyping();
        for (const letter of word.split('')) {
            this.elem.textContent += letter;
            await this.await(this.speed)
        }
        this.toggleTyping();
        await this.await(this.delay)
        this.toggleTyping()
        while (this.elem.textContent.length !== 0) {
            this.elem.textContent = this.elem.textContent.slice(0,-1);
            await this.await(this.speed)
        }
        this.toggleTyping()
    }
    async initTyping() {
        for(const word of this.words) {
            await this.typewrite(word)
        }
        if (this.repeat) {
            await this.initTyping()
        } else {
            this.elem.style.animation = 'none';
        }
    }

}
new Typewriter(document.querySelector('[data-typewriter'),{
    repeat:true
});


// ****************** script for submitting
const form = document.getElementById("myForm")
form.addEventListener("submit",async (e) => {
    e.preventDefault();

    const fullName = document.getElementById('fullNameInput').value;
    const email = document.getElementById('emailInput').value;
    const subject = document.getElementById('subjectInput').value;
    const message = document.getElementById('messageInput').value;
    // console.log(fullName)

    try {
        const response = await fetch('http://localhost:5555/api/users/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ full_name: fullName, email: email, subject: subject, message : message })
        });
        window.location.reload()
        if (response.ok) {
            console.log('Your message has been posted successfully.');
            alert("Thanks, You sent your message successfully!")
        } else {
            console.error('Failed to post message:', response.statusText);
        }
    } catch (error) {
        console.error('Error posting message:', error.message);
    }
})


// revealing elements on scroll
window.addEventListener('scroll',reveal);
function reveal() {
    let reveals = document.querySelectorAll(".reveal")
    // console.log(reveals)
    for (let i = 0;i <reveals.length;i++) {
        let windowHeight = window.innerHeight;
        let revealTop = reveals[i].getBoundingClientRect().top;
        let revealPoint = 150;
        if(revealTop < windowHeight - revealPoint) {
            reveals[i].classList.add('active')
        } else {
            reveals[i].classList.remove('active')
        }
    }
}
// menu toggler
let menu = document.querySelector(".hamburger_display");
// console.log(menu)
let hamburger = document.querySelector("#hamburgerIcon");
hamburger.addEventListener("click", function toggler() {
    menu.classList.toggle("visible")
    let isVisible = menu.classList.contains("visible")
    if(isVisible) {
        hamburger.src = "./images/hamburger.png";
    } else {
        hamburger.src = "./images/cross.png";
    }
})

// alert script
// form.addEventListener("submit",function showCustomAlert() {
//     // Get the custom alert container
//     var alertContainer = document.getElementById("custom-alert-container");

//     // Change the text and style of the custom alert
//     alertContainer.textContent = "This is a custom alert!";
//     alertContainer.style.display = "block";

//     // Automatically hide the alert after a certain period (e.g., 3 seconds)
//     setTimeout(function() {
//         alertContainer.style.display = "none";
//     }, 100000);
// })