import {
    trigger, animateChild, group,
    transition, animate, style, query
  } from '@angular/animations';

  // Routable animations
export const slideInAnimation =
trigger('routeAnimation', [
  transition('hero <=> hero_detail', [
    style({ position: 'relative' }),
    query(':enter, :leave', [ // General CSS for the two of the animations
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%'
      })
    ]),
    query(':enter', [ // Initial State of the enter one
      style({ opacity: '0%'})
    ]),
    query(':leave', animateChild()), // Says that the leave animation is a child of enter, so, it will come after
    group([
      query(':leave', [
        animate('300ms ease-out', style({ opacity: '0%'})) // Final state of leave
      ]),
      query(':enter', [
        animate('400ms ease-out', style({ opacity: '100%'}))// Final state of enter
      ])
    ]),
    query(':enter', animateChild()),
  ])
]);

let initialHeight = 65;

export const inOutAnimation = 
    trigger(
      'inOutAnimation', 
      [
        transition(
          ':enter', 
          [
            style({ opacity: 0 }),
            animate('0.8s ease-in', 
                    style({ opacity: 1 }))
          ]
        ),
        transition(
          ':leave', 
          [
            style({ opacity: 1 }),
            animate('0.5s ease-out', 
                    style({  opacity: 0 }))
          ]
        )
      ]
    )

    export const inOutMenuAnimation = 
    trigger(
      'inOutMenuAnimation', 
      [
        transition(
          ':enter', 
          [
            style({ opacity: 0 }),
            animate('1.5s ease-out', 
                    style({ opacity: 1 }))
          ]
        ),
        transition(
          ':leave', 
          [
            style({ opacity: 1 }),
            animate('1.5s ease-in', 
                    style({  opacity: 0 }))
          ]
        )
      ]
    )
  



