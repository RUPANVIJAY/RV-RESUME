const fs = require('fs');

function processFile() {
    let oldContent = fs.readFileSync('page_old_utf8.tsx', 'utf8');
    const newPage = fs.readFileSync('src/app/page.tsx', 'utf8');

    const dashboardMatch = newPage.match(/(<div className="absolute inset-0 z-10 pointer-events-none.*?<\/div>\s*)<\/main>/s);
    const dashboardHtml = dashboardMatch ? dashboardMatch[1] : "DASHBOARD HTML NOT FOUND";

    const heroSection = `
      {/* Background Layer */}
      <div className="cosmic-bg"></div>

      {/* Hero Section */}
      <section id="hero" className="relative w-full h-screen overflow-hidden">
        ${dashboardHtml}
      </section>
`;

    // Remove old nav
    oldContent = oldContent.replace(/<nav.*?<\/nav>/s, '');

    // Replace old hero with new hero
    oldContent = oldContent.replace(/<section[^>]*id="home".*?<\/section>/s, heroSection);

    const replacements = {
        'bg-surface-container-low': 'bg-black/40 backdrop-blur-md border-y border-cyan-900/50',
        'bg-surface-container-high/50': 'bg-black/60 backdrop-blur-md',
        'bg-surface-container-high/60': 'bg-black/80 backdrop-blur-md',
        'bg-surface-container-high': 'bg-black/60 backdrop-blur-md',
        'bg-surface-container': 'bg-black/80 backdrop-blur-sm',
        'bg-surface': 'bg-transparent',
        'text-primary-container/60': 'text-cyan-400/60',
        'text-primary-container/80': 'text-gray-300',
        'text-primary-container/90': 'text-gray-200',
        'text-primary-container': 'text-white',
        'text-secondary-container': 'text-cyan-400',
        'bg-secondary-container': 'bg-cyan-500 shadow-[0_0_15px_rgba(0,255,204,0.4)]',
        'border-secondary-container': 'border-cyan-400',
        'border-primary-container/10': 'border-cyan-900/40',
        'border-primary-container/20': 'border-cyan-800/50',
        'border-primary-container/30': 'border-cyan-700/60',
        'border-primary-container': 'border-cyan-700',
        'tech-grid': '',
        'bg-white': 'bg-black',
        'bg-white hover:text-secondary-container': 'bg-cyan-900 hover:text-cyan-200'
    };

    for (const [oldVal, newVal] of Object.entries(replacements)) {
        oldContent = oldContent.split(oldVal).join(newVal);
    }

    fs.writeFileSync('src/app/page.tsx', oldContent, 'utf8');
}

processFile();
