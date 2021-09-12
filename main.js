const $title = document.querySelector('input');

//1. 세미나 제목 inputEvent ]
//글자수 체크, 영문기준 200자까지. 영문 1바이트 한글 2바이트로 인식
$title.addEventListener('keyup', () => {
    const maxLength = 200;
    let $value = $title.value;
    const span = document.querySelector('#check');
    checkText($value,maxLength);
    span.innerHTML = `( ${checkText().len} / 200 )`;
});

function checkText($value,maxLength) {
    let len = 0;
    for (let i = 0; i<$value.length; i++) {
        if (escape($value.charAt(i)).length == 6) {
            len++;
        }
        len++;
    }
    if(len > maxLength) {
        let str1 = $value.substr(0,maxLength);
        $title.value = str1;
    }
    return len;
}

// function getTextLength() {
//     const $title = document.querySelector('input').value;
//     const span = document.querySelector('#check');
//     span.innerHTML = `( ${$title.length} / 200 )`;
// }

// function keyDown() {
//     let value = $title.GetKeyDown();

//     console.log(value);
// }



// keyDown();