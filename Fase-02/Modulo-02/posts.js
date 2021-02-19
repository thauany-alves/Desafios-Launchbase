const modalOverlay = document.querySelector('.modal-overlay');
const cards = document.querySelectorAll('.card');
const modal = document.querySelector('.modal');

for (let card of cards) {
    card.addEventListener('click', function() {
        const postId = card.getAttribute('id');
        modalOverlay.classList.add('active');
        modalOverlay.querySelector("iframe").src = `https://blog.rocketseat.com.br/${postId}`

    });
}

document.querySelector('.close-modal').addEventListener('click', function() {
    modalOverlay.classList.remove('active');
    modalOverlay.querySelector("iframe").src = "";
});

document.querySelector('.maximize-modal').addEventListener('click', function() {

    if(!modal.classList.contains('active')) modal.classList.add('active');
    else modal.classList.remove('active');
    // modalOverlay.querySelector("iframe").src = "";
});