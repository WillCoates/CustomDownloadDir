# CustomDownloadDir
Chrome extension to customise download directory based off metadata

# Format

Files will be saved in a location provided to the extension. By default this is
"%y-%m-%d/%f" without quotes. To modify, go to <chrome://extensions>, find
Custom Download Directory and click details, then click extension options.

The format string contains embedded formatting tags prefixed with a %, which
are explained in the table below. Any other characters are used as is. Use /
to create folders based off the tags provided.

| Specifier | Output                                        | Example      |
|:--------- |:--------------------------------------------- |:------------ |
| %         | The character %                               | %            |
| f         | The name of the file being downloaded         | example.json |
| y         | The year the download started                 | 2020         |
| m         | The month the download started as two digits  | 09           |
| d         | The day the download started as two digits    | 10           |
| h         | The hour the download started as two digits   | 14           |
| M         | The minute the download started as two digits | 53           |
| s         | The second the download started as two digits | 08           |

## Examples

| Format         | Example output             |
|:-------------- |:-------------------------- |
| %y-%m-%d/%f    | 2020-09-10/example.json    |
| %y/%m/%d/%h/%f | 2020/09/10/14/example.json |
