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

    for (const file of jsFiles) {
        const filePath = path.join(assetsPath, file);
        let content = fs.readFileSync(filePath, "utf-8");

        content = content.replace(/(["'`])\/(img\/[^"'`]+)\1/g, (_, q, rel) => {
            return `${q}./${rel}${q}`;
        });

        fs.writeFileSync(filePath, content);
    }
    console.log("Пути к /img/ внутри JS-файлов обновлены.");

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
