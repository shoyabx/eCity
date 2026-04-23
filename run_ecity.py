import os
import subprocess
import webbrowser
import time
import sys

def main():
    print("=== eCity Next.js Launcher ===")
    print("Initializing environment...")
    
    # Check if npm is installed
    try:
        subprocess.run(["npm", "--version"], check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True)
    except Exception:
        print("\n[ERROR] Node.js and NPM are not installed on this PC!")
        print("Please download and install Node.js from https://nodejs.org/")
        sys.exit(1)

    # Check for node_modules
    if not os.path.exists("node_modules"):
        print("\n[+] First time setup detected! Installing Next.js dependencies...")
        print("This might take a minute or two depending on your internet speed.\n")
        try:
            subprocess.run(["npm", "install"], check=True, shell=True)
            print("\n[+] Dependencies installed successfully!")
        except subprocess.CalledProcessError:
            print("\n[ERROR] Failed to install dependencies.")
            sys.exit(1)

    # Start the server
    print("\n[+] Starting the local development server...")
    print("[+] Opening http://localhost:3000 in your default browser...\n")
    print("To shut down the server later, press Ctrl+C in this console.")
    print("==============================================================\n")
    
    # We open the browser immediately. Next.js handles loading state beautifully if it takes a second.
    webbrowser.open("http://localhost:3000")

    # Run the server and block the terminal so it stays alive
    try:
        subprocess.run(["npm", "run", "dev"], shell=True)
    except KeyboardInterrupt:
        print("\n[+] Shutting down eCity Server. Goodbye!")

if __name__ == "__main__":
    main()
