import { Component, input, output } from '@angular/core';
import { LucideAngularModule, X } from 'lucide-angular';
import { Button, ButtonSize, ButtonVariant } from '../button/button';

@Component({
    selector: 'app-modal',
    imports: [LucideAngularModule, Button],
    templateUrl: './modal.html',
    styleUrl: './modal.css',
})
export class Modal {
    readonly X = X;
    readonly ButtonVariant = ButtonVariant;
    readonly ButtonSize = ButtonSize;

    isOpen = input<boolean>(false);
    onClose = output();

    close() {
        this.onClose.emit();
    }
}
