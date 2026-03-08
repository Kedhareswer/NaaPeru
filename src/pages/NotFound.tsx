import { useEffect, useRef, useCallback, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, Volume2, VolumeX } from "lucide-react";
import { Seo } from "@/components/Seo";
import {
  playShoot, playExplosion, playPowerUp, playBossAlert,
  playPlayerHit, playShieldBlock, playGameOver, playLevelUp,
  playBossHit, playBossDeath, setMuted, isMuted,
} from "@/lib/sfx";

// --- Canvas constants ---
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const PLAYER_WIDTH = 40;
const PLAYER_HEIGHT = 30;
const PLAYER_SPEED = 5;
const BULLET_SPEED = 7;
const BULLET_WIDTH = 3;
const BULLET_HEIGHT = 12;
const ENEMY_ROWS = 5;
const ENEMY_COLS = 10;
const ENEMY_WIDTH = 32;
const ENEMY_HEIGHT = 24;
const ENEMY_PAD_X = 14;
const ENEMY_PAD_Y = 12;
const ENEMY_BULLET_SPEED = 4;
const STAR_COUNT = 120;

// --- Interfaces ---
interface Star { x: number; y: number; speed: number; size: number }
interface Bullet { x: number; y: number }
interface Enemy { x: number; y: number; alive: boolean; row: number; hp: number }
interface Particle { x: number; y: number; vx: number; vy: number; life: number; color: string }
interface PowerUp { x: number; y: number; type: "shield" | "rapid" | "multi" | "triple" | "turbo"; timer: number; permanent?: boolean }
interface Boss { x: number; y: number; hp: number; maxHp: number; dir: number; shootTimer: number; phase: number; alive: boolean }

// --- NaaPeru-themed colors for canvas ---
const PRIMARY = "hsl(0, 100%, 50%)";
const PRIMARY_DIM = "hsl(0, 100%, 28%)";
const SECONDARY = "hsl(0, 0%, 100%)";
const ACCENT = "hsl(0, 100%, 65%)";
const CYAN = "hsl(220, 80%, 60%)";
const GOLD = "hsl(45, 100%, 58%)";
const PURPLE = "hsl(280, 70%, 65%)";
const FG = "#ffffff";
const BG = "hsl(220, 26%, 7%)";

