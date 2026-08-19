import Phaser from "phaser";
import mapUrl from "../vue3/imgs/map-bg.jpg";
import monsterOneUrl from "../vue3/imgs/monster/monster-1.png";
import monsterTwoUrl from "../vue3/imgs/monster/monster-2.png";
import monsterThreeUrl from "../vue3/imgs/monster/monster-3.png";
import playerDownUrl from "../vue3/imgs/person/person-down.png";
import playerLeftUrl from "../vue3/imgs/person/person-left.png";
import playerRightUrl from "../vue3/imgs/person/person-right.png";
import playerUpUrl from "../vue3/imgs/person/person-up.png";
import { COMMAND_EVENT, emitStats, type GameCommand } from "./events";
import { initialProgress, readProgress, rewardMonster, saveProgress, takeDamage, type PlayerProgress } from "./progress";

export class MonsterScene extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Sprite;
  private monsters!: Phaser.Physics.Arcade.Group;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasd!: Record<string, Phaser.Input.Keyboard.Key>;
  private stats: PlayerProgress = readProgress();
  private lastDamage = 0;
  private virtualDirection: "up" | "down" | "left" | "right" | null = null;
  private commandHandler = (event: Event) => this.handleCommand((event as CustomEvent<GameCommand>).detail);

  constructor() {
    super("monster-field");
  }

  preload() {
    this.load.image("ground", mapUrl);
    this.load.image("monster-1", monsterOneUrl);
    this.load.image("monster-2", monsterTwoUrl);
    this.load.image("monster-3", monsterThreeUrl);
    this.load.spritesheet("player-down", playerDownUrl, { frameWidth: 32, frameHeight: 48 });
    this.load.spritesheet("player-left", playerLeftUrl, { frameWidth: 32, frameHeight: 48 });
    this.load.spritesheet("player-right", playerRightUrl, { frameWidth: 32, frameHeight: 48 });
    this.load.spritesheet("player-up", playerUpUrl, { frameWidth: 32, frameHeight: 48 });
  }

  create() {
    this.add.tileSprite(450, 280, 900, 560, "ground").setTint(0xbdd0a7);
    this.add.rectangle(450, 280, 900, 560, 0x244f38, 0.07);
    this.physics.world.setBounds(20, 20, 860, 520);
    this.createAnimations();
    this.player = this.physics.add.sprite(450, 280, "player-down").setScale(1.2).setCollideWorldBounds(true).setDepth(4);
    this.player.body?.setSize(22, 30).setOffset(5, 16);
    this.monsters = this.physics.add.group();
    for (let index = 0; index < 8; index += 1) this.spawnMonster();
    this.physics.add.overlap(this.player, this.monsters, () => this.damagePlayer());
    this.cursors = this.input.keyboard!.createCursorKeys();
    this.wasd = this.input.keyboard!.addKeys("W,A,S,D,SPACE") as Record<string, Phaser.Input.Keyboard.Key>;
    window.addEventListener(COMMAND_EVENT, this.commandHandler);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => window.removeEventListener(COMMAND_EVENT, this.commandHandler));
    emitStats(this.stats);
  }

  update() {
    const speed = 175;
    let horizontal = 0;
    let vertical = 0;
    if (this.cursors.left.isDown || this.wasd.A.isDown || this.virtualDirection === "left") horizontal = -speed;
    else if (this.cursors.right.isDown || this.wasd.D.isDown || this.virtualDirection === "right") horizontal = speed;
    if (this.cursors.up.isDown || this.wasd.W.isDown || this.virtualDirection === "up") vertical = -speed;
    else if (this.cursors.down.isDown || this.wasd.S.isDown || this.virtualDirection === "down") vertical = speed;
    this.player.setVelocity(horizontal, vertical);
    if (horizontal && vertical) this.player.body?.velocity.normalize().scale(speed);
    this.updatePlayerAnimation(horizontal, vertical);
    this.moveMonsters();
    if (Phaser.Input.Keyboard.JustDown(this.wasd.SPACE)) this.attack();
  }

  private createAnimations() {
    (["down", "left", "right", "up"] as const).forEach((direction) => {
      this.anims.create({
        key: "walk-" + direction,
        frames: this.anims.generateFrameNumbers("player-" + direction, { start: 0, end: 3 }),
        frameRate: 8,
        repeat: -1,
      });
    });
  }

  private updatePlayerAnimation(horizontal: number, vertical: number) {
    if (!horizontal && !vertical) {
      this.player.anims.stop();
      this.player.setFrame(0);
      return;
    }
    const direction = Math.abs(horizontal) > Math.abs(vertical) ? (horizontal < 0 ? "left" : "right") : (vertical < 0 ? "up" : "down");
    this.player.setTexture("player-" + direction);
    this.player.anims.play("walk-" + direction, true);
  }

  private spawnMonster() {
    const edge = Phaser.Math.Between(0, 3);
    const x = edge < 2 ? Phaser.Math.Between(50, 850) : (edge === 2 ? 55 : 845);
    const y = edge >= 2 ? Phaser.Math.Between(50, 510) : (edge === 0 ? 55 : 505);
    const texture = "monster-" + Phaser.Math.Between(1, 3);
    const monster = this.monsters.create(x, y, texture) as Phaser.Physics.Arcade.Sprite;
    monster.setScale(0.52).setDepth(3).setData("hp", 2 + Math.floor(this.stats.level / 3));
    monster.body?.setCircle(28, 17, 17);
  }

  private moveMonsters() {
    this.monsters.getChildren().forEach((child) => {
      const monster = child as Phaser.Physics.Arcade.Sprite;
      if (!monster.active) return;
      this.physics.moveToObject(monster, this.player, 34 + Math.min(this.stats.level * 2, 34));
    });
  }

  private damagePlayer() {
    if (this.time.now - this.lastDamage < 650) return;
    this.lastDamage = this.time.now;
    this.stats = takeDamage(this.stats, 8 + Math.floor(this.stats.level / 2));
    this.cameras.main.shake(100, 0.006);
    if (this.stats.hp === 0) {
      this.stats = { ...initialProgress, level: Math.max(1, this.stats.level - 1), maxHp: Math.max(100, this.stats.maxHp - 20) };
      this.stats.hp = this.stats.maxHp;
      this.player.setPosition(450, 280);
      saveProgress(this.stats);
    }
    emitStats(this.stats);
  }

  private attack() {
    const monsters = (this.monsters.getChildren() as Phaser.Physics.Arcade.Sprite[])
      .filter((monster) => monster.active)
      .sort((first, second) => Phaser.Math.Distance.Between(this.player.x, this.player.y, first.x, first.y) - Phaser.Math.Distance.Between(this.player.x, this.player.y, second.x, second.y));
    const target = monsters[0];
    if (!target || Phaser.Math.Distance.Between(this.player.x, this.player.y, target.x, target.y) > 95) return;
    const ring = this.add.circle(this.player.x, this.player.y, 18, 0xf2d06b, 0.2).setStrokeStyle(3, 0xf2d06b).setDepth(5);
    this.tweens.add({ targets: ring, radius: 70, alpha: 0, duration: 180, onComplete: () => ring.destroy() });
    const hp = Number(target.getData("hp")) - 1;
    target.setData("hp", hp).setTint(0xffd2c2);
    this.time.delayedCall(100, () => target.active && target.clearTint());
    if (hp <= 0) {
      target.destroy();
      this.stats = rewardMonster(this.stats);
      emitStats(this.stats);
      this.time.delayedCall(650, () => this.spawnMonster());
    }
  }

  private handleCommand(command: GameCommand) {
    if (command === "attack") this.attack();
    else if (command === "save") saveProgress(this.stats);
    else if (command === "reset") {
      this.stats = { ...initialProgress };
      saveProgress(this.stats);
      this.player.setPosition(450, 280);
      this.monsters.clear(true, true);
      for (let index = 0; index < 8; index += 1) this.spawnMonster();
      emitStats(this.stats);
    } else if (command === "stop") this.virtualDirection = null;
    else this.virtualDirection = command.replace("move-", "") as typeof this.virtualDirection;
  }
}
