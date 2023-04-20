import { NgModule } from '@angular/core';
import { RouterModule, ROUTES, Routes } from '@angular/router';
import { Pet, PetService } from './pet.service';
import { PetComponent } from './pet/pet.component';
import { PetCreatorComponent } from './pet-creator/pet-creator.component';

const standardRoutes: Routes = [
  {
    path: 'pet-creator',
    component: PetCreatorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot([])],
  exports: [RouterModule],
  providers: [
    {
      provide: ROUTES,
      useFactory: () => {
        let routes: Routes = [];
        if (localStorage['pets']) {
          const pets = JSON.parse(localStorage['pets']);
          console.log('====================================');
          console.log('localStorage', pets);
          console.log('====================================');
          pets.map((pet: Pet) =>
            routes.push({
              path: pet.id + '',
              component: PetComponent,
              data: {
                petInfo: {
                  ...pet,
                },
              },
            })
          );
        }
        return [...routes, ...standardRoutes];
      },
      multi: true,
    },
  ],
})
export class AppRoutingModule {
  constructor(private petService: PetService) {
    this.petService.assignPet({
      name: 'Dog',
      img: 'https://i.pinimg.com/564x/f9/5b/94/f95b9436a26f4bab713305a019120317.jpg',
    });
    this.petService.assignPet({
      name: 'Cat',
      img: 'https://i.pinimg.com/564x/bd/40/1b/bd401b3a0b2b0e3a4fc113752c5ad4d7.jpg',
    });
  }
}
