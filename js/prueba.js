import './editor/editor-archivos.js';

let editor = document.querySelector('editor-archivos-codejar');

editor.setFiles([
    {
        titulo: 'HTML',
        tipo: 'html',
        codigo: '<!--HTML-->',
        icono:`&#9733;`
    },
    {
        titulo: 'CSS',
        tipo: 'css',
        codigo: '/*css*/',
        icono: '&#9733;'
    },
    {
        titulo: 'Js',
        tipo: 'js',
        codigo: '//js',
        icono: '&#9733;'
    },
    {
        titulo: 'Python',
        tipo: 'python',
        codigo: '',
        icono: '&#9733;'
    }
]);
