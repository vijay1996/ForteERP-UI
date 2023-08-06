function emailValidator(field:any, fields:Array<any>) {
    field.error = "";
    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(field?.value))) {
        field.error = "(Email is invalid)"
    };
    field.changed = field.changed ? (field.changed += 1) : 0;
}

export default {
    emailValidator
}