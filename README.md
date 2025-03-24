# vitepress
vitepress blog
# 设置文件路径
$file = "E:\docs\vitepress\vitepress\docs-1\1. 开篇词.md"

# 设置最后修改时间
$lastModified = Get-Date "2025-01-01 12:00:00"
Set-ItemProperty -Path $file -Name LastWriteTime -Value $lastModified

# 设置创建时间
$createdTime = Get-Date "2025-01-01 12:00:00"
Set-ItemProperty -Path $file -Name CreationTime -Value $createdTime

# 设置访问时间
$accessedTime = Get-Date "2025-01-01 12:00:00"
Set-ItemProperty -Path $file -Name LastAccessTime -Value $accessedTime
