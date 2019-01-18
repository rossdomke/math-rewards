module.exports = {
    pages: { 
        index: {
            entry: 'src/main.ts',
            template: 'public/index.html',
            filename: 'index.html',
            title: 'Index Page',
        },
        app2: {
            entry: 'src/app2.ts',
            template: 'public/index.html',
            filename: 'app2.html',
            title: 'App2 page'
        }
    }
}
