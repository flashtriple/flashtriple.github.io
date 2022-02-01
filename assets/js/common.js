// 1 - setup
// 2 - uploading img preview
// 3 - subscribe modal

/* 1 - setup - start */

window.addEventListener('DOMContentLoaded', () => {
    const isLoading = bool => {
        displayLoading.classList.toggle('visible', bool)
    }
    isLoading(true)
    
    const userLastVoteId = parseInt(localStorage.getItem('lastVoteId'))
    const userIg = localStorage.getItem('ig') === null ? false : localStorage.getItem('ig')
    const userPhone = parseInt(localStorage.getItem('phone'))
    const userSubscribe = JSON.parse(localStorage.getItem('subscribe'))
    const userVoteSong = parseInt(localStorage.getItem('vote'))

    let user = {
        ig: userIg,
        phone: userPhone,
        subscribe: userSubscribe,
        song: userVoteSong,
    }
    console.log(user)
    let votationId

    const finalVoteContent = 
    `
    <p class="simple-text fs-1dot25">
        Ya votaste y estás participando del sorteo.
    </p>
    <p class="simple-text fs-1dot25">
        Te invitamos a seguirnos en las redes para estar en contacto y ver material de la banda.
    </p>
    <a class="social-bt" href="https://www.instagram.com/stereotributo/"><i class="fab fa-instagram"></i>instagram @stereotributo</a>
    <a class="social-bt" href="https://www.youtube.com/channel/UCJwkofY0EYqYF51WvH0Tz3Q"><i class="fab fa-youtube"></i>YouTube Stereo Tributo</a>
    <a class="social-bt" href="https://www.facebook.com/TributoStereo"><i class="fab fa-facebook"></i>facebook TributoStereo</a>
    <button id="dropLocalStorage" class="standard-bt">resetear prueba</button>
    <button id="changeLastVoteId" class="standard-bt">cambiar n° de última votación</button>
    <button id="votefetch" class="standard-bt">Fetch vote.php</button>
    `

    let votation = ''
    const URL_votationQuery = 'api/votation.php'
    const URL_voteQuery = 'api/vote.php'

    const votationQuery = () => {
        let cards = ''
        fetch(URL_votationQuery)
        .then(res => res.json())
        .then(data => {
            votationId = data.votationId
            if(userLastVoteId === votationId){
                voteContent.innerHTML = finalVoteContent
                dropLocalStorage.onclick = () => {
                    localStorage.clear()
                    location.reload()
                }
                changeLastVoteId.onclick = () => {
                    localStorage.setItem('lastVoteId', 0)
                    location.reload()
                }
                votefetch.onclick = () => { votePost(user) }
                setTimeout(() => { isLoading(false) }, 600)
            } else {
                voteContent.innerHTML = `
                <div></div>
                <p class="simple-text fs-1dot25">Para votar y participar del sorteo ingresá tu número de teléfono y/o usuario de instagram. Finalizado el sorteo, se eliminarán los datos.</p>
                <form>
                    <div class="user-input data">
                        <label><i class="fab fa-whatsapp"></i></label><input id="phoneInput" type="number" class="input" value="${user.phone}" placeholder="Teléfono" maxlength="15"/>
                    </div>
                    <div class="user-input data">
                        <label>@</label><input id="igInput" type="text" class="input" placeholder="Usuario de instagram" maxlength="40" value="${user.ig ? user.ig : ''}"/>
                    </div>
                </form>
                <button id="continueToSubscribe" class="standard-bt">Continuar</button>
                `
                continueToSubscribe.onclick = () => {
                    if(user.subscribe && phoneInput.value) {
                        user.phone = phoneInput.value
                        user.phone && localStorage.setItem('phone', user.phone);
                        if(igInput.value){
                            user.ig = igInput.value
                            user.ig && localStorage.setItem('ig', user.ig);
                        }
                        votationRender()
                    } else {
                        if(igInput.value.trim() != '' || phoneInput.value.trim() != ''){
                            user.phone = phoneInput.value
                            user.ig = igInput.value
                            user.phone && localStorage.setItem('phone', user.phone);
                            user.ig && localStorage.setItem('ig', user.ig);
                            openModal(subscribe)
                        } else {
                            if(igInput.value.trim() === ''){
                                igInput.value = ''
                            }
                            openModal(basicModal, 'Debes ingresar un teléfono o usuario de instagram válido para adjudicar el premio en caso de ganar', 4)
                        }
                    }
                }
                setTimeout(() => { isLoading(false) }, 600)
            }
            data.nominees.forEach(song => {
                cards += 
                `<div class="vote-card" data-value="${song.id}">
                    <div class="vote-card__transparent-layer"></div>
                    <div class="vote-card__img" style="background-image: url('img/songs/${song.img ? song.img : 'artist-' + song.artistId + '.jpg' }')"></div>
                    <div class="vote-card__info">
                        <div class="vote-card__info__title">${song.name}</div>
                        <div class="vote-card__info__artist">${song.artist}</div>
                        ${song.album ? `<div class="vote-card__info__album">${song.album}</div>` : ''}
                        <div class="vote-card__info__date">${song.year}</div>
                    </div>
                </div>`
            })
            votation = 
            `
            <p class="simple-text fs-1dot25">Elejí una canción</p>
            <div id="voteCardsWrapper">
                ${cards}
            </div>
            <button id="voteSubmit" class="standard-bt">Votar</button>
            `
        })
        .catch(error => {
            console.error(error)
        }) 
    }
    votationQuery()
    // vote verification


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
        },/* 
        {
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

    // set class to checked radio item and show continueToVote button
    let optionSelected = false
    const SUBSCRIBE_OPTIONS = subscribeWrapper.querySelectorAll('.subscribe-option') 
    SUBSCRIBE_OPTIONS.forEach( option => {
        option.onchange = (e) => {
            SUBSCRIBE_OPTIONS.forEach( option => { 
                option.parentElement.classList.toggle('checked', false)
            })
            if(e.target.checked){
                user.subscribe = e.target.value
                optionSelected = true
                e.target.parentElement.classList.toggle('checked', true)
            }
            continueToVote.classList.toggle('active', true)
        }
    })

    // canceling modal
    modalBg.onclick = () => {
        closeModal(document.querySelector('.modal.active'))
    }

    // inserting vote content and closing subscribeWrapper
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

    const votePost = async (body) => {
        const response = await fetch(URL_voteQuery, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        console.log(JSON.stringify(user))
        if(response.status >= 200 && response.status < 300) {
            openModal(basicModal, 'Tu voto fué procesado correctamente.<br><br>Ya estás participando del sorteo.', 4)
            console.log(response)
        } else {
            console.log(response)
        }
        
    }

    const votationRender = () => {
        voteContent.innerHTML = votation
        voteSubmit.onclick = async() => {
            if(voteCardsWrapper.querySelector('.selected')){
                isLoading(true)
                
                user.song = voteCardsWrapper.querySelector('.selected').dataset.value
                localStorage.setItem(`vote`, user.song)
                localStorage.setItem(`lastVoteId`, votationId)
                await votePost(user)
                voteContent.innerHTML = finalVoteContent
                isLoading(false)
                dropLocalStorage.onclick = () => {
                    localStorage.clear()
                    location.reload()
                }
                changeLastVoteId.onclick = () => {
                    localStorage.setItem('lastVoteId', 0)
                    location.reload()
                }
            } else {
                openModal(basicModal, 'Debes seleccionar una canción para votar y participar del sorteo.', 4)
            }
        }
        votationSetup()
    }
    const toVotation = () => {
        votationRender()
        setTimeout(() => { 
            closeModal(subscribe)
        }, 200)
    }
    continueToVote.onclick = () => {
        localStorage.setItem('subscribe', user.subscribe);
        if(user.subscribe === 'true'){
            if(user.phone){
                toVotation()
            } else {
                setTimeout(() => { 
                    closeModal(subscribe)
                    setTimeout(() => { openModal(basicModal, 'Para suscribirte a la lista de difusión de Whatsapp, ingresa tu número de telefono.', 4)}, 600)
                }, 200)
            }
        } else {
            toVotation()
        }

    }

    // toggle modals

    let basicModalTimeout = false
    const openModal = (modal, msg, seconds) => {
        if(modal.id === 'basicModal'){
            modal.lastElementChild.innerHTML = msg
            basicModalTimeout = setTimeout(() => {
                closeModal(basicModal)
            }, seconds * 1000)
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
        if (basicModalTimeout) {
            clearTimeout(basicModalTimeout);
            basicModalTimeout = false;
        }
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

    closeBasicModal.onclick = () => { closeModal(basicModal) }

});