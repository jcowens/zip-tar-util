import { existsSync, readdirSync, statSync } from "fs";
import { join, basename } from "path";
import AdmZip from "adm-zip";
import { create } from "tar";
import { promisify } from "util";
import globModule from "glob";

const glob = promisify(globModule);

/**
 * Compresses a directory into a zip, tar, tar.gz or tgz archive
 * @param {string} sourceDir - The path to the source directory
 * @param {string} destFile - The path to the destination archive file
 * @param {string} [archiveType='zip'] - The type of archive to create (zip, tar, tar.gz or tgz)
 * @returns {Promise<void>}
 */
async function compress(sourceDir, destFile, archiveType) {
  try {
    if (archiveType && !["zip", "tar", "tar.gz", "tgz"].includes(archiveType)) {
      throw new Error(`Invalid archive type: ${archiveType}`);
    }
    if (!existsSync(sourceDir)) {
      throw new Error("Source directory does not exist");
    }

    if (archiveType === "zip" || !archiveType) {
      // If archiveType is not supplied, default to zip
      const outputFileName = destFile.endsWith(".zip")
        ? destFile
        : `${destFile}.zip`;
      await compressDirToZip(sourceDir, outputFileName);
    } else if (
      archiveType === "tar" ||
      archiveType === "tar.gz" ||
      archiveType === "tgz"
    ) {
      let outputFileName;
      if (archiveType === "tar") {
        outputFileName = destFile.endsWith(".tar")
          ? destFile
          : `${destFile}.tar`;
      } else {
        outputFileName =
          destFile.endsWith(".tar.gz") || destFile.endsWith(".tgz")
            ? destFile
            : `${destFile}.tar.gz`;
      }
      await compressDirToTar(sourceDir, outputFileName, archiveType);
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
    // Read all files and directories in the source directory
    const entries = readdirSync(sourceDir, { withFileTypes: true });

    // Add each file or directory to the zip archive
    for (const entry of entries) {
      const entryPath = join(sourceDir, entry.name);
      if (entry.isDirectory()) {
        zip.addLocalFolder(entryPath, entry.name);
      } else {
        zip.addLocalFile(entryPath);
      }
    }

    // Write the zip archive to the destination file
    await zip.writeZip(destFile);
  } catch (err) {
    throw new Error(`Error zipping file`);
  }

  if (!existsSync(destFile)) {
    console.error(`Zip file ${destFile} not found`);
  }
}

/**
 * Compresses a directory into a tar archive
 * @param {string} sourceDir - The path to the source directory
 * @param {string} destFile - The path to the destination tar file
 * @returns {Promise<void>}
 */
async function compressDirToTar(sourceDir, destFile) {
  const files = await glob("**/*", {
    cwd: sourceDir,
    dot: true,
    nodir: true,
    ignore: ["**/.."],
  });

  try {
    await create(
      {
        file: destFile,
        cwd: sourceDir,
      },
      files
    );
  } catch (err) {
    throw new Error(`Error creating tar file: ${err.message}`);
  }

  if (!existsSync(destFile)) {
    console.error(`Tar file ${destFile} not found`);
  }
}

export default compress;
