import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// Info: (20250730 - Tzuhan) 1. 取得上一個 commit 的 package.json 版本
function getLastCommittedVersion(): string | null {
  try {
    const content = execSync('git show HEAD:package.json', {
      encoding: 'utf8',
    });
    const pkg = JSON.parse(content);
    return pkg.version as string;
  } catch {
    return null;
  }
}

// Info: (20250730 - Tzuhan) 2. 讀取當前 package.json
const pkgPath = path.resolve(dirname, '../package.json');
const pkgRaw = fs.readFileSync(pkgPath, 'utf8');
const pkg = JSON.parse(pkgRaw) as { version: string };

// Info: (20250730 - Tzuhan) 3. 拆解版本號
// Info: (20250730 - Tzuhan)    e.g. "0.1.0+3" => main="0.1.0", meta="3"
const [mainVer, metaVer = ''] = pkg.version.split('+');

// Info: (20250730 - Tzuhan) 4. 取得上一個 commit 的版本，並拆解
const lastVer = getLastCommittedVersion();
let newVersion: string;

if (lastVer) {
  const [lastMain] = lastVer.split('+');
  if (lastMain !== mainVer) {
    // Info: (20250730 - Tzuhan) 主版本改了，保持純 mainVer
    newVersion = mainVer;
  } else {
    // Info: (20250730 - Tzuhan) 主版本相同，metadata 遞增
    const currentMeta = metaVer ? Number(metaVer) : 0;
    newVersion = `${mainVer}+${currentMeta + 1}`;
  }
} else {
  // Info: (20250730 - Tzuhan) 找不到上一版，就不加 metadata
  newVersion = mainVer;
}

// Info: (20250730 - Tzuhan) 5. 寫回 package.json
pkg.version = newVersion;
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n', 'utf8');
