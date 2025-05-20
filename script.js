// Get the cursor container element from the DOM
const cursor = document.getElementById("cursor");

// Inject SVG into the cursor element for custom visual
// cursor.innerHTML = `
//   <img src="Parth.png" style="width: 40px; height: 40px;" />
// `;
cursor.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 54" fill="none">
    <g filter="url(#filter0_d)">
      <path d="M42.6817 41.1495L27.5103 6.79925C26.7269 5.02557 24.2082 5.02558 23.3927 6.79925L7.59814 41.1495C6.75833 42.9759 8.52712 44.8902 10.4125 44.1954L24.3757 39.0496C24.8829 38.8627 25.4385 38.8627 25.9422 39.0496L39.8121 44.1954C41.6849 44.8902 43.4884 42.9759 42.6817 41.1495Z" fill="black"/>
      <path d="M43.7146 40.6933L28.5431 6.34306C27.3556 3.65428 23.5772 3.69516 22.3668 6.32755L6.57226 40.6778C5.3134 43.4156 7.97238 46.298 10.803 45.2549L24.7662 40.109C25.0221 40.0147 25.2999 40.0156 25.5494 40.1082L39.4193 45.254C42.2261 46.2953 44.9254 43.4347 43.7146 40.6933Z" stroke="white" stroke-width="2.25825"/>
    </g>
  </svg>
`;

// Initialize mouse coordinates
let mouseX = 0, mouseY = 0;

// Current cursor position (for animation)
let currentX = 0, currentY = 0;

// Previous cursor position (Used to calculate movement angle)
let lastX = 0, lastY = 0;

// Speed factor: how fast the cursor follows the mouse (lower = smoother/slower)
const speed = 0.1;

// Angle of rotation for direction tracking
let angle = 0;

// Animation loop function
function animate() {
  const dx = mouseX - currentX;
  const dy = mouseY - currentY;

  const prevX = currentX;
  const prevY = currentY;

  // Smooth follow
  currentX += dx * speed;
  currentY += dy * speed;

  // Rotation angle
  const angleRadians = Math.atan2(currentY - lastY, currentX - lastX);
  angle = angleRadians * (180 / Math.PI) + 90;

  // Calculate speed (distance between previous and current positions)
  const velocity = Math.sqrt(Math.pow(currentX - prevX, 2) + Math.pow(currentY - prevY, 2));

  // Scale based on speed (fast = smaller)
  const minScale = 0.45;
  const maxScale = 0.5;
  const speedScale = Math.max(minScale, maxScale - velocity * 0.05); // tweak 0.05 if too sensitive

  // Apply styles
  cursor.style.transform = `translate(${currentX}px, ${currentY}px) rotate(${angle}deg) scale(${speedScale})`;

  lastX = currentX;
  lastY = currentY;

  requestAnimationFrame(animate);
}

// Track mouse position on move
document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// Start the animation loop
animate();