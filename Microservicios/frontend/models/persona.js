export class Persona {
    constructor({ id = null, nombre = "", direccion = "", telefono = "", correo = "" } = {}) {
        this.id = id;
        this.nombre = nombre;
        this.direccion = direccion;
        this.telefono = telefono;
        this.correo = correo;
    }

    toJSON() {
        return {
            id: this.id,
            nombre: this.nombre,
            direccion: this.direccion,
            telefono: this.telefono,
            correo: this.correo,
        };
    }
}

