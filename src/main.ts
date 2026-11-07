import './style.css';
import Phaser from 'phaser';
import { GameScene } from './GameScene';

new Phaser.Game({
  type: Phaser.AUTO,
  width: 960,
  height: 540,
  parent: 'app',
  pixelArt: true,
  physics: { default: 'arcade', arcade: { debug: false } },
  scene: [GameScene],
});