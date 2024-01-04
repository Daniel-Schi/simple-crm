import { Component, OnInit, inject } from '@angular/core';
import { Firestore, collection, doc, getDoc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user.class';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent implements OnInit {
  firestore: Firestore = inject(Firestore);
  userID: any;
  user: User = new User();

  constructor(public dialog: MatDialog, private route: ActivatedRoute) {
  }


  ngOnInit() {
    this.userID = this.route.snapshot.paramMap.get('id');
    console.log('show id', this.userID);
    this.getUser();
  }

  getUser() {
    const userDocRef = doc(this.firestore, 'users', this.userID);

    getDoc(userDocRef)
      .then((docSnapshot) => {
        const userData = docSnapshot.exists() ? { userID: docSnapshot.id, ...docSnapshot.data() } : null;
        if (userData) {
          this.user = new User(userData);
          console.log('User Data:', this.user);
        }
      })
  }

  editAddress() {
    const dialog = this.dialog.open(DialogEditAddressComponent);
    dialog.componentInstance.user = new User(this.user);
  }

  editUser() {
    this.dialog.open(DialogEditUserComponent);
  }
}