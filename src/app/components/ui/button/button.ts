import { Component, computed, input, Signal } from '@angular/core';
import { RouterLink } from "@angular/router";


export enum ButtonVariant {
  DEFAULT,
  DESTRUCTIVE,
  GHOST,
  LINK,
  OUTLINE,
  SECONDARY,
}

export enum ButtonSize {
  DEFAULT,
  SMALL,
  LARGE,
  ICON,
}


@Component({
  selector: 'app-button',
  imports: [RouterLink],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
  buttonDefaultClasses: string = `inline-flex items-center justify-center gap-2 whitespace-nowrap
    rounded-md text-sm font-medium ring-offset-background transition-colors cursor-pointer
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
    disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0`;
  btnClass = input<string>('');
  buttonVariant = input.required<ButtonVariant>();
  buttonSize = input.required<ButtonSize>();
  routerLink = input<string>('');

  routerLinkValue: Signal<string | undefined> = computed(() => {
    if (this.routerLink() !== '') {
      return this.routerLink();
    } else {
      return undefined;
    }
  });

  btnVariantClasses: Signal<string> = computed(() => {
    return this.getButtonVariantClasses(this.buttonVariant());
  });

  btnSizeClasses: Signal<string> = computed(() => {
    return this.getButtonSizeClasses(this.buttonSize());
  });

  private getButtonVariantClasses(btnVariant: ButtonVariant): string {
    switch(btnVariant) {
      case ButtonVariant.DESTRUCTIVE:
        return 'bg-destructive text-destructive-foreground hover:bg-destructive/90';

      case ButtonVariant.GHOST:
        return 'hover:bg-accent hover:text-accent-foreground';

      case ButtonVariant.LINK:
        return 'text-primary underline-offset-4 hover:underline';

      case ButtonVariant.OUTLINE:
        return 'border border-input bg-background hover:bg-accent hover:text-accent-foreground';

      case ButtonVariant.SECONDARY:
        return 'bg-secondary text-secondary-foreground hover:bg-secondary/80';

      case ButtonVariant.DEFAULT:
      default:
        return 'bg-primary text-primary-foreground hover:bg-primary/90';
    }
  }

  private getButtonSizeClasses(btnSize: ButtonSize): string {
    switch(btnSize) {
      case ButtonSize.SMALL:
        return 'h-9 rounded-md px-3';

      case ButtonSize.LARGE:
        return 'h-11 rounded-md px-8';

      case ButtonSize.ICON:
        return 'h-10 w-10';

      case ButtonSize.DEFAULT:
      default:
        return 'h-10 px-4 py-2';
    }
  }
}