// --- Drawing functions ---
function drawPixelShip(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, shielded: boolean) {
  const sx = w / 16, sy = h / 16;
  ctx.fillStyle = FG;
  ctx.fillRect(x + 7 * sx, y, 2 * sx, 4 * sy);
  ctx.fillStyle = PRIMARY;
  ctx.fillRect(x + 6 * sx, y + 4 * sy, 4 * sx, 6 * sy);
  ctx.fillRect(x + 4 * sx, y + 6 * sy, 8 * sx, 4 * sy);
  ctx.fillStyle = PRIMARY_DIM;
  ctx.fillRect(x + 2 * sx, y + 10 * sy, 12 * sx, 2 * sy);
  ctx.fillStyle = ACCENT;
  ctx.fillRect(x + 0, y + 12 * sy, 4 * sx, 4 * sy);
  ctx.fillRect(x + 12 * sx, y + 12 * sy, 4 * sx, 4 * sy);
  ctx.fillStyle = PRIMARY;
  ctx.fillRect(x + 7 * sx, y + 10 * sy, 2 * sx, 6 * sy);
  if (shielded) {
    ctx.strokeStyle = CYAN;
    ctx.lineWidth = 2;
    ctx.shadowColor = CYAN;
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.ellipse(x + w / 2, y + h / 2, w * 0.7, h * 0.7, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.shadowBlur = 0;
  }
}

function drawPixelEnemy(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, frame: number) {
  const sx = w / 15, sy = h / 6;
  ctx.fillStyle = SECONDARY;
  const off = frame % 2 === 0 ? 0 : 1;
  ctx.fillRect(x + 4 * sx, y, 7 * sx, sy);
  ctx.fillRect(x + 3 * sx, y + sy, 9 * sx, sy);
  ctx.fillRect(x + 2 * sx, y + 2 * sy, 11 * sx, sy);
  ctx.fillRect(x + (2 + off) * sx, y + 3 * sy, 2 * sx, sy);
  ctx.fillRect(x + 5 * sx, y + 3 * sy, 5 * sx, sy);
  ctx.fillRect(x + (11 - off) * sx, y + 3 * sy, 2 * sx, sy);
  ctx.fillRect(x + 0, y + 4 * sy, 15 * sx, sy);
  ctx.fillRect(x + (2 + off) * sx, y + 5 * sy, 2 * sx, sy);
  ctx.fillRect(x + 5 * sx, y + 5 * sy, 5 * sx, sy);
  ctx.fillRect(x + (11 - off) * sx, y + 5 * sy, 2 * sx, sy);
}

function drawBoss(ctx: CanvasRenderingContext2D, boss: Boss, frame: number) {
  const w = 80, h = 50;
  const x = boss.x - w / 2, y = boss.y - h / 2;
  ctx.fillStyle = SECONDARY;
  ctx.shadowColor = SECONDARY;
  ctx.shadowBlur = 15;
  ctx.fillRect(x + 10, y, w - 20, h);
  ctx.fillRect(x, y + 10, w, h - 20);
  ctx.fillStyle = PRIMARY;
  const eyeOff = frame % 2 === 0 ? 0 : 2;
  ctx.fillRect(x + 18 + eyeOff, y + 15, 10, 8);
  ctx.fillRect(x + 52 - eyeOff, y + 15, 10, 8);
  ctx.fillStyle = BG;
  ctx.fillRect(x + 22 + eyeOff, y + 18, 4, 4);
  ctx.fillRect(x + 54 - eyeOff, y + 18, 4, 4);
  ctx.fillStyle = ACCENT;
  ctx.fillRect(x + 25, y + 32, 30, 6);
  for (let i = 0; i < 5; i++) {
    ctx.fillStyle = BG;
    ctx.fillRect(x + 28 + i * 6, y + 32, 3, 6);
  }
  ctx.shadowBlur = 0;
  const hpPct = boss.hp / boss.maxHp;
  ctx.fillStyle = "rgba(255,255,255,0.15)";
  ctx.fillRect(x, y - 12, w, 6);
  ctx.fillStyle = hpPct > 0.5 ? PRIMARY : hpPct > 0.25 ? ACCENT : SECONDARY;
  ctx.fillRect(x, y - 12, w * hpPct, 6);
}

function drawPowerUp(ctx: CanvasRenderingContext2D, p: PowerUp) {
  const colors: Record<string, string> = { shield: CYAN, rapid: ACCENT, multi: PRIMARY, triple: GOLD, turbo: PURPLE };
  const labels: Record<string, string> = { shield: "S", rapid: "R", multi: "M", triple: "3", turbo: "V" };
  const color = colors[p.type];
  ctx.shadowColor = color;
  ctx.shadowBlur = p.permanent ? 16 : 8;

  if (p.permanent) {
    // Diamond shape for permanent power-ups
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(p.x, p.y - 11);
    ctx.lineTo(p.x + 11, p.y);
    ctx.lineTo(p.x, p.y + 11);
    ctx.lineTo(p.x - 11, p.y);
    ctx.closePath();
    ctx.fill();
    // Star marker
    ctx.shadowBlur = 0;
    ctx.fillStyle = BG;
    ctx.font = "bold 9px monospace";
    ctx.textAlign = "center";
    ctx.fillText(labels[p.type] + "*", p.x, p.y + 3);
  } else {
    ctx.fillStyle = color;
    ctx.fillRect(p.x - 8, p.y - 8, 16, 16);
    ctx.shadowBlur = 0;
    ctx.fillStyle = BG;
    ctx.font = "bold 10px monospace";
    ctx.textAlign = "center";
    ctx.fillText(labels[p.type], p.x, p.y + 4);
  }
  ctx.shadowBlur = 0;
}

// --- SVG Sprites for splash screen (re-themed) ---
const EnemySprite = () => (
  <svg width="80" height="54" viewBox="0 0 15 10" fill="hsl(0, 0%, 100%)" className="drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">
    <rect x="4" y="0" width="7" height="1" />
    <rect x="3" y="1" width="9" height="1" />
    <rect x="2" y="2" width="11" height="1" />
    <rect x="2" y="3" width="2" height="1" />
    <rect x="5" y="3" width="5" height="1" />
    <rect x="11" y="3" width="2" height="1" />
    <rect x="0" y="4" width="15" height="1" />
    <rect x="2" y="5" width="2" height="1" />
    <rect x="5" y="5" width="5" height="1" />
    <rect x="11" y="5" width="2" height="1" />
  </svg>
);

const ShipSprite = () => (
  <svg viewBox="0 0 16 16" className="w-full h-full drop-shadow-[0_0_12px_rgba(255,0,0,0.5)]">
    <rect x="7" y="0" width="2" height="4" fill="#ffffff" />
    <rect x="6" y="4" width="4" height="6" fill="hsl(0, 100%, 50%)" />
    <rect x="4" y="6" width="8" height="4" fill="hsl(0, 100%, 50%)" />
    <rect x="2" y="10" width="12" height="2" fill="hsl(0, 100%, 28%)" />
    <rect x="0" y="12" width="4" height="4" fill="hsl(0, 100%, 65%)" />
    <rect x="12" y="12" width="4" height="4" fill="hsl(0, 100%, 65%)" />
    <rect x="7" y="10" width="2" height="6" fill="hsl(0, 100%, 50%)" />
  </svg>
);

// --- Main Component ---
const NotFound = () => {
  const location = useLocation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameState, setGameState] = useState<"splash" | "playing" | "gameover">("splash");
  const [soundOn, setSoundOn] = useState(false);
  const [hiScore, setHiScore] = useState(() => {
    const s = localStorage.getItem("naaperu-404-hi-score");
    return s ? parseInt(s) : 0;
  });
  const [activePowerUps, setActivePowerUps] = useState<{ shield: number; rapid: number; multi: number }>({ shield: 0, rapid: 0, multi: 0 });
  const [permanentActive, setPermanentActive] = useState<{ triple: boolean; turbo: boolean }>({ triple: false, turbo: false });

  const gameRef = useRef<{
    player: { x: number };
    bullets: Bullet[];
    enemyBullets: Bullet[];
    enemies: Enemy[];
    particles: Particle[];
    stars: Star[];
    powerUps: PowerUp[];
    boss: Boss | null;
    keys: Set<string>;
    enemyDir: number;
    enemySpeed: number;
    enemyMoveTimer: number;
    enemyFrame: number;
    shootCooldown: number;
    enemyShootTimer: number;
    score: number;
    lives: number;
    level: number;
    running: boolean;
    shakeTimer: number;
    powerUpTimers: { shield: number; rapid: number; multi: number };
    permanentPowerUps: { triple: boolean; turbo: boolean };
    bossLevel: boolean;
    bossDropTimer: number;
    bossLastHpRatio: number;
  } | null>(null);

  // Log 404
  useEffect(() => {
    console.error(`404 Not Found — Route: ${location.pathname}`);
  }, [location.pathname]);

  // Sound toggle
  const toggleSound = useCallback(() => {
    const next = !soundOn;
    setSoundOn(next);
    setMuted(!next);
  }, [soundOn]);

  const initStars = (): Star[] =>
    Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random() * CANVAS_WIDTH,
      y: Math.random() * CANVAS_HEIGHT,
      speed: 0.2 + Math.random() * 0.8,
      size: Math.random() > 0.7 ? 2 : 1,
    }));

  const initEnemies = (level: number): Enemy[] => {
    const enemies: Enemy[] = [];
    const rows = Math.min(ENEMY_ROWS + Math.floor(level / 3), 7);
    const cols = ENEMY_COLS;
    const startX = (CANVAS_WIDTH - cols * (ENEMY_WIDTH + ENEMY_PAD_X)) / 2;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        enemies.push({ x: startX + c * (ENEMY_WIDTH + ENEMY_PAD_X), y: 50 + r * (ENEMY_HEIGHT + ENEMY_PAD_Y), alive: true, row: r, hp: 1 });
      }
    }
    return enemies;
  };

  const initBoss = (level: number): Boss => ({
    x: CANVAS_WIDTH / 2, y: 80, hp: 30 + level * 10, maxHp: 30 + level * 10,
    dir: 1, shootTimer: 0, phase: 0, alive: true,
  });

  const spawnParticles = (x: number, y: number, color: string, count: number) => {
    if (!gameRef.current) return;
    for (let i = 0; i < count; i++) {
      gameRef.current.particles.push({ x, y, vx: (Math.random() - 0.5) * 6, vy: (Math.random() - 0.5) * 6, life: 20 + Math.random() * 20, color });
    }
  };

  const startGame = useCallback(() => {
    gameRef.current = {
      player: { x: CANVAS_WIDTH / 2 - PLAYER_WIDTH / 2 },
      bullets: [], enemyBullets: [], enemies: initEnemies(1), particles: [], stars: initStars(),
      powerUps: [], boss: null, keys: new Set(), enemyDir: 1, enemySpeed: 1, enemyMoveTimer: 0,
      enemyFrame: 0, shootCooldown: 0, enemyShootTimer: 0, score: 0, lives: 3, level: 1,
      running: true, shakeTimer: 0, powerUpTimers: { shield: 0, rapid: 0, multi: 0 },
      permanentPowerUps: { triple: false, turbo: false },
      bossLevel: false, bossDropTimer: 0, bossLastHpRatio: 1,
    };
    setScore(0);
    setLives(3);
    setActivePowerUps({ shield: 0, rapid: 0, multi: 0 });
    setPermanentActive({ triple: false, turbo: false });
    setGameState("playing");
  }, []);

  const nextLevel = useCallback(() => {
    if (!gameRef.current) return;
    const g = gameRef.current;
    g.level++;
    g.bossLevel = g.level % 3 === 0;
    if (g.bossLevel) { g.enemies = []; g.boss = initBoss(g.level); playBossAlert(); }
    else { g.enemies = initEnemies(g.level); g.boss = null; }
    g.bullets = []; g.enemyBullets = []; g.powerUps = [];
    g.enemyDir = 1; g.enemySpeed = 1 + g.level * 0.3; g.enemyMoveTimer = 0;
    g.bossDropTimer = 0; g.bossLastHpRatio = 1;
    g.player.x = CANVAS_WIDTH / 2 - PLAYER_WIDTH / 2;
    // permanentPowerUps intentionally preserved across levels
  }, []);

  // Splash: space/enter to start
  useEffect(() => {
    if (gameState !== "splash") return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === " " || e.key === "Enter") { e.preventDefault(); startGame(); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [gameState, startGame]);

  // Game loop
  useEffect(() => {
    if (gameState !== "playing") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const g = gameRef.current!;

    const onKeyDown = (e: KeyboardEvent) => { g.keys.add(e.key); if (["ArrowLeft", "ArrowRight", " ", "ArrowUp", "ArrowDown"].includes(e.key)) e.preventDefault(); };
    const onKeyUp = (e: KeyboardEvent) => g.keys.delete(e.key);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    let animId: number;
    const loop = () => {
      if (!g.running) return;

      for (const s of g.stars) { s.y += s.speed; if (s.y > CANVAS_HEIGHT) { s.y = 0; s.x = Math.random() * CANVAS_WIDTH; } }

      if (g.keys.has("ArrowLeft") || g.keys.has("a")) g.player.x = Math.max(0, g.player.x - PLAYER_SPEED);
      if (g.keys.has("ArrowRight") || g.keys.has("d")) g.player.x = Math.min(CANVAS_WIDTH - PLAYER_WIDTH, g.player.x + PLAYER_SPEED);

      for (const key of ["shield", "rapid", "multi"] as const) { if (g.powerUpTimers[key] > 0) g.powerUpTimers[key]--; }
      setActivePowerUps({ ...g.powerUpTimers });

      // permanent power-ups always active — sync to React state each frame lazily via ref
      const isRapid = g.powerUpTimers.rapid > 0 || g.permanentPowerUps.turbo;
      const isMulti = g.powerUpTimers.multi > 0 || g.permanentPowerUps.triple;

      g.shootCooldown = Math.max(0, g.shootCooldown - 1);
      const cooldown = isRapid ? 5 : 12;
      if ((g.keys.has(" ") || g.keys.has("ArrowUp")) && g.shootCooldown === 0) {
        const bpy = CANVAS_HEIGHT - PLAYER_HEIGHT - 20;
        const cx = g.player.x + PLAYER_WIDTH / 2;
        g.bullets.push({ x: cx - BULLET_WIDTH / 2, y: bpy });
        if (isMulti) {
          g.bullets.push({ x: cx - BULLET_WIDTH / 2 - 12, y: bpy + 8 });
          g.bullets.push({ x: cx - BULLET_WIDTH / 2 + 12, y: bpy + 8 });
        }
        g.shootCooldown = cooldown;
        playShoot();
      }

      g.bullets = g.bullets.filter(b => { b.y -= BULLET_SPEED; return b.y > -BULLET_HEIGHT; });
      g.enemyBullets = g.enemyBullets.filter(b => { b.y += ENEMY_BULLET_SPEED; return b.y < CANVAS_HEIGHT + 10; });
      g.powerUps = g.powerUps.filter(p => { p.y += 1.5; return p.y < CANVAS_HEIGHT; });

      // Collect power-ups
      const py = CANVAS_HEIGHT - PLAYER_HEIGHT - 10;
      for (let i = g.powerUps.length - 1; i >= 0; i--) {
        const p = g.powerUps[i];
        if (p.x > g.player.x - 8 && p.x < g.player.x + PLAYER_WIDTH + 8 && p.y > py - 8 && p.y < py + PLAYER_HEIGHT + 8) {
          const colorMap: Record<string, string> = { shield: CYAN, rapid: ACCENT, multi: PRIMARY, triple: GOLD, turbo: PURPLE };
          if (p.permanent) {
            // Permanent power-ups
            if (p.type === "triple") { g.permanentPowerUps.triple = true; setPermanentActive(prev => ({ ...prev, triple: true })); }
            if (p.type === "turbo") { g.permanentPowerUps.turbo = true; setPermanentActive(prev => ({ ...prev, turbo: true })); }
            spawnParticles(p.x, p.y, colorMap[p.type], 20);
          } else {
            (g.powerUpTimers as Record<string, number>)[p.type] = p.type === "shield" ? 600 : 480;
            spawnParticles(p.x, p.y, colorMap[p.type], 8);
          }
          g.powerUps.splice(i, 1);
          playPowerUp();
        }
      }

      // Boss logic
      if (g.boss && g.boss.alive) {
        const boss = g.boss;
        const hpRatio = boss.hp / boss.maxHp;
        const speed = hpRatio > 0.5 ? 2 : hpRatio > 0.25 ? 3.5 : 5;
        boss.x += boss.dir * speed;
        if (boss.x <= 50 || boss.x >= CANVAS_WIDTH - 50) boss.dir *= -1;
        boss.phase = hpRatio > 0.5 ? 0 : hpRatio > 0.25 ? 1 : 2;

        // --- HP threshold drops (once per threshold) ---
        if (g.bossLastHpRatio > 0.75 && hpRatio <= 0.75) {
          // 75% HP → drop TRIPLE (permanent)
          if (!g.permanentPowerUps.triple)
            g.powerUps.push({ x: boss.x, y: boss.y + 40, type: "triple", timer: 0, permanent: true });
        }
        if (g.bossLastHpRatio > 0.5 && hpRatio <= 0.5) {
          // 50% HP → drop SHIELD (temporary)
          g.powerUps.push({ x: boss.x - 20, y: boss.y + 40, type: "shield", timer: 0 });
          g.powerUps.push({ x: boss.x + 20, y: boss.y + 40, type: "rapid", timer: 0 });
        }
        if (g.bossLastHpRatio > 0.25 && hpRatio <= 0.25) {
          // 25% HP → drop TURBO (permanent)
          if (!g.permanentPowerUps.turbo)
            g.powerUps.push({ x: boss.x, y: boss.y + 40, type: "turbo", timer: 0, permanent: true });
        }
        g.bossLastHpRatio = hpRatio;

        // --- Periodic random drops every 200 frames ---
        g.bossDropTimer++;
        if (g.bossDropTimer >= 200) {
          g.bossDropTimer = 0;
          const tempTypes: Array<"shield" | "rapid" | "multi"> = ["shield", "rapid", "multi"];
          const t = tempTypes[Math.floor(Math.random() * tempTypes.length)];
          g.powerUps.push({ x: boss.x + (Math.random() - 0.5) * 100, y: boss.y + 40, type: t, timer: 0 });
        }

        // --- Shoot ---
        boss.shootTimer++;
        const shootInterval = boss.phase === 0 ? 40 : boss.phase === 1 ? 25 : 15;
        if (boss.shootTimer >= shootInterval) {
          boss.shootTimer = 0;
          if (boss.phase === 0) {
            g.enemyBullets.push({ x: boss.x, y: boss.y + 30 });
          } else if (boss.phase === 1) {
            g.enemyBullets.push({ x: boss.x - 20, y: boss.y + 30 });
            g.enemyBullets.push({ x: boss.x, y: boss.y + 30 });
            g.enemyBullets.push({ x: boss.x + 20, y: boss.y + 30 });
          } else {
            for (let i = -2; i <= 2; i++) g.enemyBullets.push({ x: boss.x + i * 15, y: boss.y + 30 });
          }
        }

        // --- Bullet hits ---
        for (const b of g.bullets) {
          if (b.x > boss.x - 40 && b.x < boss.x + 40 && b.y > boss.y - 25 && b.y < boss.y + 25) {
            boss.hp--; b.y = -100; g.score += 5; setScore(g.score);
            spawnParticles(b.x, b.y, SECONDARY, 4);
            playBossHit();
            if (boss.hp <= 0) {
              boss.alive = false; g.score += 500; setScore(g.score);
              spawnParticles(boss.x, boss.y, SECONDARY, 30);
              spawnParticles(boss.x, boss.y, ACCENT, 20);
              playBossDeath();
              // Death drops — 3 temporary power-ups spread out
              const deathTypes: Array<"shield" | "rapid" | "multi"> = ["shield", "rapid", "multi"];
              for (const dt of deathTypes) g.powerUps.push({ x: boss.x + (Math.random() - 0.5) * 80, y: boss.y, type: dt, timer: 0 });
              setTimeout(() => nextLevel(), 1500);
            }
          }
        }
      }

      // Enemy logic (non-boss)
      if (!g.bossLevel) {
        g.enemyMoveTimer++;
        const aliveCount = g.enemies.filter(e => e.alive).length;
        const moveInterval = Math.max(8, 40 - (g.enemies.length - aliveCount));
        if (g.enemyMoveTimer >= moveInterval) {
          g.enemyMoveTimer = 0; g.enemyFrame++;
          let hitEdge = false;
          for (const e of g.enemies) { if (!e.alive) continue; e.x += g.enemyDir * (8 + g.enemySpeed); if (e.x <= 0 || e.x + ENEMY_WIDTH >= CANVAS_WIDTH) hitEdge = true; }
          if (hitEdge) { g.enemyDir *= -1; for (const e of g.enemies) { if (e.alive) e.y += 16; } }
        }
        g.enemyShootTimer++;
        if (g.enemyShootTimer > 30) {
          g.enemyShootTimer = 0;
          const alive = g.enemies.filter(e => e.alive);
          if (alive.length > 0) { const shooter = alive[Math.floor(Math.random() * alive.length)]; g.enemyBullets.push({ x: shooter.x + ENEMY_WIDTH / 2, y: shooter.y + ENEMY_HEIGHT }); }
        }
        for (const b of g.bullets) {
          for (const e of g.enemies) {
            if (!e.alive) continue;
            if (b.x < e.x + ENEMY_WIDTH && b.x + BULLET_WIDTH > e.x && b.y < e.y + ENEMY_HEIGHT && b.y + BULLET_HEIGHT > e.y) {
              e.alive = false; b.y = -100; g.score += (ENEMY_ROWS - e.row) * 10; setScore(g.score);
              spawnParticles(e.x + ENEMY_WIDTH / 2, e.y + ENEMY_HEIGHT / 2, SECONDARY, 12);
              playExplosion();
              if (Math.random() < 0.1) {
                const types: Array<"shield" | "rapid" | "multi"> = ["shield", "rapid", "multi"];
                g.powerUps.push({ x: e.x + ENEMY_WIDTH / 2, y: e.y + ENEMY_HEIGHT / 2, type: types[Math.floor(Math.random() * types.length)], timer: 0 });
              }
            }
          }
        }
        for (const e of g.enemies) {
          if (e.alive && e.y + ENEMY_HEIGHT >= py) {
            g.running = false;
            if (g.score > hiScore) { setHiScore(g.score); localStorage.setItem("naaperu-404-hi-score", String(g.score)); }
            setGameState("gameover"); playGameOver(); return;
          }
        }
        if (g.enemies.length > 0 && g.enemies.every(e => !e.alive)) { playLevelUp(); nextLevel(); }
      }

      // Player hit
      for (const b of g.enemyBullets) {
        if (b.x > g.player.x && b.x < g.player.x + PLAYER_WIDTH && b.y > py && b.y < py + PLAYER_HEIGHT) {
          b.y = CANVAS_HEIGHT + 100;
          if (g.powerUpTimers.shield > 0) {
            g.powerUpTimers.shield = 0;
            spawnParticles(g.player.x + PLAYER_WIDTH / 2, py, CYAN, 15);
            playShieldBlock();
          } else {
            g.lives--; g.shakeTimer = 10; setLives(g.lives);
            playPlayerHit();
            spawnParticles(g.player.x + PLAYER_WIDTH / 2, py + PLAYER_HEIGHT / 2, PRIMARY, 8);
            if (g.lives <= 0) {
              g.running = false;
              if (g.score > hiScore) { setHiScore(g.score); localStorage.setItem("naaperu-404-hi-score", String(g.score)); }
              setGameState("gameover"); playGameOver(); return;
            }
          }
        }
      }

      g.particles = g.particles.filter(p => { p.x += p.vx; p.y += p.vy; p.life--; return p.life > 0; });
      if (g.shakeTimer > 0) g.shakeTimer--;

      // --- DRAW ---
      const shakeX = g.shakeTimer > 0 ? (Math.random() - 0.5) * 6 : 0;
      const shakeY = g.shakeTimer > 0 ? (Math.random() - 0.5) * 6 : 0;
      ctx.save();
      ctx.translate(shakeX, shakeY);
      ctx.fillStyle = BG;
      ctx.fillRect(-10, -10, CANVAS_WIDTH + 20, CANVAS_HEIGHT + 20);

      for (const s of g.stars) { ctx.fillStyle = `rgba(255,255,255,${0.3 + s.speed * 0.5})`; ctx.fillRect(s.x, s.y, s.size, s.size); }

      if (g.boss && g.boss.alive) drawBoss(ctx, g.boss, g.enemyFrame);
      for (const e of g.enemies) { if (!e.alive) continue; drawPixelEnemy(ctx, e.x, e.y, ENEMY_WIDTH, ENEMY_HEIGHT, g.enemyFrame); }
      for (const p of g.powerUps) drawPowerUp(ctx, p);

      drawPixelShip(ctx, g.player.x, py, PLAYER_WIDTH, PLAYER_HEIGHT, g.powerUpTimers.shield > 0);

      ctx.fillStyle = PRIMARY; ctx.shadowColor = PRIMARY; ctx.shadowBlur = 8;
      for (const b of g.bullets) ctx.fillRect(b.x, b.y, BULLET_WIDTH, BULLET_HEIGHT);
      ctx.shadowBlur = 0;

      ctx.fillStyle = ACCENT; ctx.shadowColor = ACCENT; ctx.shadowBlur = 6;
      for (const b of g.enemyBullets) ctx.fillRect(b.x, b.y, 3, 10);
      ctx.shadowBlur = 0;

      for (const p of g.particles) { ctx.globalAlpha = p.life / 40; ctx.fillStyle = p.color; ctx.fillRect(p.x, p.y, 3, 3); }
      ctx.globalAlpha = 1;

      if (g.bossLevel && g.boss && g.boss.alive) {
        ctx.fillStyle = SECONDARY; ctx.font = "10px 'Press Start 2P', monospace"; ctx.textAlign = "center";
        ctx.fillText("!! BOSS !!", CANVAS_WIDTH / 2, 25);
      }

      const pNames: Array<{ key: "shield" | "rapid" | "multi"; label: string; color: string }> = [
        { key: "shield", label: "SHIELD", color: CYAN }, { key: "rapid", label: "RAPID", color: ACCENT }, { key: "multi", label: "MULTI", color: PRIMARY },
      ];
      let pIdx = 0;
      for (const pn of pNames) {
        if (g.powerUpTimers[pn.key] > 0) {
          ctx.fillStyle = pn.color; ctx.font = "8px 'Press Start 2P', monospace"; ctx.textAlign = "left";
          ctx.fillText(`${pn.label}: ${Math.ceil(g.powerUpTimers[pn.key] / 60)}s`, 10, CANVAS_HEIGHT - 10 - pIdx * 14); pIdx++;
        }
      }
      // Permanent power-ups — shown with ★ (no timer)
      if (g.permanentPowerUps.triple) {
        ctx.fillStyle = GOLD; ctx.font = "8px 'Press Start 2P', monospace"; ctx.textAlign = "left";
        ctx.fillText("3-SHOT*", 10, CANVAS_HEIGHT - 10 - pIdx * 14); pIdx++;
      }
      if (g.permanentPowerUps.turbo) {
        ctx.fillStyle = PURPLE; ctx.font = "8px 'Press Start 2P', monospace"; ctx.textAlign = "left";
        ctx.fillText("TURBO*", 10, CANVAS_HEIGHT - 10 - pIdx * 14); pIdx++;
      }

      ctx.fillStyle = "rgba(0,0,0,0.06)";
      for (let i = 0; i < CANVAS_HEIGHT; i += 4) ctx.fillRect(0, i, CANVAS_WIDTH, 2);
      ctx.restore();

      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);

    return () => { cancelAnimationFrame(animId); window.removeEventListener("keydown", onKeyDown); window.removeEventListener("keyup", onKeyUp); };
  }, [gameState, nextLevel, hiScore]);

  // Touch controls
  const touchRef = useRef<{ left: boolean; right: boolean; shoot: boolean }>({ left: false, right: false, shoot: false });
  useEffect(() => {
    if (gameState !== "playing" || !gameRef.current) return;
    const g = gameRef.current;
    const interval = setInterval(() => {
      if (touchRef.current.left) g.keys.add("ArrowLeft"); else g.keys.delete("ArrowLeft");
      if (touchRef.current.right) g.keys.add("ArrowRight"); else g.keys.delete("ArrowRight");
      if (touchRef.current.shoot) g.keys.add(" "); else g.keys.delete(" ");
    }, 16);
    return () => clearInterval(interval);
  }, [gameState]);

  // Sound toggle button (shared across all screens)
  const SoundToggle = () => (
    <button
      onClick={toggleSound}
      className="flex h-10 w-10 items-center justify-center border border-border/40 bg-foreground/5 text-muted-foreground transition-colors hover:bg-foreground/10 hover:text-foreground"
      aria-label={soundOn ? "Mute sound" : "Unmute sound"}
    >
      {soundOn ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
    </button>
  );

  // === SPLASH SCREEN — 404 themed ===
  if (gameState === "splash") {
    return (
      <>
        <Seo
          title="404 | Page Not Found"
          description="The requested page was not found on Kedhar's portfolio. Play a game while you're here."
          path="/404"
          noindex
        />
        <div className="relative min-h-screen w-full bg-background text-foreground overflow-hidden flex flex-col">
          {/* Background effects */}
          <div className="absolute inset-0 z-0">
            <div className="game-stars-bg absolute w-1 h-1" />
            <div className="game-stars-bg absolute w-[2px] h-[2px] opacity-50" style={{ animationDuration: "120s", left: "10%" }} />
            <div className="absolute inset-0 game-hud-scanline pointer-events-none z-50" />
          </div>

          {/* Top bar */}
          <nav className="relative z-40 w-full p-6 md:p-10 flex justify-between items-start">
            <div className="flex flex-col gap-3">
              <div className="font-heading text-xs uppercase tracking-[0.3em] text-primary">
                ERROR <span className="text-foreground">404</span>
              </div>
              <div className="font-body text-xs text-muted-foreground">
                {location.pathname}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden md:block font-heading text-xs uppercase tracking-[0.2em] text-muted-foreground">
                HI-SCORE: {String(hiScore).padStart(5, "0")}
              </div>
              <SoundToggle />
            </div>
          </nav>

          {/* Main content */}
          <main className="relative z-20 flex-grow flex flex-col items-center justify-center px-6 cursor-pointer" onClick={startGame}>
            <div className="mb-12" style={{ animation: "game-enemy-wiggle 2s ease-in-out infinite alternate" }}>
              <EnemySprite />
            </div>

            <h1 className="font-heading text-[20vw] md:text-[14vw] lg:text-[10vw] leading-none text-foreground/10 text-center select-none relative">
              404
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-heading text-3xl md:text-5xl lg:text-6xl text-foreground tracking-tight">
                  Page not found.
                </span>
                <span className="mt-3 font-body text-sm md:text-base text-muted-foreground max-w-md text-center">
                  The path <span className="font-mono text-primary">{location.pathname}</span> doesn&apos;t exist. Shoot some aliens instead.
                </span>
              </div>
            </h1>

            <div className="mt-10 flex items-center gap-4">
              <div className="w-[8vw] h-[8vw] max-w-[60px] max-h-[60px]" style={{ animation: "game-float-ship 3s ease-in-out infinite" }}>
                <ShipSprite />
              </div>
            </div>

            <div className="mt-8 font-heading text-xs uppercase tracking-[0.3em] text-primary" style={{ animation: "game-blink 1s step-end infinite" }}>
              PRESS SPACE OR CLICK TO PLAY
            </div>

            <div className="mt-3 font-body text-[10px] text-muted-foreground text-center leading-relaxed uppercase tracking-widest">
              ARROWS / WASD TO MOVE &middot; SPACE / UP TO SHOOT
            </div>
          </main>

          {/* Footer */}
          <footer className="relative z-30 w-full p-6 md:p-10">
            <div className="flex justify-between items-center border-t border-border/20 pt-6">
              <Link
                to="/"
                className="group inline-flex items-center gap-2 font-heading text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-primary"
              >
                <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-1" />
                Back to Home
              </Link>
              <div className="font-body text-[10px] text-foreground/20">
                KEDHAR SOFT &middot; 404 DEFENSE SYSTEM
              </div>
            </div>
          </footer>

          {/* Decorative elements */}
          <div className="absolute inset-0 z-10 pointer-events-none opacity-30">
            <div className="absolute top-[20%] left-[15%] w-0.5 h-6 bg-primary animate-pulse" />
            <div className="absolute bottom-[35%] right-[20%] w-0.5 h-4 bg-foreground/50" />
            <div className="absolute top-[50%] right-[10%] w-1 h-1 bg-foreground" />
          </div>
        </div>
      </>
    );
  }

  // === GAME / GAME-OVER SCREEN ===
  return (
    <>
      <Seo
        title="404 | Space Defense"
        description="Page not found — but you can play a game while you're here."
        path="/404"
        noindex
      />
      <div className="relative min-h-screen w-full bg-background text-foreground overflow-hidden flex flex-col items-center justify-center">
        <div className="absolute inset-0 z-0">
          <div className="game-stars-bg absolute w-1 h-1" />
          <div className="absolute inset-0 game-hud-scanline pointer-events-none" />
        </div>

        <div className="relative z-10 w-full max-w-[800px] px-4">
          {/* HUD */}
          <div className="flex justify-between items-center py-3 md:py-4">
            <div className="font-heading text-xs uppercase tracking-[0.2em] text-primary">
              SCORE: <span className="text-foreground">{String(score).padStart(6, "0")}</span>
            </div>
            <div className="font-heading text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {gameRef.current?.bossLevel ? "!! BOSS !!" : `STAGE ${gameRef.current ? String(gameRef.current.level).padStart(2, "0") : "01"}`}
            </div>
            <div className="flex gap-4 items-center">
              <span className="font-heading text-xs uppercase tracking-[0.2em] text-foreground/70">
                LIVES: <span className="text-primary">{"||".repeat(Math.max(0, lives))}</span>
              </span>
              <SoundToggle />
            </div>
          </div>

          {/* Canvas */}
          <div className="relative border border-border/20">
            <canvas ref={canvasRef} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} className="w-full aspect-[4/3] bg-background block" />

            {gameState === "gameover" && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/85 backdrop-blur-sm gap-6">
                <div className="font-heading text-2xl md:text-3xl text-foreground uppercase tracking-[0.2em]">GAME OVER</div>
                <div className="font-heading text-sm uppercase tracking-[0.2em] text-primary">
                  FINAL SCORE: {String(score).padStart(6, "0")}
                </div>
                {score >= hiScore && score > 0 && (
                  <div className="font-heading text-xs text-primary animate-pulse uppercase tracking-[0.3em]">NEW HI-SCORE</div>
                )}
                <div className="flex gap-4">
                  <button
                    onClick={startGame}
                    className="px-6 py-3 border border-primary text-primary font-heading text-xs uppercase tracking-[0.2em] transition-colors hover:bg-primary hover:text-primary-foreground"
                  >
                    PLAY AGAIN
                  </button>
                  <button
                    onClick={() => setGameState("splash")}
                    className="px-6 py-3 border border-border text-muted-foreground font-heading text-xs uppercase tracking-[0.2em] transition-colors hover:bg-muted hover:text-foreground"
                  >
                    BACK
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Active power-ups */}
          <div className="flex gap-3 mt-2 justify-center flex-wrap min-h-[16px]">
            {activePowerUps.shield > 0 && <span className="font-heading text-[8px] uppercase tracking-widest" style={{ color: CYAN }}>SHIELD {Math.ceil(activePowerUps.shield / 60)}s</span>}
            {activePowerUps.rapid > 0 && <span className="font-heading text-[8px] uppercase tracking-widest" style={{ color: ACCENT }}>RAPID {Math.ceil(activePowerUps.rapid / 60)}s</span>}
            {activePowerUps.multi > 0 && <span className="font-heading text-[8px] uppercase tracking-widest text-primary">MULTI {Math.ceil(activePowerUps.multi / 60)}s</span>}
            {permanentActive.triple && <span className="font-heading text-[8px] uppercase tracking-widest" style={{ color: GOLD }}>3-SHOT ★</span>}
            {permanentActive.turbo && <span className="font-heading text-[8px] uppercase tracking-widest" style={{ color: PURPLE }}>TURBO ★</span>}
          </div>

          {/* Mobile touch controls */}
          <div className="flex md:hidden justify-between items-center mt-4 gap-2">
            <div className="flex gap-2">
              <button
                className="w-16 h-16 border border-primary/40 text-primary active:bg-primary/20 flex items-center justify-center text-2xl select-none font-heading"
                onTouchStart={() => (touchRef.current.left = true)} onTouchEnd={() => (touchRef.current.left = false)}
                onMouseDown={() => (touchRef.current.left = true)} onMouseUp={() => (touchRef.current.left = false)}
              >
                &#9664;
              </button>
              <button
                className="w-16 h-16 border border-primary/40 text-primary active:bg-primary/20 flex items-center justify-center text-2xl select-none font-heading"
                onTouchStart={() => (touchRef.current.right = true)} onTouchEnd={() => (touchRef.current.right = false)}
                onMouseDown={() => (touchRef.current.right = true)} onMouseUp={() => (touchRef.current.right = false)}
              >
                &#9654;
              </button>
            </div>
            <button
              className="w-20 h-16 border border-primary/40 text-primary active:bg-primary/20 flex items-center justify-center text-xs select-none font-heading uppercase tracking-widest"
              onTouchStart={() => (touchRef.current.shoot = true)} onTouchEnd={() => (touchRef.current.shoot = false)}
              onMouseDown={() => (touchRef.current.shoot = true)} onMouseUp={() => (touchRef.current.shoot = false)}
            >
              FIRE
            </button>
          </div>

          {/* Bottom bar */}
          <div className="flex justify-between items-center py-3 text-muted-foreground">
            <Link
              to="/"
              className="group inline-flex items-center gap-2 font-heading text-[10px] uppercase tracking-[0.2em] transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-1" />
              Home
            </Link>
            <span className="font-body text-[10px] text-foreground/20 hidden md:block">
              HI: {String(hiScore).padStart(6, "0")}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
