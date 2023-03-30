# zip-tar-util-js

A simple Node.js library for compressing and decompressing ZIP and TAR files.

## Installation

You can install this package using npm:

```
npm install zip-tar-util-js
```

## Usage

## compress(sourceDir, destFile, [archiveType])

Compresses a directory into either a zip or tar archive and saves it to the specified destination file.

### Parameters:

- `sourceDir` - A string representing the path to the source directory.
- `destFile` - A string representing the path to the destination archive file.
- `archiveType` (optional) - A string representing the type of archive to create. Must be one of the following: `'zip'`, `'tar'` or `undefined` (defaults to `'zip'` if not specified).

### Returns:

A `Promise` that resolves when the archive is created.

### Example:

```
import compress from 'zip-tar-util-js'

// Compress a directory into a zip file
compress("/path/to/source", "/path/to/target.zip", "zip");

// Compress a directory into a tar file
compress("/path/to/source", "/path/to/target.tar", "tar");
```

### decompress(sourceFile, targetDir)

This function decompresses the source archive file into the target directory.

- `sourceFile` - The path to the archive file to decompress.
- `targetDir` - The path to the directory where the archive file will be decompressed.

### Example:

```
import decompress from 'zip-tar-util-js'

// Decompress a zip file into a directory
decompress('/path/to/source.zip', '/path/to/target');

// Decompress a tar file into a directory
decompress('/path/to/source.tar', '/path/to/target');

```

## License

This package is licensed under the MIT License.
