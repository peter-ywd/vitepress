import fs from "fs";
import path from "path";
// 获取文件信息的函数
export function getMdFilesInfo(dirPath) {
  const files = fs.readdirSync(dirPath);
  const mdFilesInfo = files
    .filter((file) => file.endsWith(".md")) // 只筛选 .md 文件
    .map((file) => {
      const filePath = path.join(dirPath, file);
      const stats = fs.statSync(filePath);
      const lastModifiedTime = stats.mtime; // 文件最后修改时间
      return {
        fileName: file.replace(".md", ""), // 去除扩展名
        link: `/${file.replace(".md", "")}`, // 生成对应的链接
        lastModified: lastModifiedTime.toISOString(), // 文件修改时间
      };
    });

  return mdFilesInfo;
}

// 生成 index.md 文件内容
export function generateIndexMd(dirPath) {
    const mdFilesInfo = getMdFilesInfo(dirPath);
    
    let content = '# Documentation Index\n\n'; // index.md 文件的头部
  
    mdFilesInfo.forEach(fileInfo => {
      content += `::: timeline: ${fileInfo.lastModified}\n\n`;
      content += `- ${fileInfo.fileName}](${fileInfo.link})\n`;
      content += `::: \n`;

    });
  
    // 将生成的内容写入到 index.md 文件
    fs.writeFileSync(dirPath, content, 'utf8');
    return `${dirPath}/index`;
  }
  
