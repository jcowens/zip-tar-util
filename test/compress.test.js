const { join } = require("path");
const {
  existsSync,
  mkdirSync,
  rmdirSync,
  unlinkSync,
  writeFileSync,
} = require("fs");
import compress from "../src/compress.js";

describe("compress", () => {
  const testDir = join(__dirname, "testDir");
  const testFilePath1 = join(testDir, "testFile1.txt");
  const testFilePath2 = join(testDir, "testFile2.txt");
  const zipPath = join(__dirname, "testDir.zip");

  beforeAll(() => {
    // create test directory and files
    if (!existsSync(testDir)) {
      mkdirSync(testDir);
    }
    writeFileSync(testFilePath1, "Test file 1 content");
    writeFileSync(testFilePath2, "Test file 2 content");
  });

  afterAll(() => {
    // remove test directory and files
    unlinkSync(zipPath);
    unlinkSync(testFilePath1);
    unlinkSync(testFilePath2);
    rmdirSync(testDir);
  });

  test("should compress a directory into a zip file", async () => {
    try {
      await compress(testDir, zipPath, "zip");
      expect(existsSync(zipPath)).toBe(true);
    } catch (error) {
      console.error(error);
      throw error;
    }
  });

  test("should throw an error if source directory does not exist", async () => {
    const invalidDirPath = join(__dirname, "invalidDir");
    const zipPath = join(__dirname, "invalidDir.zip");
    try {
      await compress(invalidDirPath, zipPath);
    } catch (error) {
      expect(error.message).toBe("Source directory does not exist");
    }
  });
});
