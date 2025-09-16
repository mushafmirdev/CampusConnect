// Script to update all pages with enhanced styling
const fs = require('fs');

const pages = [
    'Events.html',
    'program.html',
    'Amassadors.html',
    'Workshops.html',
    'Contact.html'
];

const enhancedNav = `
    <!-- Navigation -->
    <nav class="fixed top-0 w-full z-50 navbar-enhanced">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <div class="flex items-center">
                    <div class="flex-shrink-0">
                        <a href="index.html" class="logo-container flex items-center">
                            <div class="logo-icon"></div>
                            <h1 class="logo-text">
                                Campus Connect
                            </h1>
                        </a>
                    </div>
                </div>
                <div class="hidden md:block">
                    <div class="ml-10 flex items-baseline space-x-8">
                        <a href="index.html" class="nav-link-enhanced">Home</a>
                        <a href="About.html" class="nav-link-enhanced">About</a>
                        <a href="program.html" class="nav-link-enhanced">Program</a>
                        <a href="Amassadors.html" class="nav-link-enhanced">Ambassadors</a>
                        <a href="Events.html" class="nav-link-enhanced">Events</a>
                        <a href="Workshops.html" class="nav-link-enhanced">Workshops</a>
                        <a href="Contact.html" class="nav-link-enhanced">Contact</a>
                        <a href="#" class="btn-enhanced">Apply Now</a>
                    </div>
                </div>
                <div class="md:hidden">
                    <button id="mobile-menu-btn" class="text-gray-700 hover:text-primary-600 focus:outline-none">
                        <i class="fas fa-bars text-xl"></i>
                    </button>
                </div>
            </div>
        </div>
    </nav>`;

const addFavicon = (content) => {
    return content.replace(
        '<title>',
        '<link rel="icon" type="image/svg+xml" href="favicon.svg">\n    <title>'
    );
};

const updateNav = (content, pageName) => {
    // Add favicon
    content = addFavicon(content);

    // Replace navigation
    const navRegex = /<!-- Navigation -->[\s\S]*?<\/nav>/;
    content = content.replace(navRegex, enhancedNav);

    // Update active nav link based on page
    const activePageMap = {
        'Events.html': 'Events',
        'program.html': 'Program',
        'Amassadors.html': 'Ambassadors',
        'Workshops.html': 'Workshops',
        'Contact.html': 'Contact'
    };

    if (activePageMap[pageName]) {
        const activeClass = `class="nav-link-enhanced active"`;
        const normalClass = `class="nav-link-enhanced"`;
        const targetLink = activePageMap[pageName];

        content = content.replace(
            new RegExp(`href="${targetLink.toLowerCase()}\\.html" class="nav-link-enhanced"`),
            `href="${targetLink.toLowerCase()}.html" ${activeClass}`
        );
    }

    return content;
};

pages.forEach(page => {
    try {
        let content = fs.readFileSync(page, 'utf8');
        content = updateNav(content, page);
        fs.writeFileSync(page, content);
        console.log(`Updated ${page}`);
    } catch (error) {
        console.log(`Error updating ${page}:`, error.message);
    }
});

console.log('All pages updated successfully!');
