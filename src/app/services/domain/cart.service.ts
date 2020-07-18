import { Injectable } from "@angular/core";
import { StorageService } from "../storage.service";


@Injectable()
export class CartService{

    constructor(public storage: StorageService){

    }
    createOrClearCart() :Cart{
        let Cart: Cart ={items:[]};
        this.storage.s
    }
}