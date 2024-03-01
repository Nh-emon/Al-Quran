const allInputs = document.querySelectorAll('main #section-add-surah .text-input')
const submitBtn = document.querySelector('main #section-add-surah #submitBtn')


// allInput
const surahIdInput = document.querySelector('main #section-add-surah #surahIdInput'),
surahNameInput = document.querySelector('main #section-add-surah #surahNameInput'),
surahMeaningInput = document.querySelector('main #section-add-surah #surahMeaningInput'),
surahVerseInput = document.querySelector('main #section-add-surah #surahVerseInput'),
arInput = document.querySelector('main #section-add-surah #arInput'),
arEnInput = document.querySelector('main #section-add-surah #arEnInput'),
enInput = document.querySelector('main #section-add-surah #enInput'),
bnInput = document.querySelector('main #section-add-surah #bnInput'),
surahWordInput = document.querySelector('main #section-add-surah #surahWordInput'),
surahDescriptionInput = document.querySelector('main #section-add-surah #surahDescription')

const allAyatTextInput = [arInput,arEnInput,enInput,bnInput]

function handleAyatTextLength(){
    let processResult = true
    allAyatTextInput.forEach(eachInput=>{
        if(eachInput.value.split('/').length !== allAyatTextInput[0].value.split('/').length){
            let arAyat = allAyatTextInput[0].value.split('/').length
            let arEnAyat = allAyatTextInput[1].value.split('/').length
            let enAyat = allAyatTextInput[2].value.split('/').length
            let bnAyat = allAyatTextInput[3].value.split('/').length
        createToast('error',`ayat length not match->ar(${arAyat}) arEn(${arEnAyat}) en(${enAyat}) bn(${bnAyat})`)
        processResult = false
        }
    })    
    return processResult;
}


function handleAllWordLength(){
    let processResult = true
    let errorWordIdArray = []
    let surahWordInputValue = surahWordInput.value
    let surahWordInputFirstSplit = surahWordInputValue.split('**')
    surahWordInputFirstSplit.forEach((eachWordArray,id)=>{
        if(eachWordArray.split('/').length !== 4){
            errorWordIdArray.push(id)
        }
    })
    if(errorWordIdArray.length>0){
        processResult = false
        errorWordIdArray = errorWordIdArray.map(eachId=>eachId+1)
        createToast('warning',`position:(${errorWordIdArray}) has no 4 word`)
    }
    return processResult;
}




submitBtn.addEventListener('click',()=>{
    let allInputHasValue = handleInputValueExistence()
    if(allInputHasValue){
        let allAyatTextLengthIsOk = handleAyatTextLength() 
        if(allAyatTextLengthIsOk){
            let allWordLengthIsOk = handleAllWordLength()
            if(allWordLengthIsOk){
                addSurah()
            }
        }
    }
})


function addSurah(){
    let allParameterName = ['surah_id','surah_name','surah_meaning','surah_verse','surah_description','surah_words','surah_ayat_ar','surah_ayat_arEn','surah_ayat_en','surah_ayat_bn']
    let allParameterRealterInput = [surahIdInput,surahNameInput,surahMeaningInput,surahVerseInput,surahDescriptionInput,surahWordInput,arInput,arEnInput,enInput,bnInput]
    let newSurah = {}
    for(let i = 0;i<allParameterName.length;i++){
        newSurah[`${allParameterName[i]}`] = allParameterRealterInput[i].value
    }
    addSurahToDB(newSurah)
}


function addSurahToDB(surah){

    let tempJsonData = '{"allSurah":[],"note":[],"notification":[],category:[]}'

    let tempQuran;

try{
    tempQuran = JSON.parse(localStorage.Quran)
}catch(e){
    tempQuran = JSON.parse(tempJsonData);
}

tempQuran.allSurah.push(surah)
localStorage.Quran = JSON.stringify(tempQuran)
let newSurahName = surah.surah_name
createToast('success',`surah (${newSurahName}) added successfully`)
createNotification(`new surah ${newSurahName} added`)
}


// handle notification

function createNotification(msg){
      let notificationTime = new Date()
      let notificationMsg = msg
      let notificationId = Math.floor(Math.random()*100000)
      let notificationState = 'unseen'
      let newNotification = {
        ntf_time:notificationTime,
        ntf_msg:notificationMsg,
        ntf_id:notificationId,
        ntf_state:notificationState
      }
      try{
        tempQuran = JSON.parse(localStorage.Quran)
        tempQuran.notification.push(newNotification)
        localStorage.Quran = JSON.stringify(tempQuran)
       handleNotification()
    }catch(e){
        console.log(e)
        createToast('warning','check console')
      }
}


function handleInputValueExistence(){
    let allInputValueExist=true;
    allInputs.forEach(eachInput=>{
        if(!eachInput.value){
            highLightEl(eachInput,'no value inserted','ph',2000)
            createToast('error','make sure all field are fulfil')
            allInputValueExist = false
        }
    })
    return allInputValueExist;
}




function highLightEl(element,msg,form,duration){
	element.classList.add('hightLight')
	if(form === 'ph'){
	let firstText = element.placeholder
	element.placeholder = msg
	setTimeout(()=>{
		element.classList.remove('hightLight')
		element.placeholder = firstText
	},duration)

}else{
	let firstText = element.value
	element.value = msg
	setTimeout(()=>{
		element.classList.remove('hightLight')
		element.value = firstText
	},duration)	
}
}
const addCategoryBtn = document.querySelector('main #section-add-category #categoryAddBtn')
const categoryInput = document.querySelector('main #section-add-category #categoryInput')
addCategoryBtn.addEventListener('click',()=>{
    if(categoryInput.value.trim(" ")){
        addCategory(categoryInput.value)
        categoryInput.value = ''
    }else{createToast('warning','input field is empty')}
})
function addCategory(categoryName){
    try{
        let quranTemp = JSON.parse(localStorage.Quran)
        let tempCategory = quranTemp.Category 
        if(!tempCategory){tempCategory = []}
        let CategoryALreadyExist = false
        tempCategory.forEach(eachCategory=>{
            if(eachCategory === categoryName){
                CategoryALreadyExist = true
            }
        })
        if(CategoryALreadyExist){
            createToast('warning',`category : ${categoryName} already exist`)
        }else{
            tempCategory.push(categoryName)
            quranTemp.Category = tempCategory
            localStorage.Quran = JSON.stringify(quranTemp)
            createToast('success',`new category : ${categoryName} added`)
            createNotification(`new category : ${categoryName} added`)
        }
    }catch(e){
        createToast('error','check console')
        console.log(e)
    }
}