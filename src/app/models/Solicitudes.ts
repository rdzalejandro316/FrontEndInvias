export class Solicitudes_tie{
    id_solicitud: number  = 0;
    id_peticionario: string = "";
    fecha: string = "";    
    nombre_peticionario: string = "";
    tipo_peticionario: string = "";
    nombre_peaje: string = "";
    placa_vehiculo : string = "";
    marca_vehiculo: string = "";
    color: string = "";
    numero_chasis: string = "";
    estadoSolicitudes! : EstadoSolicitudes;
}

export class EstadoSolicitudes{
    idestado: number  = 0;
    id_solicitud_estado: number  = 0;
    estado: string = "";
    fecha_estado: string = "";    
    nota: string = "";    
    check_estado : boolean = true;
    estado_tie_interno: string = "";
}



export class SolicitudesIterno
{    
    check_table:boolean = false;
    id_solicitud: number  = 0;
    id_peticionario: string = "";
    fecha: string = "";    
    nombre_peticionario: string = "";
    tipo_peticionario: string = "";
    nombre_peaje: string = "";
    placa_vehiculo : string = "";
    marca_vehiculo: string = "";
    color: string = "";
    numero_chasis: string = "";
    idestado: number  = 0;
    id_solicitud_estado: number  = 0;
    estado: string = "";
    fecha_estado: string = "";    
    nota: string = ""; 
    check_estado : boolean = false;
    estado_tie_interno: string = "";
}

  