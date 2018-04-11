function dontClick() {
    console.log('thing');
    document.body.style.backgroundColor = 'magenta';
    document.documentElement.style.setProperty('--c-teal1', 'yellow');
    document.querySelectorAll('div').forEach(div => div.style.color = 'limegreen');
    document.querySelectorAll('*').forEach(item => div.style.fontFamily = 'Comic Sans MS');
}

function dontClick2() {
    window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
}