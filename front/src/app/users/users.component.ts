import { Component, OnInit } from '@angular/core';
import { ClubService } from '../services/club.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  clubData: any;
  showPassword = false;

 

  constructor(private clubService: ClubService) { }

  ngOnInit(): void {
    this.getClubData();
  }
 
  

  getClubData(): void {
    this.clubService.getClubData().subscribe((response: any) => {
      if (response.success && response.data.length > 0) {
        this.clubData = response.data[0];
      } else {
        console.error('Error fetching club data: Empty or invalid data.');
      }
    }, (error) => {
      console.error('Error fetching club data:', error);
    });
  }


onSave(): void {
  const userId = this.clubData._id;
  const updates = {
    fullName: this.clubData.fullName,
    email: this.clubData.email,
    password: this.clubData.password,
    dateCreation: this.clubData.dateCreation,
    establishment: this.clubData.establishment,
    category: this.clubData.category,
    country: this.clubData.country,
    workField: this.clubData.workFiled,
    canJoin: this.clubData.canJoin,
    description: this.clubData.description
  };

  this.clubService.updateClubData(userId, updates).subscribe((response: any) => {
    console.log('User data updated successfully:', response);
    window.alert('user updated successfully');
  }, (error) => {
    console.error('Error updating user data:', error);
  });

}
  onEditClick(event: MouseEvent): void {
    const imgElement = event.target as HTMLElement;
    const inputElement = imgElement.parentElement?.querySelector('input, textarea') as HTMLInputElement | HTMLTextAreaElement;
    if (inputElement) {
      inputElement.readOnly = !inputElement.readOnly;
      if (!inputElement.readOnly) {
        inputElement.focus();
      }
    }
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }


}