import { animate, animation, sequence, style } from '@angular/animations';

export const listItemInsert = animation([
  style({ height: '0', opacity: '0', transform: 'translateX(20px)', 'box-shadow': 'none' }),
  sequence([
    animate('.1s ease', style({ height: '*', opacity: '.2', transform: 'translateX(20px)', 'box-shadow': 'none' })),
    animate(
      '.35s ease',
      style({ height: '*', opacity: 1, transform: 'translateX(0)', 'box-shadow': '0 1px 4px 0 rgba(0, 0, 0, 0.3)' })
    ),
  ]),
]);

export const listItemRemove = animation([
  style({ height: '*', opacity: '1', transform: 'translateX(0)', 'box-shadow': '0 1px 4px 0 rgba(0, 0, 0, 0.3)' }),
  sequence([
    animate('.35s ease', style({ height: '*', opacity: '.2', transform: 'translateX(20px)', 'box-shadow': 'none' })),
    animate('.1s ease', style({ height: '0', opacity: 0, transform: 'translateX(20px)', 'box-shadow': 'none' })),
  ]),
]);

export const slideFadeIn = animation([
  style({ opacity: 0, width: '0', height: '0' }),
  animate('200ms ease-out', style({ opacity: 1, width: '*', height: '*' })),
]);

export const slideFadeOut = animation([
  style({ opacity: 1, width: '*', height: '*' }),
  animate('320ms ease-out', style({ opacity: 0, width: '0', height: '0' })),
]);
