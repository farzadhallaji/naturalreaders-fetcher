// ==UserScript==
// @name         Extract and Download Blob URLs with Index
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  Extract, index, and download blob URLs automatically in order.
// @author       You
// @match        https://www.naturalreaders.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let blobUrls = [];
    let fileIndex = 1;

    // Function to download all collected blob URLs sequentially with index
    function downloadAllBlobUrls() {
        blobUrls.forEach((url, index) => {
            downloadBlobUrl(url, index + 1);
        });
    }

    // Function to download a single blob URL and assign it a numbered filename
    function downloadBlobUrl(url, index) {
        // Create an anchor element to trigger the download
        const a = document.createElement('a');
        a.href = url;
        a.download = `file_${index}.mp3`;  // You can customize the file extension based on the blob type
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    // Add a button to the page to trigger the downloads
    function addDownloadButton() {
        const button = document.createElement('button');
        button.textContent = 'Download All Blob URLs';
        button.style.position = 'fixed';
        button.style.top = '10px';
        button.style.right = '10px';
        button.style.zIndex = '1000';
        button.style.backgroundColor = '#4CAF50';
        button.style.color = 'white';
        button.style.padding = '10px';
        button.style.border = 'none';
        button.style.borderRadius = '5px';
        button.style.cursor = 'pointer';

        button.addEventListener('click', downloadAllBlobUrls);

        document.body.appendChild(button);
    }

    // Hook into URL.createObjectURL to capture blob URLs
    const originalCreateObjectURL = URL.createObjectURL;
    URL.createObjectURL = function(blob) {
        const url = originalCreateObjectURL.apply(this, arguments);
        if (url.startsWith('blob:')) {
            console.log('Blob URL created via URL.createObjectURL:', url);
            blobUrls.push(url);  // Save blob URL to the array
        }
        return url;
    };

    // Look for blob URLs in existing media elements on the page
    function scanMediaElements() {
        const mediaElements = document.querySelectorAll('audio, video, img, iframe, source');
        mediaElements.forEach(element => {
            const blobURL = element.src || element.currentSrc;
            if (blobURL && blobURL.startsWith('blob:') && !blobUrls.includes(blobURL)) {
                console.log('Blob URL found in media element:', blobURL);
                blobUrls.push(blobURL);  // Save blob URL to the array
            }
        });
    }

    // Monitor for dynamically added media elements using MutationObserver
    const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(node => {
                    if (node.tagName === 'AUDIO' || node.tagName === 'VIDEO' || node.tagName === 'IMG' || node.tagName === 'IFRAME' || node.tagName === 'SOURCE') {
                        const blobURL = node.src || node.currentSrc;
                        if (blobURL && blobURL.startsWith('blob:') && !blobUrls.includes(blobURL)) {
                            console.log('Blob URL found in dynamically added media element:', blobURL);
                            blobUrls.push(blobURL);  // Save blob URL to the array
                        }
                    }
                });
            }
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Periodically scan the document for new media elements (as a fallback)
    setInterval(scanMediaElements, 3000);  // Run every 3 seconds

    // Add the download button once the page loads
    window.addEventListener('load', () => {
        addDownloadButton();
        scanMediaElements();  // Initial scan when the page loads
    });

})();
