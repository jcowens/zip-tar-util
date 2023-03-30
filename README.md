# zip-tar-util-js

A simple Node.js library for compressing and decompressing ZIP and TAR files.

## Installation

You can install this package using npm:

```
npm install zip-tar-util-js
```

## Usage

### compress(sourceDir, targetFile)

This function compresses a directory and saves the result in the target file in either zip or tar format.

```
import compress from 'zip-tar-util-js'

// Compress a directory into a zip file
compress('/path/to/source', '/path/to/target.zip');

// Compress a directory into a tar file
compress('/path/to/source', '/path/to/target.tar');
```
### decompress(sourceFile, targetDir)

```
import decompress from 'zip-tar-util-js'

// Decompress a zip file into a directory
decompress('/path/to/source.zip', '/path/to/target');

// Decompress a tar file into a directory
decompress('/path/to/source.tar', '/path/to/target');

```

## License

This package is licensed under the MIT License.