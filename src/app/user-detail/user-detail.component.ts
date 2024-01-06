import { Component, OnInit, inject } from '@angular/core';
import { Firestore, collection, doc, getDoc, onSnapshot } from '@angular/fire/firestore';
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
  userID!: any;
  user: User = new User();
  userList;


  constructor(public dialog: MatDialog, private route: ActivatedRoute) {
    this.userID = this.route.snapshot.paramMap.get('id');
    this.userList = this.getUserFromFirebase();
  }

ngOnInit(){}

  ngOnDestroy() {
    this.userList();
  }


  getSingleRef() {
    return doc(collection(this.firestore, 'users'), this.userID);
  }


  getUserFromFirebase() {
    return onSnapshot(this.getSingleRef(), (element) => {
      this.user = new User(element.data());
      this.user.id = this.userID;
    });
  }

  // ngOnInit() {
  //   this.userID = this.route.snapshot.paramMap.get('id');
  //   console.log('show id', this.userID);

  //   if (this.userID) {
  //     this.getUser(this.userID);
  //   }

  // }

  // getUser(userID: string) {
  //   const userDocRef = doc(this.firestore, 'users', this.userID);

  //   getDoc(userDocRef)
  //     .then((docSnapshot) => {
  //       const userData = docSnapshot.exists() ? { userID: docSnapshot.id, ...docSnapshot.data() } : null;
  //       if (userData) {
  //         this.user = new User(userData);
  //         console.log('User Data:', this.user);
  //       }
  //     })
  // }

  editAddress() {
    const dialog = this.dialog.open(DialogEditAddressComponent);
    dialog.componentInstance.user = new User(this.user.toJSON());
    dialog.componentInstance.userID = this.userID;
  }


  editUser() {
    const dialog = this.dialog.open(DialogEditUserComponent);
    dialog.componentInstance.user = new User(this.user.toJSON());
    dialog.componentInstance.userID = this.userID;
  }
}