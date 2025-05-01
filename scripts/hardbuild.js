import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distPath = path.join(__dirname, "../dist");
const assetsPath = path.join(distPath, "assets");

function fileToBase64(filepath) {
    const ext = path.extname(filepath).slice(1);
    const mime = {
        png: "image/png",
        jpg: "image/jpeg",
        jpeg: "image/jpeg",
        gif: "image/gif",
        svg: "image/svg+xml",
        webp: "image/webp",
        mp3: "audio/mpeg",
    }[ext] || "application/octet-stream";

    const buffer = fs.readFileSync(filepath);
    return `data:${mime};base64,${buffer.toString("base64")}`;
}


try {
    console.log("Building...");
    await execAsync("npm run build");
    console.log("Build complete");

    if (!fs.existsSync(assetsPath)) fs.mkdirSync(assetsPath);

    const entries = fs.readdirSync(distPath).filter(f => f !== "index.html" && f !== "assets");

    for (const entry of entries) {
        const oldPath = path.join(distPath, entry);
        const newPath = path.join(assetsPath, entry);
        fs.renameSync(oldPath, newPath);
    }

    console.log("Файлы перемещены в assets");

    const indexPath = path.join(distPath, "index.html");
    let html = fs.readFileSync(indexPath, "utf-8");

    html = html.replace(/(src|href)=['"]\/?([^'"]+)['"]/g, (_, attr, val) => {
        return `${attr}="./${val.replace(/^\.?\//, '')}"`;
    });

    fs.writeFileSync(indexPath, html);
    console.log("Пути в index.html обновлены.");

    const jsFiles = fs.readdirSync(assetsPath).filter(f => f.endsWith(".js"));
    const embeddedImages = new Set();

    for (const file of jsFiles) {
        const filePath = path.join(assetsPath, file);
        let content = fs.readFileSync(filePath, "utf-8");

        content = content.replace(/(["'`])\/(img\/[^"'`]+)\1/g, (_, q, rel) => {
            const imgPath = path.join(assetsPath, rel);
            if (fs.existsSync(imgPath)) {
                const base64 = fileToBase64(imgPath);
                embeddedImages.add(imgPath);
                return `${q}${base64}${q}`;
            }
            return _;
        });

        fs.writeFileSync(filePath, content);
    }

    for (const filePath of embeddedImages) {
        fs.unlinkSync(filePath);
    }

    console.log("Изображения встроены в JS как base64 и удалены из assets/img.");

    const cssFiles = fs.readdirSync(assetsPath).filter(f => f.endsWith(".css"));

    for (const file of cssFiles) {
        const filePath = path.join(assetsPath, file);
        let content = fs.readFileSync(filePath, "utf-8");

        content = content.replace(/url\((['"]?)\/(fonts\/[^)'"\s]+)\1\)/g, (_, quote, rel) => {
            return `url(${quote}./${rel}${quote})`;
        });

        content = content.replace(/url\((['"]?)\/(img\/[^)'"\s]+)\1\)/g, (_, quote, rel) => {
            return `url(${quote}./${rel}${quote})`;
        });

        fs.writeFileSync(filePath, content);
    }

    console.log("Пути к /fonts/ и /img/ внутри CSS-файлов обновлены.");
} catch (e) {
    console.error("Ошибка:", e);
}
