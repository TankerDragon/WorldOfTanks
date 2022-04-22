export class Player {
  constructor(game) {
    this.x = Math.round(Math.random() * 1000);

    this.game = game;
  }
  update() {
    this.x++;
  }
  draw(context) {
    context.fillRect(this.x, 100, this.x + 100, 200);
  }
}
