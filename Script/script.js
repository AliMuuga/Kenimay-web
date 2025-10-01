
document.querySelectorAll('.navbar a').forEach(link => {
  link.addEventListener('click', function(e){
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if(target){
      window.scrollTo({
        top: target.offsetTop - 60,
        behavior: 'smooth'
      });
    }
  });
});


const reveals = document.querySelectorAll('.reveal');
function revealOnScroll(){
  const windowHeight = window.innerHeight;
  reveals.forEach((el, index) => {
    const elementTop = el.getBoundingClientRect().top;
    if(elementTop < windowHeight - 100 && !el.classList.contains('active')){
      setTimeout(() => el.classList.add('active'), index * 200); 
    }
  });
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);


emailjs.init("YOUR_USER_ID");

const form = document.querySelector('.contact-form');
const statusMsg = form.querySelector('.status-msg'); 
form.addEventListener('submit', function(e){
  e.preventDefault();

  emailjs.sendForm('YOUR_SERVICE_ID', 'Kenimay60', this)
    .then(() => {
      statusMsg.textContent = "Message sent successfully!";
      statusMsg.style.color = "green";
      form.reset();
    })
    .catch(err => {
      statusMsg.textContent = " Error sending message. Please try again.";
      statusMsg.style.color = "red";
      console.error('EmailJS error:', err);
    });
});
