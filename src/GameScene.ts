import Phaser from 'phaser';

export class GameScene extends Phaser.Scene {
  private player!: Phaser.GameObjects.Rectangle;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private keys!: Record<string, Phaser.Input.Keyboard.Key>;

  constructor() { super('Game'); }

  preload() {
    this.load.image('tiles', 'assets/tiles.png');
    this.load.tilemapTiledJSON('map', 'assets/map.json');
  }

  create() {
    const map = this.make.tilemap({ key: 'map' });
    const tileset = map.addTilesetImage('tiles', 'tiles')!;
    map.createLayer('ground', tileset);
    const walls = map.createLayer('buildings', tileset)!;
    walls.setCollision([2, 4]); // 2 = building (brown), 4 = shop (red)
    map.createLayer('props', tileset);

const objs = map.getObjectLayer('objects')!.objects;
console.log('OBJECTS FOUND:', objs.map(o => `"${o.name}" at ${o.x},${o.y}`));
const spawn = objs.find(o => o.name.trim().toLowerCase() === 'spawn');
if (!spawn) {
  throw new Error('No spawn point. Names found: ' + objs.map(o => o.name).join(' | '));
}

    this.player = this.add.rectangle(spawn.x!, spawn.y!, 20, 20, 0xffcc00);
    this.physics.add.existing(this.player);
    (this.player.body as Phaser.Physics.Arcade.Body).setCollideWorldBounds(true);
    this.physics.add.collider(this.player, walls);

    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player);

    this.cursors = this.input.keyboard!.createCursorKeys();
    this.keys = this.input.keyboard!.addKeys('W,A,S,D') as Record<string, Phaser.Input.Keyboard.Key>;
  }

  update() {
    const body = this.player.body as Phaser.Physics.Arcade.Body;
    const speed = 160;
    body.setVelocity(0);
    if (this.cursors.left.isDown || this.keys.A.isDown) body.setVelocityX(-speed);
    else if (this.cursors.right.isDown || this.keys.D.isDown) body.setVelocityX(speed);
    if (this.cursors.up.isDown || this.keys.W.isDown) body.setVelocityY(-speed);
    else if (this.cursors.down.isDown || this.keys.S.isDown) body.setVelocityY(speed);
    body.velocity.normalize().scale(speed);
  }
}