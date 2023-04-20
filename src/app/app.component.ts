import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PetService } from './pet.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  pets;
  /*name : string = 'Liza';
  age: number = 19;
  title = 'angular-app';
  func = (title:string):string=>{return title};
  output = this.func('Liza')
  firstInput : string = 'Liza';
  */
  constructor(private route: ActivatedRoute, private petService: PetService) {
    this.pets = this.petService.pets;
    console.log('====================================');
    console.log(this.petService.pets);
    console.log(this.pets);
    console.log('====================================');
  }
    
}
