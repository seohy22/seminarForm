const $title = document.querySelector('#title');
const a = document.querySelector('select');
const tableArea = document.querySelector('.table-responsive');

//초기상태는 테이블이 보이지 않음. 
tableArea.style.display = "none";


//1. 세미나 제목 inputEvent ]
//글자수 체크, 영문기준 200자까지. 영문 1바이트 한글 2바이트로 인식
$title.oninput = checkText;
//input value 검사합니다.
function checkText(e) {
    const span = document.querySelector('#check');
    let targetLength = e.target.value.length;
    let len = 0;
    const maxLength = 200;
    for (let i = 0; i<targetLength; i++) {
        if(len < maxLength) {
            if (escape(e.target.value.charAt(i)).length > 4 ) {
                len += 2;
            } else {
                len ++;
            }
        }else {
            e.target.value = e.target.value.substr(0,targetLength-1);
        }
    }
    span.innerHTML = `( ${len} / 200 )`;
}
//파일첨부, 1개만 첨부가능
// 첨부 시 첨부한 파일의 목록이 FileList 객체 형태로 files 속성에 저장
// 본 프로젝트에서는 length가 1이상이면 첨부된 것으로 함.
const fileInput = document.querySelector('.attach-file input');
fileInput.addEventListener('change', checkFile);

function checkFile() {
    const selectedFile = fileInput.files;
    return selectedFile.length;
}

//체크박스 체크 여부 및 ', ' 로 join
function confirmChecked() { 
    const checkboxs = document.getElementsByName('checkPosition');
    let checked = [];
    for(let i=0; i<checkboxs.length;i++) {
        if(checkboxs[i].checked) {
            checked.push(checkboxs[i].value);
        }
    }
    return checked.join(', ')
}

//필수 입력 값 체크
function checkRequired() {
    let chk_radio = document.getElementsByName('ra');
    if($title.value == "") {
        return alert("세미나 제목을 입력해주세요");
    }
    if(!(chk_radio[0].checked) && !(chk_radio[1].checked)) {
        return alert('참가비를 선택해주세요');
    }
    if(a.value === '') {
        return alert('지역을 선택해주세요');
    }
    if(confirmChecked() === ''){
        return alert('직책을 체크해주세요');
    }
    return true;
}

// 입력한 내용 등록. 입력된 값을 가져와 저장 후 table에 추가하기
function insertForm() {
    let seminarTitle = $title.value;
    let fee = document.querySelector('input[name="ra"]:checked').value;
    let location = a.value;
    let position = confirmChecked();
    let file = checkFile();
    addTableRow(seminarTitle,position,location,fee,file);
}

//입력된 값을 기반으로 테이블에 행 추가
// 초기 display='none'일 경우 block하여 보여줌.
// file의 length가 1 이상일 경우 첨부된 것으로 보고 아이콘 첨부
function addTableRow(title,position,location,fee,file) {
    const tb = document.querySelector('table tbody');
    const tr = tb.insertRow();
    const td1 = tr.insertCell(0);
    td1.textContent = title;
    td1.className="title";
    const td2 = tr.insertCell(1);
    td2.textContent = position;
    const td3 = tr.insertCell(2);
    td3.textContent = location;
    const td4 = tr.insertCell(3);
    td4.textContent = fee;
    const td5 = tr.insertCell(4);
    if(file>0) {
        td5.innerHTML =`<a class="ico-down" href="#"></a>`;
    }
    const td6 = tr.insertCell(5);
    td6.innerHTML = `<a class="ico-trash" href="#" onclick="delTableRow(this)"></a>`;

    if(tableArea.style.display == "none"){
        tableArea.style.display = 'block';
    }
}

// 행 삭제. x버튼 onclick(tihs)를 통해 클릭한 열 삭제처리
function delTableRow(obj) {
    const tr = obj.parentElement.parentElement;
    tr.remove();
}

// 입력 후 폼 초기화. fileList 객체는 초기화 방법 연구필요
function reset() {
    const radio = document.querySelector('input[name="ra"]:checked');
    const checkboxs = document.getElementsByName('checkPosition');
    const selection = document.querySelector('select');
    $title.value = '';
    radio.checked = false;
    selection.value = "";
    for(let i=0; i<checkboxs.length; i++){
        if(checkboxs[i].checked){
            checkboxs[i].checked = false;
        }
    }
    span.innerHTML = `( 0 / 200 )`;
}

const Btn = document.querySelector('.btn-group a');
Btn.addEventListener('click', () => {
    if(!checkRequired()) {
        return
    }

    if(confirm("등록하시겠습니까?",)){
        insertForm()
        reset()
    }
})

// $title.oninput = function() {
//     let text = $title.value;
//     let maxLength = 200;
//     let len = checkText(text,maxLength);
//     span.innerHTML = `( ${len} / 200 )`;
// }

// //input value 검사 
// function checkText($text, maxLength) {
//     let len = 0;
//     for (let i = 0; i<$text.length; i++) {
        // if(len > maxLength) {
        //     $title.value = $title.value.substr(0, maxLength);
        //     break;
        // }
//         if (escape($text.charAt(i)).length > 4 ) {
//             len += 2;
//         } else {
//             len ++;
//         }
//     }
//     return len;
// }
