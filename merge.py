import re

def process():
    with open('page_old_utf8.tsx', 'r', encoding='utf-8') as f:
        old_content = f.read()
    
    with open('src/app/page.tsx', 'r', encoding='utf-8') as f:
        new_page = f.read()

    # Extract dashboard overlay container from new_page
    match = re.search(r'(<div className="absolute inset-0 z-10 pointer-events-none.*?)</div>\s*</main>', new_page, re.DOTALL)
    dashboard_html = match.group(1) if match else "DASHBOARD HTML NOT FOUND"
    
    # We need to build the hero section
    hero_section = f"""
      {{/* Background Layer */}}
      <div className="cosmic-bg"></div>

      <section id="hero" className="relative w-full h-screen overflow-hidden">
        {dashboard_html}
      </section>
"""

    # In old_content, remove `<nav>...</nav>`
    old_content = re.sub(r'<nav.*?</nav>', '', old_content, flags=re.DOTALL)

    # Replace `<section id="home">...</section>` with `hero_section`
    old_content = re.sub(r'<section[^>]*id="home".*?</section>', hero_section, old_content, flags=re.DOTALL)

    # Class replacements
    replacements = {
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
        'bg-white': 'bg-black', # For certifications images wrappers
        'bg-white hover:text-secondary-container': 'bg-cyan-900 hover:text-cyan-200',
    }

    for old, new in replacements.items():
        old_content = old_content.replace(old, new)
        
    # Write to page.tsx
    with open('src/app/page.tsx', 'w', encoding='utf-8') as f:
        f.write(old_content)

if __name__ == "__main__":
    process()
