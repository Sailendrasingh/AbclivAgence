# Script pour remplacer [CAPTURE: ...] par la syntaxe Markdown des images

$files = @("MANUEL_SUPER_ADMIN.md", "MANUEL_SUPER_USER.md")

foreach ($file in $files) {
    if (Test-Path $file) {
        $content = Get-Content $file -Raw -Encoding UTF8
        
        # Remplacer [CAPTURE: Description] par ![Description](images/dossier/nom-fichier.png "Description")
        $content = $content -replace '\[CAPTURE: ([^\]]+)\]', {
            param($match)
            $description = $match.Groups[1].Value
            $folder = if ($file -like "*SUPER_ADMIN*") { "manuel-super-admin" } else { "manuel-super-user" }
            $filename = $description -replace '[^a-zA-Z0-9\s]', '' -replace '\s+', '-' -replace '^-|-$', '' -replace '-+', '-'
            $filename = $filename.ToLower()
            "![$description](images/$folder/$filename.png `"$description`")"
        }
        
        Set-Content $file -Value $content -Encoding UTF8 -NoNewline
        Write-Host "Traité: $file"
    }
}

Write-Host "Terminé!"


