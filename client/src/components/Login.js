import { MainLogo } from './svg'
import React, { useEffect } from "react"
import gsap from "gsap"
import { Back } from 'gsap/gsap-core'
import { FBSvg } from './svg'


const Login = () => {

    // const localhost = process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : ''

    useEffect(() => {

        let tl = gsap.timeline({
            defaults: {
                duration: 1,
            }
        })
        tl.from('#mainText span', {
            x: -100,
            opacity: 0,
            ease: Back.easeOut.config(1)
        })
        tl.from('#subText', {
            x: 70,
            opacity: 0,
            ease: Back.easeOut.config(1)
        }, "-=.8")
        tl.from('.right-col-items svg', {
            rotation: 720,
            opacity: 0,
            duration: 1.5
        }, "-=.5")

        const translateDist = 150
        tl.from('#harryLogo', {
            opacity: 0,
            translateX: translateDist,
            translateY: translateDist,
            duration: 1.5,
            ease: Back.easeOut.config(1)
        }, "-=.8")
        tl.delay(.5)
        tl.play()
    })
    return (
        <div className="login--wrapper">
            <div className="login">
                <div id="harryLogo" className="harryLogo">
                    <img src="/assets/many_megan.png" alt="big Harry" />
                </div>
                <div className="left-col">
                    <div className="left-col-items">
                        <h1 id="mainText"><span>THURSDAY</span><span>REPORT</span></h1>
                        <p id="subText">Save time</p>
                        <a id="signIn" className="hoverAnim" href={`https://0f60-8-18-52-2.ngrok.io/auth/facebook`}><FBSvg /><span>Sign In with Facebook</span></a>
                    </div>
                </div>
                <div className="right-col">
                    <div className="right-col-items">
                        <MainLogo />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
