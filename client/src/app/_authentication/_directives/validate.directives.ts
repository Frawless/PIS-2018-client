import {Directive, Input} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, Validator, ValidatorFn} from '@angular/forms';


export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
        const forbidden = nameRe.test(control.value);
        return forbidden ? {'forbiddenName': {value: control.value}} : null;
    };
}

@Directive({
    selector: '[postCodeValidate]',
    providers: [{provide: NG_VALIDATORS, useExisting: PostCodeValidatorDirective, multi: true}]
})
export class PostCodeValidatorDirective implements Validator {
    @Input('appForbiddenName') forbiddenName: string;

    validate(control: AbstractControl): {[key: string]: any} {
        return this.forbiddenName ? forbiddenNameValidator(new RegExp(this.forbiddenName, 'i'))(control)
            : null;
    }
}



