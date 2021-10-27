document.body.onload = () => {

    const btnRegister = document.querySelector('#register-btn')
    const btnEnter = document.querySelector('#enter-btn')

    const panelSign = document.querySelector('#sign')
    const panelSideLeft = document.querySelector('#aside-left')

    const firstPanel = document.querySelector('#first-panel')
    const secondPanel = document.querySelector('#second-panel')

    const signIn = document.querySelector('#sign-in')
    const signUp = document.querySelector('#sign-up')



    if (window.location.href.substring(window.location.href.lastIndexOf('/') + 1) == 'cadastrar') {
        panelSign.style.transform = "translateX(-404px)"
        panelSideLeft.style.transform = "translateX(404px)"

        // FADE OUT SIGN IN, FIRST PANEL 
        firstPanel.style.opacity = '0'
        signIn.style.opacity = '0'

        setTimeout(() => {
            // Remove display SIGN IN, FIRST PANEL 
            firstPanel.style.display = 'none'
            signIn.style.display = 'none'

            // ADD DISPLAY SIGN UP, SECOND PANEL 
            secondPanel.style.display = 'block'
            signUp.style.display = 'block'

            setTimeout(() => {
                // FADE IN SIGN UP, SECOND PANEL 
                secondPanel.style.opacity = '1'
                signUp.style.opacity = '1'
            }, 200)

        }, 200)
    }



    btnRegister.addEventListener('click', e => {

        e.preventDefault()
        console.log('aqui')
        const href = window.location.href
        const path = href.substring(href.lastIndexOf('/') + 1)

        if (path == 'entrar') {
            window.history.pushState({ page: "register" }, "register page", "cadastrar")

            panelSign.style.transform = "translateX(-404px)"
            panelSideLeft.style.transform = "translateX(404px)"

            // FADE OUT SIGN IN, FIRST PANEL 
            firstPanel.style.opacity = '0'
            signIn.style.opacity = '0'

            setTimeout(() => {
                // Remove display SIGN IN, FIRST PANEL 
                firstPanel.style.display = 'none'
                signIn.style.display = 'none'

                // ADD DISPLAY SIGN UP, SECOND PANEL 
                secondPanel.style.display = 'block'
                signUp.style.display = 'block'

                setTimeout(() => {
                    // FADE IN SIGN UP, SECOND PANEL 
                    secondPanel.style.opacity = '1'
                    signUp.style.opacity = '1'
                }, 200)

            }, 200)
        }
    })

    btnEnter.addEventListener('click', e => {

        e.preventDefault()
        const href = window.location.href
        const path = href.substring(href.lastIndexOf('/') + 1)
        console.log(path)
        if (path == 'cadastrar') {
            window.history.pushState({ page: "enter" }, "enter page", "entrar")

            panelSign.style.transform = "translateX(0)"
            panelSideLeft.style.transform = "translateX(0)"

            // FADE OUT SIGN UP, SECOND PANEL 
            secondPanel.style.opacity = '0'
            signUp.style.opacity = '0'

            setTimeout(() => {
                // Remove display SIGN UP, SECOND PANEL 
                secondPanel.style.display = 'none'
                signUp.style.display = 'none'


                // ADD DISPLAY SIGN IN, FIRST PANEL 
                firstPanel.style.display = 'block'
                signIn.style.display = 'block'

                setTimeout(() => {
                    // FADE IN SIGN IN, FIRST PANEL 
                    firstPanel.style.opacity = '1'
                    signIn.style.opacity = '1'
                }, 200)

            }, 200)
        }

    })

}