function get(element){return document.querySelector(element)}

const menuBtn = document.querySelector('#navMenuBtn'),
homeBtn = document.querySelector('nav #homeBtn'),
leftSideMenu = document.querySelector('#leftSide'),
leftSideHideBtn = document.querySelector('#leftSideHideBtn'),
rightSideHideBtn = document.querySelector('main #section-surah #surah-rightside #rightSideHideBtn'),
sectionSurah = document.querySelector('main #section-surah'),
rightSideMenuBtn = document.querySelector('main #section-surah #surah-main header #rightSideMenuBtn')


menuBtn.addEventListener('click',()=>{
    leftSideMenu.classList.toggle('show')
})

leftSideHideBtn.addEventListener('click',()=>{
    leftSideMenu.classList.remove('show')
})

rightSideMenuBtn.addEventListener('click',()=>{
   sectionSurah.classList.toggle('hideRight')
})

rightSideHideBtn.addEventListener('click',()=>{
    sectionSurah.classList.add('hideRight')
})



// handle section button event
const allLeftSideBtn  = document.querySelectorAll('#leftSide #Buttons button')
const allSections = document.querySelectorAll('main section')
allLeftSideBtn.forEach(eachBtn=>{
    eachBtn.addEventListener('click',()=>{

        allSections.forEach(eachSection=>{
            if(!eachSection.classList.contains('dis-hide')){
                eachSection.classList.add('dis-hide')
            }
        })
        if(eachBtn.getAttribute('id')==='updateSurah'){
            document.querySelector('main #section-add-surah .dropDown').classList.remove('dis-hide')
            document.querySelector('main #section-add-surah .sectionTitle').innerText = 'update surah'
        }
        else if(eachBtn.getAttribute('id')==='addSurah'){
            document.querySelector('main #section-add-surah .dropDown').classList.add('dis-hide')
            document.querySelector('main #section-add-surah .sectionTitle').innerText = 'add surah'
        }
        else if(eachBtn.getAttribute('id')==='showNote'){
            insertNote()
        }
        document.querySelector(`main #${eachBtn.getAttribute('data-handleSection')}`).classList.remove('dis-hide')
        setTimeout(()=>{
            leftSideMenu.classList.remove('show')
        },1000)
    })
})

homeBtn.addEventListener('click',()=>{

    document.querySelector('main #loaderContainer .loader').classList.add('active')
    allSections.forEach(eachSection=>{
        if(!eachSection.classList.contains('dis-hide')){
            eachSection.classList.add('dis-hide')
        }
    })
    setTimeout(()=>{
        document.querySelector('main #section-surah').classList.remove('dis-hide')
        document.querySelector('main #loaderContainer .loader').classList.remove('active')        
    },2000)

})



// handle bookmark
function handleBookMark(targetSurah){
    const allEachAyatBookMarkBtn = document.querySelectorAll('main #section-surah #surah-main #ayats .each-ayat i')
    allEachAyatBookMarkBtn.forEach((eachBtn,verse)=>{
        eachBtn.addEventListener('click',()=>{
            sectionSurah.classList.remove('hideRight')      
            setTimeout(()=>{
                document.querySelector('main #section-surah #surah-rightside #noteContainer').classList.remove('dis-hide')
    document.querySelector('main #section-surah #surah-rightside #noteContainer #targetSurahId').value = targetSurah.surah_name               
    document.querySelector('main #section-surah #surah-rightside #noteContainer #targetVerse').value = verse+1      
    handleAddNote(targetSurah.surah_id,verse)
              },1300)      
        })
    })    
}



function addNote(surahId,verse){
    try{
        let targetCategory = document.querySelector('main #section-surah #surah-rightside #noteContainer .dropDown .dd-options .dd-option.active').innerText
        let tempQuran = JSON.parse(localStorage.Quran)
        let newNote = {
            surah_id:surahId,
            verse_no:verse,
            category:targetCategory
        }
        tempQuran.note.push(newNote)
        localStorage.Quran = JSON.stringify(tempQuran)
        createToast('success',`surah ${surahId}:${verse+1} verse added in note`)
        createNotification(`new note added,type:${targetCategory} verse:${surahId}-${verse+1}`)
        document.querySelector('main #section-surah #surah-rightside #noteContainer .dropDown .dd-options .dd-option').classList.remove('active')
    }catch(e){
        createToast('warning','please select category')
    }
}


