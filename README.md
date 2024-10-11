# Natural Readers Downloder

## Overview

This Tampermonkey user script extracts, indexes, and automatically downloads `blob:` URLs from media elements (e.g., audio, video, images) on a webpage. The script is particularly useful for sites that dynamically generate and use `blob:` URLs, such as [Natural Readers](https://www.naturalreaders.com).

Each `blob:` URL is captured and downloaded sequentially with a numbered filename, such as `file_1.mp3`, `file_2.mp3`, etc.

## Features

- Automatically detects `blob:` URLs created via JavaScript's `URL.createObjectURL` method.
- Monitors dynamically added media elements (e.g., `<audio>`, `<video>`, `<img>`, `<iframe>`, `<source>`) on the page and captures their `blob:` URLs.
- Adds a "Download All Blob URLs" button to the webpage that, when clicked, downloads all captured URLs in sequence.
- File naming convention: `file_1.mp3`, `file_2.mp3`, etc.

## How It Works

1. The script hooks into `URL.createObjectURL` to capture any dynamically created `blob:` URLs.
2. It scans the webpage for media elements that use `blob:` URLs.
3. A button is added to the page to download all captured `blob:` URLs in sequential order.

## Installation

### Prerequisites

You need to have [Tampermonkey](https://www.tampermonkey.net/) or a similar user script manager installed in your browser:

- **Chrome**: [Tampermonkey Extension](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
- **Firefox**: [Tampermonkey Extension](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)
- **Edge**: [Tampermonkey Extension](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/dhajdkffbhgkgojlffalnbkjccjmknlk)

### Installing the Script

1. **Open Tampermonkey Dashboard** in your browser.
2. **Create a new script**.
3. Paste the script from this repository into the editor.
4. Save the script.

### Usage

1. Visit [Natural Readers](https://www.naturalreaders.com) or any other site where you want to capture `blob:` URLs.
2. The script will automatically run and capture any `blob:` URLs from media elements on the page.
3. A button titled **"Download All Blob URLs"** will appear in the top-right corner of the page.
4. Click the button to download all captured `blob:` URLs in sequential order. Each file will be downloaded with an index-based filename (e.g., `file_1.mp3`, `file_2.mp3`, etc.).

## Script Details

```javascript
// ==UserScript==
// @name         Extract and Download Blob URLs with Index
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  Extract, index, and download blob URLs automatically in order.
// @author       You
// @match        https://www.naturalreaders.com/*
// @grant        none
// ==/UserScript==
```

## Customization

You can customize the file extension or modify the filename by editing this line in the script:

```javascript
a.download = `file_${index}.mp3`;
```

You can change `.mp3` to another extension (e.g., `.png`, `.wav`) depending on the type of media you're downloading.

## Contributing

Feel free to fork this repository and submit pull requests with improvements, bug fixes, or new features.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Issues

If you encounter any issues or have questions, please open an issue in this repository, and I will address it as soon as possible.

