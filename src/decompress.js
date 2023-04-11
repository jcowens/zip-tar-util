import fs from "fs";
import { extname } from "path";
import AdmZip from "adm-zip";
import { extract } from "tar";

/**
 * Decompresses a zip or tar archive into a directory
 * @param {string} sourceFile - The path to the source archive file
 * @param {string} destDir - The path to the destination directory
 * @returns {Promise<void>}
 */
async function decompress(sourceFile, destDir) {
  const ext = extname(sourceFile).toLowerCase();
  try {
    if (!fs.existsSync(sourceFile)) {
      throw new Error("Source zip file does not exist");
    }
    if (ext === ".zip") {
      await decompressZip(sourceFile, destDir);
    } else if (ext === ".tar" || ext === ".tar.gz" || ext === ".tgz") {
      await decompressTar(sourceFile, destDir);
    } else {
      throw new Error(`Unsupported archive format: ${ext}`);
    }
  } catch (error) {
    throw error;
  }
}

/**
 * Decompresses a zip archive into a directory
 * @param {string} sourceFile - The path to the source zip file
 * @param {string} destDir - The path to the destination directory
 * @returns {Promise<void>}
 */
async function decompressZip(sourceFile, destDir) {
  const zip = new AdmZip(sourceFile);
  // Extract all files from the zip archive to the destination directory
  zip.extractAllTo(destDir);
}

/**
 * Decompresses a tar archive into a directory
 * @param {string} sourceFile - The path to the source tar file
 * @param {string} destDir - The path to the destination directory
 * @returns {Promise<void>}
 */
async function decompressTar(sourceFile, destDir) {
  await extract({
    file: sourceFile,
    cwd: destDir,
  });
}

export default decompress;