// handleAddNote
function handleAddNote(surahId,verse){
    const addNoteBtn = document.querySelector('main #section-surah #surah-rightside #noteContainer #addNoteBtn')
    addNoteBtn.addEventListener('click',()=>{
        addNote(surahId,verse)
    })
}





function handleLanugaeHideMode(){

// language hide 
const ArBtn = document.querySelector('main #section-surah #surah-main header #arBtn')
const ArEnBtn = document.querySelector('main #section-surah #surah-main header #arEnBtn')
const EnBtn = document.querySelector('main #section-surah #surah-main header #enBtn')
const BnBtn = document.querySelector('main #section-surah #surah-main header #bnBtn')
const allEachAyatTextList = document.querySelectorAll('main #section-surah #surah-main #ayats .each-ayat .ayat-texts')

ArBtn.addEventListener('click',()=>{
    allEachAyatTextList.forEach(eachAyatTextList=>{
        eachAyatTextList.querySelectorAll('li')[0].classList.toggle('dis-hide')
    })
})
ArEnBtn.addEventListener('click',()=>{
    allEachAyatTextList.forEach(eachAyatTextList=>{
        eachAyatTextList.querySelectorAll('li')[1].classList.toggle('dis-hide')
    })
})
EnBtn.addEventListener('click',()=>{
    allEachAyatTextList.forEach(eachAyatTextList=>{
        eachAyatTextList.querySelectorAll('li')[2].classList.toggle('dis-hide')
    })
})
BnBtn.addEventListener('click',()=>{
    allEachAyatTextList.forEach(eachAyatTextList=>{
        eachAyatTextList.querySelectorAll('li')[3].classList.toggle('dis-hide')
    })
})

}





// insert surah in surah dropDown
function insertSurahIntoDropDown(){
    const allSurahDDoptions = document.querySelectorAll('.surahDD .dd-options')
    let DDoptionsHtml = ''
    try{
        let allSurah = JSON.parse(localStorage.Quran).allSurah
        // console.log(allSurah)
       for(let i=0;i<allSurah.length;i++){
         let newList = `<li data-surahId='${allSurah[i].surah_id}' class='dd-option'><p>${allSurah[i].surah_id} . ${allSurah[i].surah_name}</p></li>`          
         DDoptionsHtml += newList
       }
       allSurahDDoptions.forEach(eachDD=>{
        eachDD.innerHTML = DDoptionsHtml
       })
       handleLeftSideSurahOption()
       handleWordTableSurahOption()
    }catch(e){
        console.log(e)
        createToast('warning','no surah exist')
    }
}
insertSurahIntoDropDown()


function showSurah(surahId){
    const ayatContainer = document.querySelector('main #section-surah #ayats')
    ayatContainer.innerHTML = ''
    try{
        let allSurah = JSON.parse(localStorage.Quran).allSurah
        let firstSurah = allSurah[0];
        let requestSurah;
        allSurah.forEach(eachSurah=>{
            if(eachSurah.surah_id === surahId){
                requestSurah = eachSurah
            }
        })
        let selectedSurah = surahId ? requestSurah : firstSurah
        let allArAyat = selectedSurah.surah_ayat_ar.split('/')
        let allArEnAyat = selectedSurah.surah_ayat_arEn.split('/')
        let allEnAyat = selectedSurah.surah_ayat_en.split('/')
        let allBnAyat = selectedSurah.surah_ayat_bn.split('/')

        allArAyat.forEach((eachLine,i)=>{
            let newAyatHtml = `
            <div class="each-ayat shadow-mid border-min radius-small" data-currentVerse='${i}'>
            <i class="fa-solid fa-bookmark i-rec round mid box-bg space-x-mid"></i>
            <div class="ayat-texts">
                <li class="arabicText t-center font-light">${i+1} . ${allArAyat[i]}</li>
                <li class="arabicEnText">${allArEnAyat[i]}</li>
                <li class="englishText">${allEnAyat[i]}</li>
                <li class="banglaText font-light">${allBnAyat[i]}</li>
             </div>
           </div>
            `
            ayatContainer.innerHTML += newAyatHtml
        })
        handleBookMark(selectedSurah)
        handleLanugaeHideMode()
        handleRightSide(selectedSurah)
        handleNotification()
        handleCategoryList()
    }catch(e){
        console.log(e)
        createToast('error','something went wrong..')
    }
}
showSurah()

