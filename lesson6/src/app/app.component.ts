import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AppService} from "./app.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  priceForm = this.fb.group({
    name: ['', Validators.required],
    phone: ['', Validators.required],
    car: ['', Validators.required],
  })
  carsData: any

  constructor(private fb: FormBuilder, private appService: AppService) {
  }

  ngOnInit(){
    this.appService.getData(this.category).subscribe(data => this.carsData = data)
  }

  category: string = 'sport';
  toggleCategory(category: string) {
    this.category = category;
    this.ngOnInit();
  }

    goScroll(target: HTMLElement){
      target.scrollIntoView({behavior: "smooth"})
    }

    onSubmit(){
      if (!this.priceForm.valid) return;

      this.appService.sendQuery(this.priceForm.value)
        .subscribe({
          next: (response: any) => {
            alert(response.message)
            this.priceForm.reset()
          },
          error: (response) => {
            alert(response.error.message)
          }
        })
    }
}
