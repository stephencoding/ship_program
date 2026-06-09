import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const docsDir = path.join(process.cwd(), '.trae/documents');
const prdPath = path.join(docsDir, 'maritime_ais_prd.md');
const archPath = path.join(docsDir, 'maritime_ais_architecture.md');
const outputPath = path.join(docsDir, 'project_documentation.html');

// Read files, handle missing files gracefully
let prdContent = '';
let archContent = '';

try {
    prdContent = fs.readFileSync(prdPath, 'utf-8');
} catch (e) {
    console.warn('PRD file not found, skipping');
}

try {
    archContent = fs.readFileSync(archPath, 'utf-8');
} catch (e) {
    console.warn('Architecture file not found, skipping');
}

const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Maritime AIS Project Documentation</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.2.0/github-markdown-light.min.css">
    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"></script>
    <style>
        body {
            box-sizing: border-box;
            min-width: 200px;
            max-width: 980px;
            margin: 0 auto;
            padding: 45px;
            background-color: white;
        }
        @media (max-width: 767px) {
            body {
                padding: 15px;
            }
        }
        .markdown-body {
            box-sizing: border-box;
            min-width: 200px;
            max-width: 980px;
            margin: 0 auto;
        }
        @media print {
            .no-print {
                display: none !important;
            }
            body {
                padding: 0;
                max-width: 100%;
            }
        }
        .mermaid {
            display: flex;
            justify-content: center;
            margin: 20px 0;
            background-color: #f6f8fa;
            padding: 20px;
            border-radius: 6px;
        }
        /* Page break for printing */
        h1 {
            page-break-before: always;
        }
        h1:first-of-type {
            page-break-before: avoid;
        }
    </style>
</head>
<body>
    <div class="no-print" style="position: fixed; top: 20px; right: 20px; z-index: 1000;">
        <button onclick="window.print()" style="padding: 12px 24px; background: #0366d6; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 5px rgba(0,0,0,0.2);">Save as PDF / Print</button>
    </div>
    
    <div id="content" class="markdown-body"></div>

    <script>
        const prd = ${JSON.stringify(prdContent)};
        const arch = ${JSON.stringify(archContent)};
        
        // Combine documents with a separator that looks nice
        const fullContent = "# 产品需求文档 (PRD)\\n\\n" + prd + "\\n\\n# 技术架构文档\\n\\n" + arch;

        // Configure marked to use mermaid div for mermaid code blocks
        const renderer = {
          code(token) {
            if (token.lang === 'mermaid') {
              return '<div class="mermaid">' + token.text + '</div>';
            }
            return false; // Use default renderer
          }
        };

        marked.use({ renderer });

        // Parse Markdown
        document.getElementById('content').innerHTML = marked.parse(fullContent);

        // Initialize Mermaid
        mermaid.initialize({ 
            startOnLoad: true,
            theme: 'default',
            securityLevel: 'loose',
            fontFamily: 'sans-serif'
        });
    </script>
</body>
</html>
`;

fs.writeFileSync(outputPath, htmlContent);
console.log('HTML Documentation generated at:', outputPath);
