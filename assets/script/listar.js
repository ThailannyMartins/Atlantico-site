document.addEventListener('DOMContentLoaded', function () {
    flatpickr("#date", {
        dateFormat: "d/m/Y"
    });
});

function updateTitle() {
    document.getElementById('news-title-preview').innerText = document.getElementById('title').value;
}

function previewImage() {
    const file = document.getElementById('image').files[0];
    const preview = document.getElementById('news-image-preview');
    const reader = new FileReader();

    reader.addEventListener('load', function () {
        preview.src = reader.result;
        preview.style.display = 'block';
    }, false);

    if (file) {
        reader.readAsDataURL(file);
    }
}