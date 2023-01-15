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

  testCarsData = [
    {
      image: "1.png",
      name:"Lamborghini Huracan Spyder",
      gear: "полный",
      engine: 5.2,
      places: 2
    },
    {
      image: "2.png",
      name:"Chevrolet Corvette",
      gear: "полный",
      engine: 6.2,
      places: 2
    },
    {
      image: "3.png",
      name:"Ferrari California",
      gear: "полный",
      engine: 3.9,
      places: 4
    },
    {
      image: "4.png",
      name:"Lamborghini Urus",
      gear: "полный",
      engine: 4.0,
      places: 5
    },
    {
      image: "5.png",
      name:"Audi R8",
      gear: "полный",
      engine: 5.2,
      places: 2
    },
    {
      image: "6.png",
      name:"Аренда Chevrolet Camaro",
      gear: "полный",
      engine: 2.0,
      places: 4
    },
  ]

  carsData: any

  constructor(private fb: FormBuilder, private appService: AppService) {
  }

  ngOnInit(){
    this.appService.getData().subscribe(data => this.carsData = data)
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
