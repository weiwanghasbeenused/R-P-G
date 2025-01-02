function updateOutputState(event){
    if(!event || !event.target) return;
    const textarea = event.target;
    const isEmpty = textarea.getAttribute('data-empty') ? textarea.getAttribute('data-empty') == "1" : true;
    console.log(textarea.value, textarea.getAttribute('data-empty'));
    if(!textarea.value && !isEmpty) textarea.setAttribute('data-empty', 1);
    else if(textarea.value && isEmpty) textarea.setAttribute('data-empty', 0);
}