# Restore Vue.js and vendor scripts with error handling
$src = Join-Path $PSScriptRoot "sport.html"
$dst = Join-Path $PSScriptRoot "index.html"

$c = Get-Content $src -Raw

# 1. Remove only the problematic external scripts (reCAPTCHA, Firebase, etc.)
#    Keep jQuery, Lottie, and vendor bundles
$c = [regex]::Replace($c, '(?is)<script[^>]*src="[^"]*recaptcha[^"]*"[^>]*></script>', '')
$c = [regex]::Replace($c, '(?is)<script[^>]*src="[^"]*firebase[^"]*"[^>]*></script>', '')
$c = [regex]::Replace($c, '(?is)<script[^>]*src="[^"]*cdn-cgi[^"]*"[^>]*></script>', '')
$c = [regex]::Replace($c, '(?is)<script[^>]*src="[^"]*thumbmark[^"]*"[^>]*></script>', '')

# 2. Wrap the inline loader script in try-catch
$c = $c -replace '(?is)(document\.onreadystatechange = function \(\) \{[^}]*\})', 'try { $1 } catch(e) { console.warn("Loader error:", e); }'

# 3. Neutralize javascript: hrefs
$c = [regex]::Replace($c, 'href="javascript:[^"]*"', 'href="#"')

# 4. Convert internal taj777.net links to safe anchors
$c = [regex]::Replace($c, 'href="https://taj777\.net[^"]*"', 'href="#"')

# 5. Fix favicon
$c = $c -replace 'href="https://wver\.sprintstaticdata\.com[^"]*"', 'href="./sport_files/logo.png"'

# 6. Drop external font preconnect
$c = [regex]::Replace($c, '<link rel="preconnect" href="https://fonts\.gstatic\.com/">', '')

# 7. Fix hard-coded height
$c = $c -replace '--app-height: 945px;', '--app-height: 100vh;'

# 8. Wrap the main Vue initialization in error handler
$c = [regex]::Replace($c, '(?is)(new n\.a\(\{[^}]*\}\))', 'try { $1 } catch(e) { console.error("Vue init failed:", e); }')

Set-Content -Path $dst -Value $c -NoNewline -Encoding UTF8
Write-Host "Restored with error handling. Output size:" (Get-Item $dst).Length
