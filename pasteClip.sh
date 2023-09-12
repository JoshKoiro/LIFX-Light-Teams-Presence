#!/bin/bash

# Check if xsel is installed, and if not, install it
if ! command -v xsel &> /dev/null; then
    echo "xsel is not installed. Installing it..."
    sudo apt update
    sudo apt install xsel
fi

# Get clipboard content and save to key.txt
clipboard_content=$(xsel -o)
echo "$clipboard_content" > key.txt

echo "Clipboard content saved to key.txt"
