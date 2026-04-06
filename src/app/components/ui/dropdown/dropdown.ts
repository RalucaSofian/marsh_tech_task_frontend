import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, ChevronDown } from 'lucide-angular';

export type DropdownOption = {
    value: any;
    display: string;
};

@Component({
    selector: 'app-dropdown',
    imports: [FormsModule, LucideAngularModule],
    templateUrl: './dropdown.html',
    styleUrl: './dropdown.css',
})
export class Dropdown {
    readonly ChevronDown = ChevronDown;
    options = input.required<DropdownOption[]>();
    currentValue = input.required<any>();

    optionSelected = output<any>();

    handleOptionSelect(value: any) {
        this.optionSelected.emit(value);
    }

    compareFn(a: any, b: any): boolean {
        return a === b;
    }
}
