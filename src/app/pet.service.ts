import { Injectable, OnChanges, SimpleChanges, DoCheck } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { HashService } from './hash.service';

export interface Pet {
  id: number;
  name: string;
  img: string;
  petCount: number;
  pet: () => void;
}

@Injectable({
  providedIn: 'root',
})
export class PetService implements DoCheck {
  pets: Array<Pet> = localStorage['pets']
    ? this.addPetFunction(JSON.parse(localStorage['pets']))
    : [];
  petsChange: Subject<Array<Pet>> = new Subject<Array<Pet>>();

  assignPet(pet: Omit<Pet, 'pet' | 'id' | 'petCount'>) {
    const newId = this.hashService.hashCode(pet.name + pet.img);
    const oldPet = this.findPetByIndex(newId);
    if (!oldPet) {
      console.log('====================================');
      console.log('ASSIGN');
      console.log('====================================');

      this.pets.push({
        ...pet,
        pet: () => this.pet(newId),
        petCount: 0,
        id: newId,
      });
      this.petsChange.next(this.pets);
      return this.findPetByIndex(newId);
    }

    return oldPet;
  }

  pet(id: number) {
    /* this.petInfo.petCount++;
    this.petCountChange.next(this.petCount+1);
    console.log('pet2', this.petCount);*/
    const pet = this.findPetByIndex(id);
    if (pet) {
      pet.petCount++;
    }

    this.petsChange.next(this.pets);
  }

  addPetFunction(pets: Array<Omit<Pet, 'pet'>>): Array<Pet> {
    console.log('1', pets);
    const petsWithPetFunction: Array<Pet> = [];
    for (const pet of pets) {
      petsWithPetFunction.push({ ...pet, pet: () => this.pet(pet.id) });
    }
    return petsWithPetFunction;
  }

  findPetByIndex(petIndex: number): Pet | undefined {
    return this.pets.find((pet) => pet.id === petIndex);
  }

ngDoCheck(): void {
  console.log('====================================');
  console.log('ngDoCheck');
  console.log('====================================');
  localStorage.setItem('pets', JSON.stringify(this.pets));
}

  constructor(private hashService: HashService) {
    //this.hash = this.hashService;
    /*this.petCountChange.subscribe((value) => {
      console.log('changes', value);
      console.log('====================================');
      
      localStorage.setItem("petCount", value.toString());
        this.petCount = value
    });*/
    this.petsChange.subscribe((pets) => {
      console.log('====================================');
      console.log('pets', pets);
      console.log('pets', JSON.stringify({ ...pets }));
      console.log('====================================');
      localStorage.setItem('pets', JSON.stringify(pets));
    });
  }
}
