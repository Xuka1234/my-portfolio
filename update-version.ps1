# Portfolio Version Updater PowerShell Script

Write-Host ""
Write-Host "======================================" -ForegroundColor Cyan
Write-Host "    Portfolio Version Updater" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

# Function to generate random version
function Get-RandomVersion {
    $chars = "abcdefghijklmnopqrstuvwxyz0123456789"
    $version = ""
    for ($i = 0; $i -lt 8; $i++) {
        $version += $chars[(Get-Random -Maximum $chars.Length)]
    }
    return $version
}

try {
    # Read index.html
    $indexPath = Join-Path $PSScriptRoot "index.html"
    $content = Get-Content $indexPath -Raw
    
    # Generate new versions
    $cssVersion = Get-RandomVersion
    $jsVersion = Get-RandomVersion
    
    # Update CSS version
    $content = $content -replace "styles\.css\?v=[a-z0-9]+", "styles.css?v=$cssVersion"
    
    # Update JS version
    $content = $content -replace "script\.js\?v=[a-z0-9]+", "script.js?v=$jsVersion"
    
    # Write back to file
    Set-Content $indexPath $content -NoNewline
    
    Write-Host "✅ Versions updated successfully!" -ForegroundColor Green
    Write-Host "🎨 CSS version: $cssVersion" -ForegroundColor Yellow
    Write-Host "⚡ JS version: $jsVersion" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "🚀 Files ready for deployment with cache busting!" -ForegroundColor Green
    
} catch {
    Write-Host "❌ Error updating versions: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "Press any key to exit..."
$Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown") | Out-Null