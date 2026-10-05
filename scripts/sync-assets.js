import fs from 'fs';
import path from 'path';

const srcDir = path.resolve('src/assets');
const publicDir = path.resolve('public/assets');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Lista de archivos utilizados específicamente por el runner en public/assets
const gameAssets = [
  'jump.mp3',
  'coin.mp3',
  'gameover.mp3',
  'transicion.mp3',
  'helado.png',
  'burbuja.png',
  'castillo-arena.png',
  'piedra-obstaculo.png',
  'basura-obstaculo.png',
  'glitch-obstaculo.png',
  'estrella-puntos.png',
  'glitch-puntos.png',
  'cielo-mar.png',
  'cielo-neon.jpeg',
  'cielo-glitch.jpg',
  'suelo-helado.png',
  'suelo-neon.jpg',
  'suelo-glitch.jpg',
  'sprites-personaje.png',
  'sprites-personaje-v2.png'
];

// Mapeos de nombres de src a public
const mappings = {
  'transicion-v2.mp3': 'transicion.mp3'
};

function copyIfDifferent(src, dest) {
  try {
    if (!fs.existsSync(dest)) {
      fs.copyFileSync(src, dest);
      return true;
    }
    const srcStat = fs.statSync(src);
    const destStat = fs.statSync(dest);
    if (srcStat.size !== destStat.size) {
      fs.copyFileSync(src, dest);
      return true;
    }
  } catch (err) {
    console.error(`Error copiando ${src} a ${dest}:`, err);
  }
  return false;
}

if (fs.existsSync(srcDir)) {
  // 1. Sincronizar archivos directos del juego
  gameAssets.forEach((file) => {
    const srcFile = path.join(srcDir, file);
    if (fs.existsSync(srcFile) && fs.statSync(srcFile).isFile()) {
      const destFile = path.join(publicDir, file);
      copyIfDifferent(srcFile, destFile);
    }
  });

  // 2. Aplicar mapeos (como v2 -> original)
  Object.entries(mappings).forEach(([srcName, destName]) => {
    const srcFile = path.join(srcDir, srcName);
    if (fs.existsSync(srcFile) && fs.statSync(srcFile).isFile()) {
      const destFile = path.join(publicDir, destName);
      copyIfDifferent(srcFile, destFile);
    }
  });

  console.log('✅ [sync-assets] Assets de juego sincronizados correctamente.');
}
