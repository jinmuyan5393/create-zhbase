import process from "node:process";
import { lightCyan } from "kolorist";
import { version } from "../../package.json";

/* eslint-disable no-console */
export function printBanner() {
  const text = `create-demo@v${version} 快速创建 unibest 项目`;
  let colorText = "";

  const startColor = { r: 0x3b, g: 0xd1, b: 0x91 };
  const endColor = { r: 0x2b, g: 0x4c, b: 0xee };

  for (let i = 0; i < text.length; i++) {
    const ratio = i / (text.length - 1);
    const red = Math.round(startColor.r + (endColor.r - startColor.r) * ratio);
    const green = Math.round(
      startColor.g + (endColor.g - startColor.g) * ratio
    );
    const blue = Math.round(startColor.b + (endColor.b - startColor.b) * ratio);
    colorText += `\x1B[38;2;${red};${green};${blue}m${text[i]}\x1B[0m`;
  }

  const output =
    process.stdout.isTTY && process.stdout.getColorDepth() > 8
      ? colorText
      : lightCyan(text);

  console.log("================", output);
}
