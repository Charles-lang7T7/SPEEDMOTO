const totalFrames = 20;
const container = document.querySelector('.rotation-container');
const images = container.getElementsByTagName('img');

let currentFrame = 0;
let isDragging = false;
let startX = 0;
let lastX = 0;
const dragSensitivity = 10;

// ----- Auto Rotation -----
let autoRotateInterval;

function startAutoRotate() {
  stopAutoRotate(); // prevent multiple intervals
  autoRotateInterval = setInterval(() => {
    updateImage(currentFrame + 1); // rotate forward automatically
  }, 120); // adjust speed here (ms per frame)
}

function stopAutoRotate() {
  clearInterval(autoRotateInterval);
}

// Show initial image
function updateImage(frame) {
  frame = (frame + totalFrames) % totalFrames; // Wrap around
  currentFrame = frame;

  Array.from(images).forEach(img => img.classList.remove('active'));
  const activeImage = document.getElementById(`slide-${currentFrame}`);
  if (activeImage) activeImage.classList.add('active');
}

updateImage(currentFrame);
startAutoRotate(); // begin auto rotation

// -------- Mouse Events --------
container.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.clientX;
  lastX = startX;
  container.style.cursor = 'grabbing';
  stopAutoRotate(); // stop auto rotation when interacting
});

container.addEventListener('mouseleave', () => {
  isDragging = false;
  container.style.cursor = 'grab';
  startAutoRotate(); // resume auto rotation when leaving
});

window.addEventListener('mouseup', () => {
  isDragging = false;
  container.style.cursor = 'grab';
});

window.addEventListener('mousemove', (e) => {
  if (!isDragging) return;

  const deltaX = e.clientX - lastX;

  if (Math.abs(deltaX) >= dragSensitivity) {
    if (deltaX > 0) {
      updateImage(currentFrame - 1); // drag right → rotate right
    } else {
      updateImage(currentFrame + 1); // drag left → rotate left
    }
    lastX = e.clientX;
  }
});

// -------- Touch Events --------
container.addEventListener('touchstart', (e) => {
  isDragging = true;
  startX = e.touches[0].clientX;
  lastX = startX;
  stopAutoRotate();
}, { passive: true });

container.addEventListener('touchend', () => {
  isDragging = false;
  startAutoRotate();
});

container.addEventListener('touchcancel', () => {
  isDragging = false;
  startAutoRotate();
});

container.addEventListener('touchmove', (e) => {
  if (!isDragging) return;

  const touchX = e.touches[0].clientX;
  const deltaX = touchX - lastX;

  if (Math.abs(deltaX) >= dragSensitivity) {
    if (deltaX > 0) {
      updateImage(currentFrame - 1); // drag right → rotate right
    } else {
      updateImage(currentFrame + 1); // drag left → rotate left
    }
    lastX = touchX;
  }
}, { passive: true });
