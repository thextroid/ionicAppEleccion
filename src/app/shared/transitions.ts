import { Animation, NavOptions } from '@ionic/core'
import { createAnimation } from '@ionic/core'

export function customTransition (_: HTMLElement, opts: TransitionOptions): any {

  // TODO: Convert all to Ionic 5 animations
  // TODO: Get some way of playing the animations synchronously

  const enteringEl = opts.enteringEl
  const leavingEl = opts.leavingEl
  // const ionPageElement = getIonPageElement(enteringEl)

  const rootTransition = createAnimation('rootTransition')
    .beforeRemoveClass('ion-page-invisible')
    .duration(300)
    .easing('cubic-bezier(.36, .66, .1, 1)')

  const pageDirection = opts.direction
  console.log('Direction: ', pageDirection)

  let leavingPage
  let enteringPage

  if (leavingEl) {
    leavingPage = createAnimation('leavingPage')
      .addElement(getIonPageElement(leavingEl))
      .fromTo('transform', 'translateX(0px)', 'translateX(100%)')
  }

  if (enteringEl) {
    enteringPage = createAnimation('enteringPage')
      .addElement(getIonPageElement(enteringEl))
      .fromTo('transform', 'translateX(100%)', 'translateX(0px)')
  }

  rootTransition
    .addAnimation([leavingPage, enteringPage])

  // Animate toolbar if it's there
  // const enteringToolbarEle = ionPageElement.querySelector('ion-toolbar')
  // if (enteringToolbarEle) {
  //   const enteringToolBar = createAnimation('enteringToolBar')
  //   enteringToolBar.addElement(enteringToolbarEle)
  //   rootTransition.addAnimation(enteringToolBar)
  // }

  return rootTransition
}

export interface TransitionOptions extends NavOptions {
  progressCallback?: ((ani: Animation | undefined) => void);
  window: Window;
  baseEl: any;
  enteringEl: HTMLElement;
  leavingEl: HTMLElement | undefined;
}

function getIonPageElement (element: HTMLElement) {
  if (element.classList.contains('ion-page')) {
    return element
  }
  const ionPage = element.querySelector(':scope > .ion-page, :scope > ion-nav, :scope > ion-tabs')
  if (ionPage) {
    return ionPage
  }
  return element
}
