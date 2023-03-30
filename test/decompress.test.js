const { join } = require("path");
const { existsSync, mkdirSync, rmdirSync } = require("fs");
import decompress from "../src/decompress";

describe("decompress", () => {
  beforeAll(() => {
    const zipPath = join(__dirname, "testDir.zip");
    const dirPath = join(__dirname, "decompressedDir");
    if (!existsSync(dirPath)) {
      mkdirSync(dirPath);
      decompress(zipPath, dirPath);
    }
  });

  afterAll(() => {
    const dirPath = join(__dirname, "decompressedDir");
    rmdirSync(dirPath, { recursive: true });
  });

  test("should decompress a zip file into a directory", async () => {
    const dirPath = join(__dirname, "decompressedDir");
    await expect(existsSync(dirPath)).toBe(true);
  });

  test("should throw an error if source zip file does not exist", async () => {
    const invalidZipPath = join(__dirname, "invalidZip.zip");
    const dirPath = join(__dirname, "invalidDir");
    await expect(decompress(invalidZipPath, dirPath)).rejects.toThrow(
      "Source zip file does not exist"
    );
  });
});