function handleRightSide(targetSurah){
    document.querySelector('main #section-surah #surah-rightside #currentSurahName').innerText = ' surah : '+targetSurah.surah_name
    document.querySelector('main #section-surah #surah-rightside #surahTableContainer table').innerHTML = ''
    document.querySelector('main #section-surah #surah-rightside #surahTableContainer table').innerHTML = 
    `
    <thead>
    <tr>
        <th>Parameter</td>
        <th>Details</td>    
    </tr>
</thead>
<tbody>
    <tr>
        <td>surah</td>
        <td>${targetSurah.surah_name}</td>    
    </tr>
    <tr>
        <td>meaning</td>
        <td>${targetSurah.surah_meaning}</td>    
    </tr>
    <tr>
        <td>ayat</td>
        <td>${targetSurah.surah_verse}</td>    
    </tr>
    <tr>
        <td>type</td>
        <td>...</td>    
    </tr>
    <tr>
        <td>word table</td>
        <td><button class="btn mid secondary-bg" id="showWordTableBtn" data-surahId='${targetSurah.surah_id}'>show</button></td>    
    </tr>    
</tbody>
    `   
handleWordTableBtn()
let descriptionArr = targetSurah.surah_description.split('/')
const surahDesEl =  document.querySelector('main #section-surah #surah-rightside #surahDesContainer #desText')
surahDesEl.innerHTML = ''
descriptionArr.forEach(eachDes=>{
    let newDesHtml = `<li class="font-light li ">${eachDes}</li>
    `
    surahDesEl.innerHTML += newDesHtml
})

}

// handle saveNote
function handleWordTableBtn(){
    const showBtn = document.querySelector('main #section-surah #surah-rightside #surahTableContainer table  #showWordTableBtn')
    showBtn.addEventListener('click',()=>{
        // console.log(showBtn.getAttribute('data-surahId'))
        sectionSurah.classList.add('hideRight')
        setTimeout(()=>{
            allSections.forEach(eachSection=>{
                if(!eachSection.classList.contains('dis-hide')){
                    eachSection.classList.add('dis-hide')
                }
            })    
            document.querySelector('main #section-word-table').classList.remove('dis-hide')
        },1000)
        showWordTable(showBtn.getAttribute('data-surahId'))
    })
}


function handleWordTableSurahOption(){
    let allSurahList = document.querySelectorAll('main #section-word-table .surahDD .dd-options .dd-option')
    allSurahList.forEach(eachList=>{
        eachList.addEventListener('click',()=>{
              showWordTable(`${eachList.getAttribute('data-surahId')}`)
              
        })
    })

}



function showWordTable(surahId){
    const wordTableTBody = document.querySelector('main #section-word-table #wordTableContainer table tbody')
    wordTableTBody.innerHTML = ''
    try{
        let allSurah = JSON.parse(localStorage.Quran).allSurah
        let selectedSurah;
        allSurah.forEach(eachSurah=>{
            if(eachSurah.surah_id === surahId){
                selectedSurah = eachSurah
            }
        })   
        let wordTableTitle = document.querySelector('main #section-word-table #word-table-title')
        wordTableTitle.innerText = `word from surah : ${selectedSurah.surah_name}`
        let surahWordFirstSplit = selectedSurah.surah_words.split('**')
        surahWordFirstSplit.forEach(eachWord=>{
           let newWords = eachWord.split('/')
           wordTableTBody.innerHTML += `
           <tr>
           <td>${newWords[0]}</td>
           <td>${newWords[1]}</td>    
           <td>${newWords[2]}</td>
           <td>${newWords[3]}</td>
           </tr>
           ` 
        })
    }catch(e){console.log(e)}

}



