const path = require("path");
const {
  existsSync,
  mkdirSync,
  rmdirSync,
  writeFileSync,
  unlinkSync,
} = require("fs");
import decompress from "../src/decompress";

//TO DO

//make testdir.zip and testdir.tar for decompress test

describe("decompress", () => {
  beforeAll(() => {
    const zipPath = path.join(__dirname, "test_files", "testZip.zip");
    const tarPath = path.join(__dirname, "test_files", "testTar.tar");
    if (existsSync(zipPath)) {
      const zipDirPath = path.join(
        __dirname,
        "test_files",
        "decompressedZipDir"
      );
      if (!existsSync(zipDirPath)) {
        mkdirSync(zipDirPath);
        decompress(zipPath, zipDirPath);
      }
    }
    if (existsSync(tarPath)) {
      const tarDirPath = path.join(
        __dirname,
        "test_files",
        "decompressedTarDir"
      );
      if (!existsSync(tarDirPath)) {
        mkdirSync(tarDirPath);
        decompress(tarPath, tarDirPath);
      }
    }
    const invalidZipPath = path.join(__dirname, "test_files", "invalidZip.zip");
    const invalidTarPath = path.join(__dirname, "test_files", "invalidTar.tar");
    writeFileSync(invalidZipPath, "");
    writeFileSync(invalidTarPath, "");
    const zipFiles = ["file1.txt", "file2.txt", "subdir/file3.txt"];
    const tarFiles = ["file4.txt", "file5.txt", "subdir/file6.txt"];
    const zipDirPath = path.join(__dirname, "test_files", "decompressedZipDir");
    zipFiles.forEach((file) => {
      writeFileSync(path.join(zipDirPath, file), "");
    });
    const tarDirPath = path.join(__dirname, "test_files", "decompressedTarDir");
    tarFiles.forEach((file) => {
      writeFileSync(path.join(tarDirPath, file), "");
    });
  });

  afterAll(() => {
    const zipDirPath = path.join(__dirname, "test_files", "decompressedZipDir");
    const tarDirPath = path.join(__dirname, "test_files", "decompressedTarDir");
    const invalidZipPath = path.join(__dirname, "test_files", "invalidZip.zip");
    const invalidTarPath = path.join(__dirname, "test_files", "invalidTar.tar");

    ["file1.txt", "file2.txt", "subdir/file3.txt"].forEach((file) => {
      const filePath = path.join(zipDirPath, file);
      if (existsSync(filePath)) {
        unlinkSync(filePath);
      }
    });

    ["file4.txt", "file5.txt", "subdir/file6.txt"].forEach((file) => {
      const filePath = path.join(tarDirPath, file);
      if (existsSync(filePath)) {
        unlinkSync(filePath);
      }
    });

    if (existsSync(invalidZipPath)) {
      unlinkSync(invalidZipPath);
    }
    if (existsSync(invalidTarPath)) {
      unlinkSync(invalidTarPath);
    }
  });

  test("should decompress a zip file into a directory and match original input files", async () => {
    const zipDirPath = path.join(__dirname, "decompressedZipDir");
    const expectedFiles = ["file1.txt", "file2.txt", "subdir/file3.txt"];
    expectedFiles.forEach((file) => {
      expect(existsSync(join(zipDirPath, file))).toBe(true);
    });
  });

  test("should decompress a tar file into a directory and match original input files", async () => {
    const tarDirPath = path.join(__dirname, "decompressedTarDir");
    const expectedFiles = ["file4.txt", "file5.txt", "subdir/file6.txt"];
    expectedFiles.forEach((file) => {
      expect(existsSync(join(tarDirPath, file))).toBe(true);
    });
  });

  test("should throw an error if source zip file is an invaild type", async () => {
    const invalidZipPath = path.join(__dirname, "invalidZip.zip");
    const dirPath = join(__dirname, "invalidDir");
    await expect(decompress(invalidZipPath, dirPath)).rejects.toThrow(
      "Invalid or unsupported zip format. No END header found"
    );
  });

  test("should throw an error if source tar file is an invaild type", async () => {
    const invalidTarPath = path.join(__dirname, "invalidTar.tar");
    const dirPath = join(__dirname, "invalidDir");
    await expect(decompress(invalidTarPath, dirPath)).rejects.toThrow(
      "TAR_BAD_ARCHIVE: Unrecognized archive format"
    );
  });
});
