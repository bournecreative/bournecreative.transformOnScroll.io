import {
    TweenMax
} from "gsap";
import { hasClass } from "./helpers";
import ScrollMagic from "scrollmagic";
import "scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap";
import "scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators";

export default function () {
    const panels = document.querySelectorAll('.scroll-trap .panel')
    const targetImage = document.querySelector('.scroll-trap .targetImage')
    var panelsMap = [
        // maps triggers to panels
        {
            trigger: "#trigger1",
            name: "panel1",
            tween: {
                yAxis: "200%",
                scale: .8
            }
        },
        {
            trigger: "#trigger2",
            name: "panel2",
            tween: {
                yAxis: "0%",
                scale: 1.1
            }
        },
        {
            trigger: "#trigger3",
            name: "panel1",
            tween: {
                yAxis: "200%",
                scale: .8
            }
        }

    ]

    const controller = new ScrollMagic.Controller();

    new ScrollMagic.Scene({
        triggerElement: ".panel-wrapper",
        triggerHook: 0,
        duration: "300%"
    })
        .setPin('.panel-wrapper', {
            pushfollowers: true
        })
        .addTo(controller)


    for (var i = 0; i < panelsMap.length; i++) {
        const nextPanel = panelsMap[i]
        const prevPanel = panelsMap[i - 1]

        new ScrollMagic.Scene({
            triggerElement: nextPanel.trigger,
            triggerHook: .7
        })
            .on("enter", function (e) {
                const triggerElement = e.target.triggerElement();
                const currentPanelId = triggerElement.getAttribute('data-trigger')
                const currentPanel = document.querySelector('.panel-wrapper .panel' + currentPanelId)
                clearActiveClass()
                currentPanel.classList.add('active')
                if (e.scrollDirection === "FORWARD") {
                    TweenMax.to(targetImage, 1.2, { y: nextPanel.tween.yAxis, scale: nextPanel.tween.scale, ease: "power3.out" })
                }
            })
            .on("leave", function (e) {
                //this is the element we have left
                const triggerElement = e.target.triggerElement();
                const currentPanelId = triggerElement.getAttribute('data-trigger')
                const currentPanel = document.querySelector('.panel-wrapper .panel' + currentPanelId)
                // this is the element we are entering
                const enteredElement = currentPanel.previousElementSibling;
                if (hasClass(enteredElement, 'panel')) {
                    clearActiveClass()
                    enteredElement.classList.add('active')
                    if (e.scrollDirection === "REVERSE") {
                        TweenMax.to(targetImage, 1.2, { y: prevPanel.tween.yAxis, scale: prevPanel.tween.scale, ease: "power3.out" })
                    }
                }
            })
            .addTo(controller)

    }

    function clearActiveClass() {
        panels.forEach(item => {
            item.classList.remove('active')
        })
    }
}



