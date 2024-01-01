import { Component, inject } from '@angular/core';
import { User } from '../../models/user.class';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss'
})
export class DialogAddUserComponent {
  user = new User();
  birthDate!: Date;
  loading = false;

  constructor(private firestore: Firestore, public dialogRef: MatDialogRef<DialogAddUserComponent>) {

  }

  saveUser() {
    this.user.birthDate = this.birthDate.getTime();
    this.loading = true;
    const collectionInstance = collection(this.firestore, 'users');
    addDoc(collectionInstance, this.user.toJSON()).then(() => {
      this.loading = false;
      console.log('Current User is', this.user);
      this.dialogRef.close();
    })
  }
}

