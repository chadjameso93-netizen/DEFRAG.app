
# Defrag macOS automation pack

This pack is designed so you do not need to copy and paste long terminal blocks.

It includes:
- a one-click bootstrap shell script
- a one-click run script
- an AppleScript launcher for Terminal
- a Git helper script for commit + push

## Recommended use

1. Download and unzip this pack.
2. Move the files into your local repo at `~/DEFRAG.app`
3. Open Script Editor and run `Launch_Defrag_Terminal_Setup.applescript`
4. Or run these directly in Terminal:

```bash
cd ~/DEFRAG.app
bash automation/bootstrap_full_site.sh
bash automation/run_local.sh
```
