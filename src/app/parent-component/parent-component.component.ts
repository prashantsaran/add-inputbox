import { Component, QueryList, ViewChildren, inject } from '@angular/core';
import { ChildComponentComponent } from '../child-component/child-component.component';
import { DetailsServiceService } from '../service/details-service.service';

@Component({
  selector: 'app-parent-component',
  templateUrl: './parent-component.component.html',
  styleUrls: ['./parent-component.component.css']
})
export class ParentComponentComponent {

  @ViewChildren(ChildComponentComponent) childComponents!: QueryList<any>;
  detailsService: DetailsServiceService = inject(DetailsServiceService);
  
  components: any[] = [{}];
  message: string = '';
  show: boolean = true;
  hi: boolean = true;

  addComponent() {
    // Method to add a new child component to the components array
    this.components.push({});
  }

  saveDetails() {
    // Method to save details from child components
    this.childComponents.forEach(childComponent => {
      const childDetails = childComponent.getDetails(); // Get details from each child component

   

   

      //  postDetails is an Observable, subscribe to it to receive the response
      this.detailsService.postDetails.subscribe((response: any) => {
        if (response.status === 200 && this.show) {
          this.show = true;
        }
        // console.log(response); // Log the response (assuming necessary)
      });
    });
  }
}
