
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