import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from '../../models/user.class';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-dialog-edit-address',
  templateUrl: './dialog-edit-address.component.html',
  styleUrl: './dialog-edit-address.component.scss'
})
export class DialogEditAddressComponent {
  firestore: Firestore = inject(Firestore);
  user!: User;
  loading = false;
  userID!: string;

  constructor(public dialogRef: MatDialogRef<DialogEditAddressComponent>) { }

  async saveUser() {
    try {
      this.loading = true;
      const userDocRef = doc(this.firestore, 'users', this.userID);
      const userUpdateData = {
        ...this.user.toJSON(),
      };
      await updateDoc(userDocRef, userUpdateData)
      this.loading = false;
      this.dialogRef.close();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  }
}
