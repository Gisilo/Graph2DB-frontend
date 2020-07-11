
import * as yup from 'yup'

yup.addMethod(yup.mixed, 'checkWithField', function(field, msg) {
    return yup.mixed().test({
        name: 'checkWithField',
        message: msg,
        params: {
            reference: field.path,
        },
        test: function(value) {
            if (!value)
                return true;
            if (this.options.parent[field] === 'int') {
                return Number.isInteger(value);
            } else {
                return true
            }
        },
    });
});

yup.addMethod(yup.array, "unique", function(message, mapper) {
    return this.test("unique", message, function(list) {
        const set = [...new Set(list.map(mapper))];
        const isUnique = list.length === set.length;
        if (isUnique) {
            return true;
        }
        const idx = list.findIndex((l, i) => mapper(l) !== set[i]);
        return this.createError({ path: `nProps[${idx}].name`, message });
    });
});

export const NODESCHEMA = yup.object({
    nName: yup.string().required("Node name required"),
    nDesc: yup.string(),
    nProps: yup.array().of(
        yup.object({
            name: yup.string().required("Name required"),
            domain: yup.mixed().oneOf(['int', 'float', 'string', 'bool', 'date', 'time', 'dateTime'])
                .required("Domain required"),
            pk: yup.boolean(),
            required: yup.boolean(),
            default: yup.mixed()
                .checkWithField('domain', 'Default value must be integer')
                .when('required', {is: true, then:yup.mixed().required("Default value required")})
        })
    ).unique("Name property already used", x => x.name)

});

export const EDGESCHEMA = yup.object({
    nName: yup.string().required("Node name required"),
    nDesc: yup.string(),
    nProps: yup.array().of(
        yup.object({
            name: yup.string().required("Name required"),
            domain: yup.mixed().oneOf(['int', 'float', 'string', 'bool', 'date', 'time', 'dateTime'])
                .required("Domain required"),
            pk: yup.boolean(),
            required: yup.boolean(),
            default: yup.mixed()
                .checkWithField('domain', 'Default value must be integer')
                .when('required', {is: true, then:yup.mixed().required("Default value required")})
        })
    ).unique("Name property already used", x => x.name),
    cardMax: yup.string().oneOf(["zero", "one", "many"]).required("Maximum cardinality required"),
    cardMin: yup.string().oneOf(["zero", "one", "many"]).required("Minimum cardinality required"),
});

