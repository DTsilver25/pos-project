import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default function readSql(_path: string):string {
    const schemaPath = path.join(__dirname, _path);
    return fs.readFileSync(schemaPath, "utf-8");
}