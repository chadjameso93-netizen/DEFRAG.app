
set repoPath to POSIX path of (path to home folder) & "DEFRAG.app"

tell application "Terminal"
	activate
	do script "cd " & quoted form of repoPath & " && bash automation/bootstrap_full_site.sh && bash automation/run_local.sh"
end tell
