import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Details } from '../interface/details';
import { DetailsServiceService } from '../service/details-service.service';

@Component({
  selector: 'app-child-component',
  templateUrl: './child-component.component.html',
  styleUrls: ['./child-component.component.css']
})
export class ChildComponentComponent {
  detailsService: DetailsServiceService;

  validType = false; // Flag to track overall form validity
  myForm = new FormGroup({
    phone: new FormControl('', [Validators.required, Validators.minLength(10)]), // FormControl for phone input
    email: new FormControl('', [Validators.required, Validators.email]), // FormControl for email input
    name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]), // FormControl for name input
    selectedType: new FormControl(''), // FormControl for type selection
  });

  selectedType = ''; // Currently selected type
  info = ''; // Information based on the selected type
  details: Details = {} as Details; // Details object to store form data

  constructor(detailsService: DetailsServiceService) {
    this.detailsService = detailsService; // Injecting DetailsServiceService
  }

  get phone(): FormControl {
    return this.myForm.get('phone') as FormControl; // Getter for phone FormControl
  }

  get email(): FormControl {
    return this.myForm.get('email') as FormControl; // Getter for email FormControl
  }

  get name(): FormControl {
    return this.myForm.get('name') as FormControl; // Getter for name FormControl
  }

  getDetails(): Details {
    if (this.myForm.value.selectedType === 'email') {
      this.info = this.myForm.value.email!; // Get email value if selected type is 'email'
    } else {
      this.info = this.myForm.value.phone!; // Get phone value if selected type is 'phone'
    }

    const details: Details = {
      info: this.info,
      name: this.myForm.value.name,
      type: this.myForm.value.selectedType,
    };

    return details; // Return the details object
  }

  onChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedType = target.value; // Update selectedType when the type selection changes
  }

  isValid(): boolean {
    const validation = {
      emailValid: this.email?.valid,
      nameValid: this.name?.valid,
      phoneValid: this.phone?.valid,
    };

    this.validType = validation.emailValid || validation.phoneValid; // Update validType based on email and phone validity
    return this.validType && validation.nameValid; // Form is valid if validType is true and name is valid
  }
}
