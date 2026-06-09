
const fs = require('fs');
const path = require('path');

const files = [
  'maritime_ais_prd',
  'maritime_ais_architecture'
];

const basePath = path.join(__dirname, '../.trae/documents');

files.forEach(file => {
  const mdPath = path.join(basePath, `${file}.md`);
  const htmlPath = path.join(basePath, `${file}.html`);
  
  if (!fs.existsSync(mdPath)) {
    console.error(`File not found: ${mdPath}`);
    return;
  }
  
  const content = fs.readFileSync(mdPath, 'utf8');
  
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>${file}</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.2.0/github-markdown-light.min.css">
    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"></script>
    <style>
        .markdown-body {
            box-sizing: border-box;
            min-width: 200px;
            max-width: 980px;
            margin: 0 auto;
            padding: 45px;
        }
        @media (max-width: 767px) {
            .markdown-body {
                padding: 15px;
            }
        }
        .mermaid {
            display: flex;
            justify-content: center;
            margin: 20px 0;
        }
        @media print {
            .markdown-body {
                max-width: none;
                padding: 0;
            }
            .no-print {
                display: none;
            }
        }
    </style>
</head>
<body>
    <div class="no-print" style="text-align: right; padding: 10px;">
        <button onclick="window.print()" style="padding: 8px 16px; cursor: pointer; background: #0366d6; color: white; border: none; border-radius: 4px;">Save as PDF / Print</button>
    </div>
    <div id="content" class="markdown-body"></div>
    <script>
        const markdown = ${JSON.stringify(content)};
        
        // Custom renderer for mermaid code blocks
        const renderer = new marked.Renderer();
        const originalCode = renderer.code;
        
        renderer.code = function(code, language) {
            if (language === 'mermaid') {
                return '<div class="mermaid">' + code + '</div>';
            }
            return originalCode.call(this, code, language);
        };
        
        marked.setOptions({ renderer: renderer });
        
        document.getElementById('content').innerHTML = marked.parse(markdown);
        
        mermaid.initialize({ startOnLoad: true });
    </script>
</body>
</html>
  `;
  
  fs.writeFileSync(htmlPath, html);
  console.log(`Generated HTML: ${htmlPath}`);
});
