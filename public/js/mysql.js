import { generate } from './utils/generate.js'
import { config } from './config/config.js'
let input_timer = null;
const input_delay = 300;
const users = [
    {
        'prefix': 'full',
        'host': 'localhost',
        'permissions': 'ALL PRIVILEGES'
    }
    , {
        'prefix': 'rw',
        'host': 'localhost',
        'permissions': 'SELECT,INSERT,UPDATE'
    }
    , {
        'prefix': 'r',
        'host': 'localhost',
        'permissions': 'SELECT'
    }
    , {
        'prefix': 'remote',
        'host': '%',
        'permissions': 'SELECT, LOCK TABLES'
    }
]
const mysql = {
    'elements': {
        'inputs': {
            'database': document.querySelector('#mysql-form input[name="database"]'),
            'username': document.querySelector('#mysql-form input[name="username"]'),
            'length':   document.querySelector('#mysql-form input[name="length"]'),
        },
        'outputs': {
            'query':           document.querySelector('#mysql-query-output')
            , 'apache-config': document.querySelector('#apache-config-output')
            , 'nginx-config':  document.querySelector('#nginx-config-output')
            , 'note':          document.querySelector('#note-output')
        }
    }
}
// mysql['elements']['button'].addEventListener('click', (e)=>{
//     e.preventDefault();
//     let range = mysql['elements']['inputs']['length'].value;
//     if(isNaN(range) || range < 1) return;
//     mysql['elements']['output'].value = generate(config['range'], range);
// });
// console.log(mysql['elements']['inputs']);
for(const input of Object.values(mysql['elements']['inputs'])) {
    input.oninput = handleInput;
}
function handleInput(e){
    if(input_timer) {
        clearTimeout(input_timer);
        input_timer = setTimeout(()=>{handleInput(e)}, input_delay);
        return;
    }
    input_timer = null;
    generateAll();
    // mysql['elements']['inputs']['database'].oninput = generateAll;
}
function generateAll(){
    const range = mysql['elements']['inputs']['length'].value;
    if(isNaN(range) || range < 1) return;
    const database = mysql['elements']['inputs']['database'].value;
    const username = mysql['elements']['inputs']['username'].value;
    const passwords = [];
    for(let i = 0; i < users.length; i++) {
        let password = generate(config['range'], range);
        while(passwords.includes(password))
            password = generate(config['range'], range);
        passwords.push(password);
    }
    const query = generateQuery(passwords, database, username);
    mysql['elements']['outputs']['query'].innerHTML = query;
    const apache_config = generateApacheConfig(passwords, database, username);
    mysql['elements']['outputs']['apache-config'].innerHTML = apache_config;
    const nginx_config = generateNginxConfig(passwords, database, username);
    mysql['elements']['outputs']['nginx-config'].innerHTML = nginx_config;
    const note = generateNote(passwords, database, username);
    mysql['elements']['outputs']['note'].innerHTML = note;
}
function generateQuery(passwords, database, username=''){
    if(!database) return '';
    if(!username) username = database;
    let output = '';
    for(let i = 0; i < users.length; i++) {
        const u = `${username}_${users[i]['prefix']}'@'${users[i]['host']}`;
        output += `CREATE USER '${u}' IDENTIFIED BY '${passwords[i]}';\nGRANT ${users[i]['permissions']} ON ${database}.* TO '${u}';\n`;
    }
    return output + 'FLUSH PRIVILEGES;';
}
function generateApacheConfig(passwords, database, username=''){
    if(!database) return '';
    if(!username) username = database;
    let output = '';
    for(let i = 0; i < users.length; i++) {
        if(users[i]['prefix'] === 'remote') continue;
        const u = `${username}_${users[i]['prefix']}`;
        output += `SetEnv MYSQL_${ users[i]['prefix'].toUpperCase() }_DATABASE_URL mysql2://${u}:${passwords[i]}@localhost/${database}\n`;
    }
    return output;
}
function generateNginxConfig(passwords, database, username=''){
    if(!database) return '';
    if(!username) username = database;
    let output = '';
    for(let i = 0; i < users.length; i++) {
        if(users[i]['prefix'] === 'remote') continue;
        const u = `${username}_${users[i]['prefix']}`;
        output += `fastcgi_param MYSQL_${ users[i]['prefix'].toUpperCase() }_DATABASE_URL mysql2://${u}:${passwords[i]}@localhost/${database};\n`;
    }
    return output;
}
function generateNote(passwords, database, username=''){
    if(!database) return '';
    if(!username) username = database;
    let output = '';
    for(let i = 0; i < users.length; i++) {
        if(users[i]['prefix'] === 'remote') continue;
        const u = `${username}_${users[i]['prefix']}`;
        output += `${u}\n`+passwords[i]+`\n`;
    }
    return output;
}