function handleNoteCategory(){
      let allCategoryList = document.querySelectorAll('main #section-note .dropDown .dd-options .dd-option')
      allCategoryList.forEach(eachCategory=>{
        eachCategory.addEventListener('click',()=>{
            insertNote(eachCategory.innerText)
        })
      })
}





function insertNote(categoryName){

const noteTableTBody = document.querySelector('main #section-note #noteTable table tbody')

try{

    let note = JSON.parse(localStorage.Quran).note
    let allSurah = JSON.parse(localStorage.Quran).allSurah
    if(categoryName){
        note = note.filter(eachNote=>eachNote.category === categoryName)
        let noteTitleText = note.length ? categoryName+' related Notes' : 'no note found'
        document.querySelector('main #section-note #noteTitle').innerText = noteTitleText
    }
    noteTableTBody.innerHTML = ''
    for(let i=0;i<note.length;i++){
        let newNoteSurahId = note[i].surah_id
        let newNoteVerse = note[i].verse_no
        let selectedSurah;
        allSurah.forEach(eachSurah=>{
            if(eachSurah.surah_id === newNoteSurahId){
                selectedSurah = eachSurah
            }
        })
        let newNoteSurahName = selectedSurah.surah_name
        let newNoteSurahAyat = selectedSurah.surah_ayat_en.split('/')[newNoteVerse]
        let newNoteShorForm = `${newNoteSurahId}:${newNoteVerse+1}`
        noteTableTBody.innerHTML += `        
        <tr>
        <td>${newNoteSurahName}</td>
        <td>${newNoteVerse+1}</td>    
        <td>${newNoteShorForm}</td>
        <td>${newNoteSurahAyat}</td>
    </tr>
        `
    }
handleNoteCategory()
}catch(e){
    console.log(e)
    createToast('error','something went wrong!')
}

}


function insertNotification(){
    const notificationTableBody = document.querySelector('main #section-notification #notificationTable table tbody')
  try{
       let allNotification = JSON.parse(localStorage.Quran).notification.reverse()
        notificationTableBody.innerHTML = '' 
        allNotification.forEach(eachNtf=>{
            let ntfState = eachNtf.ntf_state === 'seen' ? 'disable' : ''
            let styleMode = eachNtf.ntf_state ==='seen' ? 'font-light' : ''
            let timeDiff = getTimeDifference(eachNtf.ntf_time)
             let newNotificationHtml = `
             <tr>
             <td class='${styleMode}'>${timeDiff}</td>
             <td class='${styleMode}'>${eachNtf.ntf_msg}</td>    
             <td><button class="btn min primary-bg ${ntfState}" data-ntf_id='${eachNtf.ntf_id}'>read</button></td>
             </tr>
             `            
             notificationTableBody.innerHTML += newNotificationHtml
        })    
        HandleNotificationVisibily()
  }catch(e){
    console.log(e)
    createToast('warning','check console')
  }
}


function getUnseenNotificationNumber(){
    let unseenNotification = 0;
    try{
        let allNotification = JSON.parse(localStorage.Quran).notification.reverse()
        allNotification.forEach(eachNtf=>{
            if(eachNtf.ntf_state === 'unseen'){
                unseenNotification++
            }
        })
    }catch(e){
        console.log(e)
        createToast('warning','check console')
    }
    return unseenNotification
}


function handleNotification(){
    const notificationBtn = document.querySelector('nav #notification-icon')
    const notificationNumber= document.querySelector('nav #notification-icon #notification-number')
    let ntfNumberFromDb = getUnseenNotificationNumber()
    if(ntfNumberFromDb>0){
        notificationNumber.classList.remove('dis-hide')
        notificationNumber.innerText = ntfNumberFromDb
    }else{
        notificationNumber.classList.add('dis-hide')
    }
    notificationBtn.addEventListener('click',()=>{
        allSections.forEach(eachSection=>{
            if(!eachSection.classList.contains('dis-hide')){
                eachSection.classList.add('dis-hide')
            }
        })       
        document.querySelector('main #section-notification').classList.remove('dis-hide')
        insertNotification()
    })
}

