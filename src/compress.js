const { existsSync, readdirSync } = require("fs");
const { join } = require("path");
const AdmZip = require("adm-zip");
const { create } = require("tar");

/**
 * Compresses a directory into a zip or tar archive
 * @param {string} sourceDir - The path to the source directory
 * @param {string} destFile - The path to the destination archive file
 * @param {string} [archiveType='zip'] - The type of archive to create (zip or tar)
 * @returns {Promise<void>}
 */
async function compress(sourceDir, destFile, archiveType = "zip") {
  try {
    if (!["zip", "tar"].includes(archiveType)) {
      throw new Error(`Invalid archive type: ${archiveType}`);
    }
    if (!existsSync(sourceDir)) {
      throw new Error("Source directory does not exist");
    }

    if (archiveType === "zip") {
      await compressDirToZip(sourceDir, destFile);
    } else {
      await compressDirToTar(sourceDir, destFile);
    }
  } catch (error) {
    throw error;
  }
}

/**
 * Compresses a directory into a zip archive
 * @param {string} sourceDir - The path to the source directory
 * @param {string} destFile - The path to the destination zip file
 * @returns {Promise<void>}
 */
async function compressDirToZip(sourceDir, destFile) {
  const zip = new AdmZip();

  try {
    // Read all files in the source directory
    const files = readdirSync(sourceDir);

    // Add each file to the zip archive
    files.forEach((file) => {
      const filePath = join(sourceDir, file);
      zip.addLocalFile(filePath);
    });
  } catch (err) {
    throw new Error(`Error zipping file`);
  }

  // Write the zip archive to the destination file
  await zip.writeZip(destFile);
}

/**
 * Compresses a directory into a tar archive
 * @param {string} sourceDir - The path to the source directory
 * @param {string} destFile - The path to the destination tar file
 * @returns {Promise<void>}
 */
async function compressDirToTar(sourceDir, destFile) {
  await create(
    {
      file: destFile,
      cwd: sourceDir,
    },
    readdirSync(sourceDir)
  );
}

export default compress;
