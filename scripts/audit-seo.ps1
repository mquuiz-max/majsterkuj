# Audyt SEO artykulow wzgledem WYTYCZNE-SEO.md (swietosc).
# Uzycie:  powershell -ExecutionPolicy Bypass -File scripts/audit-seo.ps1
# Exit code: 0 = OK, 1 = sa bledy twarde do naprawy.
# Mozna wpiac do git hook / CI, zeby blokowac commity lamiace standard.

param(
  [string]$ArticlesDir = 'src/content/articles'
)

$ErrorActionPreference = 'SilentlyContinue'

# Katalog root = rodzic katalogu scripts/
$root = Split-Path -Parent $PSScriptRoot
$dir = Join-Path $root $ArticlesDir

if (-not (Test-Path $dir)) {
  Write-Host "BLAD: nie znaleziono katalogu $dir"
  exit 1
}

$files = Get-ChildItem $dir -Filter *.md | Sort-Object Name
$fail = @()   # bledy twarde (swietosc)
$warn = @()   # ostrzezenia
$total = 0

foreach ($f in $files) {
  $total++
  $c = [System.IO.File]::ReadAllText($f.FullName, [System.Text.Encoding]::UTF8)
  $title = ''; $desc = ''; $kw = ''; $tags = ''
  if ($c -match '(?s)title:\s*"([^"]*)"')        { $title = $Matches[1] }
  if ($c -match '(?s)description:\s*"([^"]*)"')  { $desc  = $Matches[1] }
  if ($c -match '(?s)seoKeyword:\s*"([^"]*)"')   { $kw    = $Matches[1] }
  if ($c -match '(?s)tags:\s*\[([^\]]*)\]')      { $tags  = $Matches[1] }

  $err = @()
  $wr  = @()

  # --- BLEDY TWARDE ---
  if ($title.Length -gt 60) { $err += "tytul $($title.Length)>60" }

  if (-not $kw) { $err += "brak seoKeyword" }
  else {
    if (-not $title.ToLower().Contains($kw.ToLower())) { $err += "brak frazy w tytule" }
    if (-not $desc.ToLower().Contains($kw.ToLower()))  { $err += "brak frazy w opisie" }
  }

  if ($c -notmatch '(?m)^###\s+.*\?\s*$') { $err += "brak FAQ" }

  $tagCount = ([regex]::Matches($tags, '"')).Count / 2
  if ($tagCount -lt 2) { $err += "za malo tagow ($tagCount)" }

  # --- OSTRZEZENIA ---
  if ($kw -and $title.ToLower().Contains($kw.ToLower()) -and -not $title.ToLower().StartsWith($kw.ToLower())) {
    $wr += "fraza nie na poczatku tytulu"
  }
  if ($desc.Length -lt 100 -or $desc.Length -gt 165) { $wr += "opis dlugosc $($desc.Length)" }

  $hasTable = ($c -match '(?m)^\|.*\|')
  $hasList  = ($c -match '(?m)^-\s+')
  if (-not $hasTable -and -not $hasList) { $wr += "brak tabeli/listy" }

  if ($kw -match '^jak ' -or $kw -match '^czym ') {
    if ($c -notmatch '(?m)^##\s+Krok') { $wr += "DIY bez krokow" }
  }

  $links = ([regex]::Matches($c, '\]\(/poradniki/')).Count
  if ($links -eq 0) { $wr += "brak linkow wewnetrznych" }

  if ($err.Count -gt 0) { $fail += [PSCustomObject]@{ File = $f.Name; Msg = ($err -join ', ') } }
  if ($wr.Count  -gt 0) { $warn += [PSCustomObject]@{ File = $f.Name; Msg = ($wr  -join ', ') } }
}

Write-Host ""
Write-Host "=== AUDYT SEO (WYTYCZNE-SEO.md) ==="
Write-Host "Artykulow: $total | Bledy: $($fail.Count) | Ostrzezenia: $($warn.Count)"
Write-Host ""

if ($fail.Count -gt 0) {
  Write-Host "--- BLEDY (napraw przed commitem) ---"
  foreach ($x in $fail) { Write-Host ("  [X] {0}: {1}" -f $x.File, $x.Msg) }
}

if ($warn.Count -gt 0) {
  Write-Host "--- OSTRZEZENIA ---"
  foreach ($x in $warn) { Write-Host ("  [!] {0}: {1}" -f $x.File, $x.Msg) }
}

Write-Host ""
if ($fail.Count -eq 0) {
  Write-Host "OK - brak bledow twardych."
  exit 0
} else {
  Write-Host "Sa bledy twarde - napraw wg WYTYCZNE-SEO.md."
  exit 1
}
