import { generate } from './utils/generate.js'
import { config } from './config/config.js'

const simple = {
    'elements': {
        'inputs': {
            'length': document.querySelector('#simple-form input[name="length"]')
        }
        , 'outputs': {
            'output': document.querySelector('#simple-form .output')
        }
        , 'buttons': {
            'button': document.querySelector('#simple-form button')
        }
        
        
    }
}
simple['elements']['buttons']['button'].addEventListener('click', (e)=>{
    e.preventDefault();
    let range = simple['elements']['inputs']['length'].value;
    if(isNaN(range) || range < 1) return;
    simple['elements']['outputs']['output'].value = generate(config['range'], range);
    simple['elements']['outputs']['output'].dispatchEvent(new Event('change'));
});

if(!simple['elements']['outputs']['output'].value) {
    simple['elements']['outputs']['output'].value = generate(config['range']);
    simple['elements']['outputs']['output'].dispatchEvent(new Event('change'));
}
    