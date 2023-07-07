import { Injectable } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor( private toastService: HotToastService ) { }

  toast(loading: string, message: string, error: string): void{
    this.toastService.observe({
      loading: loading,
      success: message,
      error: error
    })
  }
}
