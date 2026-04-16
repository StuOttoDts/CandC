export function setupImagePreview({ input, previewImg, container, removeBtn }) {
  let currentImage = null;

  function show(file) {
    const reader = new FileReader();
    reader.onload = () => {
      currentImage = reader.result;
      previewImg.src = currentImage;
      container.classList.remove('hidden');
    };
    reader.readAsDataURL(file);
  }

  function hide() {
    currentImage = null;
    previewImg.src = '';
    container.classList.add('hidden');
  }

 input.addEventListener('change', (e) => {
    const file = e.target.files[0];

    if (!file || !file.type.startsWith('image/')) {
      hide();
      return;
    }

    show(file);
  }); 

  removeBtn.addEventListener('click', () => {
    input.value = '';
    hide();
  });

  return {
    getImage: () => currentImage,
    clear: hide
  };
}