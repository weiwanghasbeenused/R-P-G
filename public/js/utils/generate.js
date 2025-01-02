export function generate(range, length=16){
    let output = '';
    for(let i = 0; i < length; i++)
    {
        let idx_temp = Math.floor(Math.random() * range.length);
        let range_temp = range.substr(idx_temp) + range.substr(0, idx_temp);
        output += range.charAt(Math.floor(Math.random() * range_temp.length));

    }
    return output;
}
