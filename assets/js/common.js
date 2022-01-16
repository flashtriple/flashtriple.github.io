// 1 - setup
// 2 - uploading img preview
// 3 - subscribe modal

/* 1 - setup - start */

const finalVoteContent = 
`<h2>Tu voto fué procesado.<br>Ya estás participando del sorteo.</h2> 
<a class="social-bt" onclick="goTo('https://www.youtube.com/channel/UCJwkofY0EYqYF51WvH0Tz3Q')"><i class="fab fa-youtube"></i>YouTube - Stereo Tributo</a>
<a class="social-bt" onclick="goTo('https://www.instagram.com/stereotributo/')"><i class="fab fa-instagram"></i>instagram @stereotributo</a>
<a class="social-bt" onclick="goTo('https://www.facebook.com/TributoStereo/')"><i class="fab fa-facebook"></i>facebook/TributoStereo</a>
<button id="dropLocalStorage" class="standard-bt">resetear prueba</button>`
// vote verification
if(localStorage.getItem('voted')){
    voteContent.innerHTML = finalVoteContent
    dropLocalStorage.onclick = () => {
        localStorage.clear()
        location.reload()
    }
} else {
    voteContent.innerHTML = `
    <p class="simple-text">Para registrar el voto y participar del sorteo, necesitamos número de teléfono o usuario de instagram. Se eliminarán los datos luego de finalizado el sorteo.</p>
    <form>
        <div class="user-input data">
            <label>@</label><input type="text" class="input" placeholder="Usuario de instagram" maxlength="40"/>
        </div>
        <div class="user-input data">
            <label><i class="fab fa-whatsapp"></i></label><input type="number" class="input" placeholder="Teléfono" maxlength="15"/>
        </div>
    </form>
    <button id="continueToSubscribe" class="standard-bt">Continuar</button>
    `
    // opening subscribe modal
    continueToSubscribe.onclick = () => {
        openModal(subscribe)
    }
}

// nav constructor

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

// toggle modals
const openModal = (modal, msg) => {
    if(modal.id === 'basicModal'){
        modal.firstElementChild.innerHTML = msg
    }
    modal.classList.remove('d-none')
    modalBg.classList.remove('d-none')
    setTimeout(
        () => {
            modalBg.classList.add('active')
        },
        50
    )
    setTimeout(
        () => {
            modal.classList.add('active')
        },
        200
    )
}
const closeModal = (modal) => {
    modal.classList.remove('active')
    setTimeout(
        () => {
            modalBg.classList.remove('active')
        },
        100
    )
    setTimeout(
        () => {
            modalBg.classList.add('d-none')
            modal.classList.add('d-none')
        },
        300
    )
}
// canceling modal
modalBg.onclick = () => {
    closeModal(document.querySelector('.modal.active'))
}

// inserting vote content and closing subscribeWrapper
const votationQuery = () => {
    return (
        `
        <div id="voteCardsWrapper">
            <div class="vote-card">
                <div class="vote-card__transparent-layer"></div>
                <input hidden id="option1" class="vote-option" name="votation" type="radio" value="1" />
                <div class="vote-card__img" style="background-image: url('img/options/1.jpg')"></div>
                <div class="vote-card__info">
                    <div class="vote-card__info__title">Canción animal</div>
                    <div class="vote-card__info__artist">Soda Stereo</div>
                    <div class="vote-card__info__album">Canción animal</div>
                    <div class="vote-card__info__date">1990</div>
                </div>
            </div>
            <div class="vote-card">
                <div class="vote-card__transparent-layer"></div>
                <input hidden id="option2" class="vote-option" name="votation" type="radio" value="2" />
                <div class="vote-card__img" style="background-image: url('img/options/2.jpg')"></div>
                <div class="vote-card__info">
                    <div class="vote-card__info__title">Signos</div>
                    <div class="vote-card__info__artist">Soda Stereo</div>
                    <div class="vote-card__info__album">Signos</div>
                    <div class="vote-card__info__date">1986</div>
                </div>
            </div>
        </div>
        <button id="voteSubmit" class="standard-bt">Votar</button>
        `
    )
}

const votation = votationQuery()

const votationSetup = () => {
    voteCardsWrapper.onclick = (e) => {
        if(e.target.classList.contains('vote-card__transparent-layer') && !e.target.parentElement.classList.contains('selected')){
            if(voteCardsWrapper.querySelector('.selected')){
                voteCardsWrapper.querySelector('.selected').classList.remove('selected')
            }
            e.target.parentElement.classList.toggle('selected', true)
        }
    }
}

const goTo = url => {
    window.open(url, '_blank')
}
continueToVote.onclick = () => {
    voteContent.innerHTML = votation
    voteSubmit.onclick = () => {
        openModal(basicModal, 'Tu voto fué emitido y estás participando del sorteo.<br>Se llamará al numero registrado o al usuario de instagram para anunciar al ganador y corroborar identidad')
        voteContent.innerHTML = finalVoteContent
        localStorage.setItem('voted', true);
    }
    setTimeout(() => { closeModal(subscribe) }, 200)
    votationSetup()
}
const toggleLoader = bool => {
    loading.classList.toggle('d-none', bool)
}
setTimeout(()=>{toggleLoader(true)}, 600)