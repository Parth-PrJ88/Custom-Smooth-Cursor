// Custom cursor implementation
class CustomCursor {
  constructor() {
    // Initialize cursor element
    this.cursor = document.getElementById("cursor");
    this.initCursor();
    
    // Mouse tracking
    this.mouseX = 0;
    this.mouseY = 0;
    this.currentX = 0;
    this.currentY = 0;
    this.currentAngle = 0;
    
    // Configuration
    this.config = {
      speed: 0.15,          // Cursor follow speed (lower = smoother)
      rotationSpeed: 0.15,  // Rotation smoothing speed
      minScale: 0.45,       // Minimum cursor scale
      maxScale: 0.5,        // Maximum cursor scale
      scaleFactor: 0.05,    // How much velocity affects scale
      offsetX: 25,          // Half of SVG width
      offsetY: 27           // Half of SVG height
    };

    // Bind event listeners
    this.bindEvents();
    
    // Start animation loop
    this.animate();
  }

  initCursor() {
    // Inject custom cursor SVG
    this.cursor.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 54" fill="none">
        <g filter="url(#filter0_d)">
          <path d="M42.6817 41.1495L27.5103 6.79925C26.7269 5.02557 24.2082 5.02558 23.3927 6.79925L7.59814 41.1495C6.75833 42.9759 8.52712 44.8902 10.4125 44.1954L24.3757 39.0496C24.8829 38.8627 25.4385 38.8627 25.9422 39.0496L39.8121 44.1954C41.6849 44.8902 43.4884 42.9759 42.6817 41.1495Z" fill="black"/>
          <path d="M43.7146 40.6933L28.5431 6.34306C27.3556 3.65428 23.5772 3.69516 22.3668 6.32755L6.57226 40.6778C5.3134 43.4156 7.97238 46.298 10.803 45.2549L24.7662 40.109C25.0221 40.0147 25.2999 40.0156 25.5494 40.1082L39.4193 45.254C42.2261 46.2953 44.9254 43.4347 43.7146 40.6933Z" stroke="white" stroke-width="2.25825"/>
        </g>
      </svg>
    `;
    // Inject SVG into the cursor element for custom visual
    // cursor.innerHTML = `
    //   <img src="Parth.png" style="width: 40px; height: 40px;" />
    // `;
  }

  bindEvents() {
    // Track mouse position
    document.addEventListener("mousemove", (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
    });

    // Hide default cursor
    document.body.style.cursor = "none";
  }

  calculateRotation() {
    const angleRadians = Math.atan2(this.mouseY - this.currentY, this.mouseX - this.currentX);
    return angleRadians * (180 / Math.PI) + 90;
  }

  calculateScale(velocity) {
    return Math.max(
      this.config.minScale,
      this.config.maxScale - velocity * this.config.scaleFactor
    );
  }

  animate() {
    // Calculate movement delta
    const dx = this.mouseX - this.currentX;
    const dy = this.mouseY - this.currentY;

    // Store previous position for velocity calculation
    const prevX = this.currentX;
    const prevY = this.currentY;

    // Update position with smooth follow
    this.currentX += dx * this.config.speed;
    this.currentY += dy * this.config.speed;

    // Calculate rotation
    const targetAngle = this.calculateRotation();
    
    // Calculate the shortest path to the target angle
    let angleDiff = targetAngle - this.currentAngle;
    
    // Normalize the angle difference to be between -180 and 180
    while (angleDiff > 180) angleDiff -= 360;
    while (angleDiff < -180) angleDiff += 360;
    
    // Update current angle with smooth interpolation
    this.currentAngle += angleDiff * this.config.rotationSpeed;

    // Calculate velocity and scale
    const velocity = Math.sqrt(Math.pow(this.currentX - prevX, 2) + Math.pow(this.currentY - prevY, 2));
    const scale = this.calculateScale(velocity);

    // Apply transform
    this.cursor.style.transform = `
      translate(${this.currentX - this.config.offsetX}px, ${this.currentY - this.config.offsetY}px)
      rotate(${this.currentAngle}deg)
      scale(${scale})
    `;

    // Continue animation loop
    requestAnimationFrame(() => this.animate());
  }
}

// Initialize custom cursor when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new CustomCursor();
});
