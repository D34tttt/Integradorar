export interface Usuario {
    _id?:        string;
    estado:      string;
    municipio:   string;
    counidad:    string;
    nomUsuari:   string;
    nombre:      string;
    apPaterno:   string;
    apMaterno:   string;
    correoElec:  string;
    tel:         string;
    contr:       string;
    tipoUsuario: string;
    nomCall:     string;
    numDom:      number;
    __v?:        number;
}
export interface Estados{
    _id?:        string;
    nomEstado:   string;
    __v?:        number;
}

export interface Municipios{
    _id?:        string;
    nomEstado:    string,
    nomMunicipio:string,
    __v?:        number;
}
export interface Comunidades{
    _id?:        string;
    nomMunicipio:string,
    nomComunidad:string,
    __v?:        number;
}
export interface tipoUsuario{
    _id?:        string;
    tipoUsuario: string;
    __v?:        number;
}
export interface Terreno{
    idl:         number;
    idTerreno:   string,
	nombre_pro:  string,
	ancho:       number;
	largo:       number;
	area:        number;
	estado:      string,
	municipio:   string,
	comunidad:   string,
	colinda:     string,
	latitud:     number;
	longitud:    number;
    __v?:        number;
}
export interface NumT{
    _id?:        string;
    nomNumT:     number;
    __v?:        number;
}
export interface Historial{
    _id?:        string;
    idl:         number;
    nomUsuari:   string,
    fecha:       Date,
    latitud:     number,
	longitud:    number,
    file?:       string;
    status:       string;
    __v?:        number;
}
export interface Consulta{
    _id?:        string;
    nomUsuari:   string;
    fecha:       Date;
    nombre:      string;
    estadoC:     string;
    idT:         number;
    __v?:        number;
}

export interface Valorado{
    id?:         string;
    idTerreno:   number;
	Item:        string;
	costo:       number;
    __v?:        number;
}
export interface Imagenes{
    idTerreno:   number;
    imagen:File;
}