$src = Join-Path $PSScriptRoot "sport.html"
$dst = Join-Path $PSScriptRoot "index.html"

$c = Get-Content $src -Raw

# 1. Remove all <script ...>...</script> blocks (covers external src scripts and inline scripts)
$c = [regex]::Replace($c, '(?is)<script\b[^>]*>.*?</script>', '')

# 2. Remove any stray self-closing/void script tags (rare, safety net)
$c = [regex]::Replace($c, '(?is)<script\b[^>]*/>', '')

# 3. Neutralize javascript: hrefs so nothing throws on click
$c = [regex]::Replace($c, 'href="javascript:[^"]*"', 'href="#"')

# 4. Convert internal site navigation links (which point to the live taj777.net backend)
#    into safe in-page anchors so clicking never navigates away or errors.
$c = [regex]::Replace($c, 'href="https://taj777\.net[^"]*"', 'href="#"')

# 5. Replace external favicon reference with local logo (avoid dependency on remote CDN)
$c = $c -replace 'href="https://wver\.sprintstaticdata\.com[^"]*"', 'href="./sport_files/logo.png"'

# 6. Drop preconnect hint to external font CDN (not required, purely cosmetic hint)
$c = [regex]::Replace($c, '<link rel="preconnect" href="https://fonts\.gstatic\.com/">', '')

Set-Content -Path $dst -Value $c -NoNewline -Encoding UTF8
Write-Host "Done. Output size:" (Get-Item $dst).Length
