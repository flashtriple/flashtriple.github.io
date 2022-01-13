// 1 - nav constructor
// 2 - uploading img preview
// 3 - subscribe modal


/* 1 - nav constructor - start */

// inserting nav bts for logged user

// mocked options
const NAV_OPTIONS = [
    {
        name: 'home',
        icon: 'fas fa-home',
        title: 'Tributo a Soda',
        render: () => {
        }
    },
    {
        name: 'vote',
        icon: 'fas fa-music',
        title: '#VotacionSortereo',
        render: () => {}
    },
    /* {
        name: 'news',
        icon: 'fas fa-bullhorn',
        render: () => {}
    },
    {
        name: 'social',
        icon: 'fas fa-user-friends',
        render: () => {}
    },
    {
        name: 'contact',
        icon: 'fas fa-envelope',
        render: () => {}
    }, */
]
NAV_OPTIONS.forEach( item => {
    nav.insertAdjacentHTML('beforeend', 
    `
        <button id='${item.name}Bt' data-section="${item.name}" data-title="${item.title}" class='nav__item'>
            <i class='${item.icon}'></i>
        </button>
    `
    )
})
// setting .active to first item
vote.classList.toggle('active', true)
voteBt.classList.toggle('active', true)

// .active toggler for selected item
const NAV_ITEMS = nav.querySelectorAll('.nav__item')
let changingSection = false
let BUTTON_TAGS = ['BUTTON', 'I']
nav.onclick = (e) => {
    if(BUTTON_TAGS.includes(e.target.tagName)){
        let item = e.target
        console.log(item)
        if(item.tagName === 'I'){
            item = item.parentElement
        }
        if(!item.classList.contains('active') && !changingSection){
            document.querySelectorAll('.active').forEach( item => {
                item.classList.toggle('active', false)
                pageTitle.classList.toggle('active', false)
            })
            changingSection = true
            setTimeout(() => {
                pageTitle.innerHTML = item.dataset.title
                pageTitle.classList.toggle('active', true)
                document.querySelector(`#${item.dataset.section}`).classList.toggle('active', true)
                item.classList.toggle('active', true)
                changingSection = false
            }, 200)
        }
    }
}
/* 1 - nav constructor - end */

/* 2 - form - start */

// .void toggler for placeholder color
/* const FORM_SELECTS = reportForm.querySelectorAll('select')
FORM_SELECTS.forEach( input => {
    input.onchange = () => {
        !!input.value ? input.classList.toggle('void', false) : input.classList.toggle('void', false)
    }
}) */

// showing preview pics
/* const getImgData = () => {
    const files = Object.values(imagesInput.files)
    imagesPreview.innerHTML = ''
    if(files){
        files.forEach( file => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = e => {
                imagesPreview.innerHTML += `<img class="input" src="${e.target.result}" />`;
            }
        });
    }
}
imagesInput.onchange = () => {
    getImgData()
} */

/* 2 - form - end */

/* 3 - subscribe modal - start */


/* 3 - subscribe modal - end */


// set class to checked radio item and show continueToVote button
let optionSelected = false
const SUBSCRIBE_OPTIONS = subscribeWrapper.querySelectorAll('.subscribe-option') 
SUBSCRIBE_OPTIONS.forEach( option => {
    option.onchange = (e) => {
        SUBSCRIBE_OPTIONS.forEach( option => { 
            option.parentElement.classList.toggle('checked', false)
        })
        if(e.target.checked){
            optionSelected = true
            e.target.parentElement.classList.toggle('checked', true)
        }
        continueToVote.classList.toggle('active', true)
    }
})

// opening subscribe modal
continueToSubscribe.onclick = () => {
    modalBg.classList.add('active')
    setTimeout(
        () => {
            subscribe.classList.add('active')
        },
        100
    )
}
// toggle modals
const toggleModal = (modal) => {
    modal.classList.toggle('active')
    modalBg.classList.toggle('active')
}
// canceling modal
modalBg.onclick = () => {
    const activeModal = document.querySelector('.modal.active')
    console.log(activeModal)
    toggleModal(activeModal)
}

// inserting vote content and closing subscribeWrapper
const votationQuery = () => {
    return (
        `
        <div class="vote-card">
        <div class="vote-card__img"><img src="img/albums/cancion_animal.jpg" alt=""></div>
        <div class="vote-card__info">
            <div class="vote-card__info__title">Canción animal</div>
            <div class="vote-card__info__artist">Soda Stereo</div>
            <div class="vote-card__info__album">Canción animal</div>
            <div class="vote-card__info__year">1990</div>
        </div>
        </div>
        <div class="vote-card">
            <div class="vote-card__img"><img src="img/albums/signos.jpg" alt=""></div>
            <div class="vote-card__info">
                <div class="vote-card__info__title">Signos</div>
                <div class="vote-card__info__artist">Soda Stereo</div>
                <div class="vote-card__info__album">Signos</div>
                <div class="vote-card__info__year">1986</div>
            </div>
        </div>
        <button class="standard-bt">Votar</button>
        `
    )
}
const votation = votationQuery()

continueToVote.onclick = () => {
    voteContent.innerHTML = votation
    toggleModal(subscribe)
}
