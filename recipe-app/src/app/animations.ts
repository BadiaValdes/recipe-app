import {
    trigger, animateChild, group,
    transition, animate, style, query
  } from '@angular/animations';

  // Routable animations
export const slideInAnimation =
trigger('routeAnimation', [
  transition('* <=> *', [
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
        animate('500ms ease-out', style({ opacity: '0%'})) // Final state of leave
      ]),
      query(':enter', [
        animate('800ms ease-out', style({ opacity: '100%'}))// Final state of enter
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
            style({ opacity: 0 }), // Initial State
            animate('0.8s ease-in', 
                    style({ opacity: 1 }))
          ]
        ),
        transition(
          ':leave', 
          [
            style({ opacity: 1 }), // Initial State
            animate('0.5s ease-out', 
                    style({  opacity: 0 }))
          ]
        )
      ]
    )

    export const inOutAnimationFast = 
    trigger(
      'inOutAnimationFast', 
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
            animate('0.4s ease-out', 
                    style({  opacity: 0 }))
          ]
        )
      ]
    )


    export const inOutAnimationFast2 = 
    trigger(
      'inOutAnimationFast2', 
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
            animate('0.01s ease-out', 
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

    export const heightAnimation = trigger(
      'heightAnimation',
      [
        
        transition(":enter",
        [style({height: 0}),
          animate('1.5s ease-out', style({height: '*'}))
        ]
        ),
        transition(":leave",
        [style({height: '*'}),
          animate('1.5s ease-out', style({height: 0}))
        ])
      
      ]
    )

    export const scaleCenter = trigger(
      'scaleCenter',
      [
        transition(":enter",
        [style({transform: 'scale(0)' }),
          animate('1s ease-out', style({transform: 'scale(*)'}))
        ]
        ),
        transition(":leave",
        [style({transform: 'scale(*)'}),
          animate('1s ease-out', style({transform: 'scale(0)'}))
        ])
      
      ]
    )
  



