import sharp from "sharp";
import { readdir, stat } from "fs/promises";
import { join, extname, basename } from "path";

const PROJECTS_DIR = "public/projects";
const MAX_WIDTH = 1200;
const QUALITY = 80;

async function convertAllPngs() {
  const files = await readdir(PROJECTS_DIR);
  const pngs = files.filter((f) => extname(f).toLowerCase() === ".png");

  console.log(`Found ${pngs.length} PNGs to convert\n`);

  let totalSaved = 0;

  for (const file of pngs) {
    const inputPath = join(PROJECTS_DIR, file);
    const outputPath = join(PROJECTS_DIR, basename(file, ".png") + ".webp");

    const inputStat = await stat(inputPath);
    const inputSize = inputStat.size;

    await sharp(inputPath)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(outputPath);

    const outputStat = await stat(outputPath);
    const outputSize = outputStat.size;
    const saved = inputSize - outputSize;
    totalSaved += saved;

    console.log(
      `${file} → ${basename(outputPath)}  |  ${(inputSize / 1024).toFixed(0)}KB → ${(outputSize / 1024).toFixed(0)}KB  (saved ${(saved / 1024).toFixed(0)}KB)`
    );
  }

  console.log(`\nTotal saved: ${(totalSaved / 1024 / 1024).toFixed(1)}MB`);
}

convertAllPngs().catch((error) => {
  console.error(error);
  process.exit(1);
});