function HandleNotificationVisibily(){
    const allNotificationReadBtn = document.querySelectorAll('main #section-notification #notificationTable table button')
    allNotificationReadBtn.forEach(eachBtn=>{
        eachBtn.addEventListener('click',()=>{
            markNotification(eachBtn.getAttribute('data-ntf_id'))
        })
    })
}

function markNotification(ntfId){
    try{
        let tempQuran = JSON.parse(localStorage.Quran)
        let allNotification = tempQuran.notification
         allNotification.forEach(eachNtf=>{
            if(eachNtf.ntf_id === parseInt(ntfId)){
                eachNtf.ntf_state = 'seen' 
            }
         })
        //  console.log(allNotification);
         tempQuran.notification = allNotification
         localStorage.Quran = JSON.stringify(tempQuran)
         handleNotification()
         insertNotification()
    }catch(e){
        console.log(e)
        createToast('warning','show console')
    }
}




function handleLeftSideSurahOption(){
    let allSurahList = document.querySelectorAll('#leftSide .surahDD .dd-options .dd-option')
    allSurahList.forEach(eachList=>{
        eachList.addEventListener('click',()=>{
              showSurah(eachList.getAttribute('data-surahId'))
              setTimeout(()=>leftSideMenu.classList.remove('show'),500)
              
        })
    })
}



function exportDb(){
    try{
        let currentJsonQuran = localStorage.Quran
        const blob = new Blob([currentJsonQuran],{type:'application/json'})
        const link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        let currentTime = new Date()
        let timeOption = {day:'numeric',month:'long',year:'numeric'}
        let donwloadFileName = 'DB-'+currentTime.toLocaleDateString('en-US',timeOption) 
        link.download = donwloadFileName
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        createNotification(`new db exported,${donwloadFileName}`)
    }catch(e){
        createToast('warning','check console')
        console.log(e)
    }
}

document.querySelector('main #section-import-export #exportBtn').addEventListener('click',()=>exportDb())
document.querySelector('main #section-import-export #importBtn').addEventListener('click',()=>{
    document.querySelector('main #section-import-export #fileInput').click()
})

document.querySelector('main #section-import-export #fileInput').addEventListener('change',(e)=>{
    importJsonFile(e)
})

function importJsonFile(e){
    const fileInput= e.target
    if(fileInput.files.length > 0){
        const uploadedFile = fileInput.files[0]
        const reader = new FileReader()
        reader.onload = function(event){
            const content = event.target.result
            try{
                try{
                    exportDb()
                }catch(e){createToast('info','db is empty')}
                localStorage.Quran = content
                createNotification(`new db imported,file : ${uploadedFile.name}`)
            }catch(e){
                createToast('warning','check console')
                console.log(e)
            }
        }
        reader.readAsText(uploadedFile)
    }
}


function handleCategoryList(){
    const rightSideCategoryList = document.querySelector('main #section-surah #surah-rightside .dropDown #categoryList')
    const sectionCategoryList = document.querySelector('main #section-add-category #allCategoryList')
    const showNoteCategoryList = document.querySelector('main #section-note #categoryList')
    sectionCategoryList.innerHTML = ''
    rightSideCategoryList.innerHTML = ''
    showNoteCategoryList.innerHTML = ''
    try{
        let allCategory = JSON.parse(localStorage.Quran).Category
        allCategory.forEach(eachCategory=>{
            rightSideCategoryList.innerHTML += `<li class="dd-option"><p>${eachCategory}</p></li>`
            sectionCategoryList.innerHTML += `<li class="box-bg pad-min shadow-min border-min radius-small">${eachCategory}</li>`
            showNoteCategoryList.innerHTML += `<li class="dd-option"><p>${eachCategory}</p></li>`
        })

    }catch(e){
        createToast('warning',`check console`)
        console.log(e)
    }
}