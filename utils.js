export function transformKey(data){
    const key = data.split(' ')
        .filter(part => part !== 'v=DKIM1;' && part !== 'k=rsa;')
        .join('')
        .replace(/"/g, '')
        .replace('p=', '')
    return key
}