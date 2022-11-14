import { FormControl, FormGroup } from "@angular/forms";

export class FormValidations {
    static equalsTo(otherField: string) {
        const validator = (formControl: FormControl) => {
            if (otherField == null) {
                throw new Error('Campo não informado!');
            }

            if (!formControl.root || !(<FormGroup>formControl.root).controls) {
                return null;
            }

            const field = (<FormGroup>formControl.root).get(otherField);

            if (!field) {
                throw new Error('Campo inválido!');
            }

            let valorField = field.value,
                  valorFormControl = formControl.value;

            if (valorField == null) { valorField = ""}
            if (valorFormControl == null) { valorFormControl = ""}
                
            if (valorField !== valorFormControl) {
                return { equalsTo : otherField }
            }

            return null;
        };
        return validator;
    }
}