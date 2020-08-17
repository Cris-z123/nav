const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const collection = localStorage.getItem('collection')
const collectionObject = JSON.parse(collection)
const hashMap = collectionObject || [
    {logo: "G", url:"https://github.com"},
    {logo: "M", url:"https://developer.mozilla.org"},
    {logo: "S", url:"https://stackoverflow.com/"},
    {logo: "J", url:"https://juejin.im/"}
]

const simplifyUrl = (url) => {
    return url.replace('https://', '').replace('http://', '').replace('www.', '').replace(/\/.*/, '')
}

const render = () => {
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node, index) => {
        const $li = $(`
        <li>
            <div class="item">
                <div class="item-title">${node.logo[0]}</div>
                <div class="item-desc">${simplifyUrl(node.url)}</div>
                <div class="close">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-yichu1"></use>
                    </svg>
                </div>
            </div>
        </li>`).insertBefore($lastLi)

        $li.on('click', () => {
            window.open(node.url)
        })
        $li.on('click', '.close', (e) => {
            e.stopPropagation()
            hashMap.splice(index, 1)
            render()
        })
    })
}

render()

$('.last').on('click', () =>{
    let url = window.prompt('请添加网站')
    if(url.indexOf('http') !== 0){
        url = 'https://' + url
    }

    hashMap.push({
        logo: simplifyUrl(url)[0].toUpperCase(),
        url: url
    })

    render()
})

window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
    localStorage.setItem('collection', string)
}

$(document).on('keypress', (e) => {
    const {key} = e
    for(let i=0; i<hashMap.length; i++) {
        if(hashMap[i].logo.toLowerCase() === key) {
            window.open(hashMap[i].url)
        }
    }
})