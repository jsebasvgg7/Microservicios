export const validations = {
    nombre: {
        required: true,
        minLength: 2,
        maxLength: 100,
        pattern: /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/,
        message: "El nombre solo puede contener letras y espacios (mín. 2 caracteres).",
    },
    direccion: {
        required: true,
        minLength: 5,
        maxLength: 200,
        message: "La dirección debe tener al menos 5 caracteres.",
    },
    telefono: {
        required: true,
        pattern: /^[0-9+\-\s()]{7,20}$/,
        message: "Ingresa un teléfono válido (solo números, +, -, espacios).",
    },
    correo: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Ingresa un correo electrónico válido.",
    },
};

export function validateField(name, value) {
    const rule = validations[name];
    if (!rule) return null;

    const v = (value || "").trim();

    if (rule.required && v === "") return `Este campo es obligatorio.`;
    if (rule.minLength && v.length < rule.minLength) return rule.message;
    if (rule.maxLength && v.length > rule.maxLength) return rule.message;
    if (rule.pattern && !rule.pattern.test(v)) return rule.message;

    return null;
}
export function validateForm(data) {
    const errors = {};
    for (const field of ["nombre", "direccion", "telefono", "correo"]) {
        const err = validateField(field, data[field]);
        if (err) errors[field] = err;
    }
    return { valid: Object.keys(errors).length === 0, errors };
}