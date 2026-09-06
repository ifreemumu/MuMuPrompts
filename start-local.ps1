param(
  [int]$Port = 8080
)

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location -LiteralPath $root

$launcher = Get-Command py.exe -ErrorAction SilentlyContinue
if ($launcher) {
  Write-Host "MuMu Prompts: http://localhost:$Port"
  Write-Host "서버를 종료하려면 Ctrl+C를 누르세요."
  & $launcher.Source -3 -m http.server $Port --bind 127.0.0.1
  if ($LASTEXITCODE -eq 0) { exit 0 }
  Write-Warning 'py.exe로 Python을 실행하지 못했습니다. 다음 실행기를 확인합니다.'
}

$launcher = Get-Command python.exe -ErrorAction SilentlyContinue
if ($launcher) {
  Write-Host "MuMu Prompts: http://localhost:$Port"
  Write-Host "서버를 종료하려면 Ctrl+C를 누르세요."
  & $launcher.Source -m http.server $Port --bind 127.0.0.1
  if ($LASTEXITCODE -eq 0) { exit 0 }
  Write-Warning 'python.exe로 서버를 실행하지 못했습니다. 다음 실행기를 확인합니다.'
}

$launcher = Get-Command node.exe -ErrorAction SilentlyContinue
if ($launcher) {
  Write-Host "MuMu Prompts: http://localhost:$Port"
  Write-Host "서버를 종료하려면 Ctrl+C를 누르세요."
  & $launcher.Source (Join-Path $root 'start-local.js') $Port
  exit $LASTEXITCODE
}

Write-Error 'Python 3 또는 Node.js를 찾을 수 없습니다. 둘 중 하나를 설치한 뒤 다시 실행해주세요.'
exit 1
