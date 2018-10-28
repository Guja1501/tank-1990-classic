let libs = [
    'helpers.js',
    'Player.js',
    'Bullet.js',
    'Wall.js',
    'main.js',
];

function require(src) {
    let s = document.createElement('script');
    s.src = src + '?v' + Date.now();
    document.body.appendChild(s);
}

libs.forEach(lib => require(`/src/js/${lib}`));