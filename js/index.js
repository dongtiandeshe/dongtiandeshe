// console.log(lrc); 
/**
 *  解析歌词字符串
 * 得到一个歌词对象的数组
 * 每个歌词对象：
 * [title：开始时间，word：歌词内容]
 */

function parseLrc(){
    var lines=lrc.split('\n');
    var result = [];
    for (let i = 0; i < lines.length; i++) {
        var  str = lines[i];
        var parts = str.split(']')
        // console.log(parts);
        var timeStr = parts[0].substring(1);
        var obj = {
            time:parseTime(timeStr),
            word:parts[1]
        };
        // console.log(obj);
        result.push(obj);
    }
    return result;
}

/**
 * 将时间字符串解析为数字
 * @param {String} timeStr 
 */
function parseTime(timeStr) {
    // 用冒号分隔为分钟和秒
    var parts = timeStr.split(":");
    // console.log(parts);
    
    // console.log(parts[0]*60 + + parts[1]);
    return parts[0]*60 + + parts[1]

}
var lrcData = parseLrc();
// console.log(lrcData);
var doms = {
    audio:document.querySelector('audio'),
    ul:document.querySelector('.container ul'),
    container:document.querySelector('.container')
}
/**
 * 计算出，音乐播放到第几秒的时候，应该高亮的歌词下标
 */

function findIndex() {
    // console.log(doms.audio.currentTime);
    var curTime = doms.audio.currentTime;
    // console.log(lrcData);
    for (let i = 0; i < lrcData.length; i++) {
        if (curTime<lrcData[i].time) {
            return i-1;
        }
        
    }
    return lrcData.length - 1;
}

/**
 * 渲染界面
 */
function createLrcElement() {
    for (let i = 0; i < lrcData.length; i++) {
        var li = document.createElement('li')
        li.textContent = lrcData[i].word;
        doms.ul.appendChild(li);
        
    }
}

createLrcElement()


var containerHeigh = doms.container.clientHeight;
var liHeight = 30;
var max = doms.ul.clientHeight - containerHeigh
// 计算ul元素的偏移量
function setOffset() {
    var index = findIndex()
    // 歌词的高度
    var h =liHeight*index + liHeight/2
    // 歌词的偏移量
    var offset = h-containerHeigh/2;

    if (offset<0) {
        offset = 0;
    }
    if(offset>max){
        offset = max
    }
// 去掉之前的active样式
    var li = doms.ul.querySelector('.active');
    if (li) {
        li.classList.remove('active')
    }
    doms.ul.children[index].className = 'active'
    doms.ul.style.transform = `translateY(-${offset}px)`
}

doms.audio.addEventListener('timeupdate', setOffset)

setOffset();