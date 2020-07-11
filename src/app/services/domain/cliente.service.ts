import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { ClienteDTO } from "../../../models/cliente.dto";
import { API_CONFIG } from "../../../config/api.config";
import {HttpClient, HttpHeaders } from "@angular/common/http";
import { StorageService } from "../storage.service";

@Injectable()
export class ClienteService{

    constructor(public http: HttpClient ,public storage: StorageService){

    }
    findByEmail(email: string ): Observable<ClienteDTO>{
       
        return this.http.get<ClienteDTO>(`${API_CONFIG.baseUrl}/clientes/email?value=${email}`);
    }
//criando API pra inserir clientes
    insert(obj : ClienteDTO){
        return this.http.post(
            `${API_CONFIG.baseUrl}/clientes`,
            obj,{
                    observe: 'response',
                    responseType:'text'
            }
        );
    }
}
