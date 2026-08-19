let highestZ = 1;

class Paper {
  holdingPaper = false;
  currentPaperX = 0;
  currentPaperY = 0;
  previousX = 0;
  previousY = 0;
  rotation = Math.random() * 30 - 15;

  init(paper) {
    paper.addEventListener('pointerdown', (event) => {
      if (event.button !== 0) return;

      this.holdingPaper = true;
      this.previousX = event.clientX;
      this.previousY = event.clientY;
      paper.style.zIndex = highestZ++;
      paper.setPointerCapture(event.pointerId);
      event.preventDefault();
    });

    paper.addEventListener('pointermove', (event) => {
      if (!this.holdingPaper) return;

      this.currentPaperX += event.clientX - this.previousX;
      this.currentPaperY += event.clientY - this.previousY;
      this.previousX = event.clientX;
      this.previousY = event.clientY;
      paper.style.transform = `translate(${this.currentPaperX}px, ${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
    });

    const stopDragging = (event) => {
      this.holdingPaper = false;
      if (paper.hasPointerCapture(event.pointerId)) {
        paper.releasePointerCapture(event.pointerId);
      }
    };

    paper.addEventListener('pointerup', stopDragging);
    paper.addEventListener('pointercancel', stopDragging);
  }
}

document.querySelectorAll('.paper').forEach((paper) => {
  new Paper().init(paper);
});
