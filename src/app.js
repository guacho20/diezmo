import app from './classes/server';

app.set('port', process.env.PORT || 3000);

// Escuchar peticiones
app.listen(app.get('port'), () => {
    console.log('Server listen on port: ', app.get('port'), '\x1b[32m%s\x1b[0m ', 'online');
});