import sharp from "sharp";

const tasks = [
  {
    input: "src/assets/me.png",
    output: "src/assets/me.webp",
    width: 900,
    quality: 82,
  },
];

const run = async () => {
  for (const task of tasks) {
    await sharp(task.input)
      .resize({ width: task.width, withoutEnlargement: true })
      .webp({ quality: task.quality })
      .toFile(task.output);
    console.log(`optimized: ${task.output}`);
  }
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
