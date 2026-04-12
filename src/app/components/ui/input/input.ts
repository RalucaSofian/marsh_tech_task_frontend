import { Component, computed, input, signal, Signal } from '@angular/core';
import {
    ControlValueAccessor,
    FormsModule,
    NG_VALUE_ACCESSOR,
    ReactiveFormsModule,
} from '@angular/forms';

@Component({
    selector: 'app-input',
    imports: [ReactiveFormsModule, FormsModule],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: Input,
        },
    ],
    templateUrl: './input.html',
    styleUrl: './input.css',
})
export class Input implements ControlValueAccessor {
    inputDefaultClasses: string = `flex h-10 w-full rounded-md border border-input bg-card px-3 py-2
    text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm
    file:font-medium file:text-foreground placeholder:text-muted-foreground
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
    disabled:cursor-not-allowed disabled:opacity-50 md:text-sm`;
    appInputClass = input<string>('');

    appInputPlaceholder = input<string>('');

    appInputType = input<string>('');
    appInputFormName = input<string>('');

    inputValue = signal<any>(null);
    onChange = (val: any) => {};
    onTouched = () => {};
    touched = false;

    inputTypeValue: Signal<string | undefined> = computed(() => {
        if (this.appInputType() !== '') {
            return this.appInputType();
        } else {
            return undefined;
        }
    });

    writeValue(obj: any): void {
        this.inputValue.set(obj);
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    markAsTouched() {
        if (!this.touched) {
            this.onTouched();
            this.touched = true;
        }
    }

    handleInputChange(newValue: any) {
        this.inputValue.set(newValue);
        this.onChange(newValue);
        this.markAsTouched();
    }
}
