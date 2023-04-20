import { Component, DoCheck, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pet, PetService } from '../pet.service';

@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.scss'],
})
export class PetComponent implements OnInit, DoCheck {
  petInfo: Omit<Pet, 'pet' | 'petCount'>;

  pet;

  onPetClick() {
    console.log('onCatClick', this.pet);
    this.pet?.pet();
  }

  ngOnInit(): void {
    console.log('ngOnInit');
    console.log(this.route.data);
    console.log('====================================');
  }

  ngDoCheck() {
    console.log('ngDoCheck');
    console.log('changes', this);
  }

  constructor(private route: ActivatedRoute, private petService: PetService) {
    console.log('constructor petInfo', this.petInfo);
    this.route.data.subscribe((data) => {
      console.log('====================================');
      console.log('data', data);
      console.log('====================================');
      this.petInfo = data['petInfo'];
    });
    this.pet = this.petService.assignPet({
      name: this.petInfo?.name,
      img: this.petInfo?.img
    })
  }
}
