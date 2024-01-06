import { Component, OnInit, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from '../../models/user.class';
import { Firestore, addDoc, collection, doc, updateDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrl: './dialog-edit-user.component.scss'
})
export class DialogEditUserComponent implements OnInit {
  firestore: Firestore = inject(Firestore);
  loading = false;
  user: User = new User();
  userID!: string;
  dateOfBirth!: Date;

  constructor(public dialogRef: MatDialogRef<DialogEditUserComponent>) { }

  ngOnInit() {

  }

  // async saveUser() {
  //   if (this.user) {
  //     this.loading = true;
  //     const userDocRef = doc(this.firestore, 'users', this.userID);
  //     const userUpdateData = {
  //       ...this.user.toJSON(),
  //     };
  //     await updateDoc(userDocRef, userUpdateData) 
  //     this.loading = false;
  //     this.dialogRef.close();
  //   } else {
  //     console.error('Error updating user:');
  //   }
  // }

  async saveUser(){
    this.loading = true;
    await updateDoc(this.getSingleRef(), JSON.parse(JSON.stringify(this.user))).then(() =>{this.loading = false; this.dialogRef.close()});
  }

  getSingleRef(){
    return doc(collection(this.firestore, 'users'),this.user.id);
  }
}
