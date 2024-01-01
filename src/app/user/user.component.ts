import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from '../../models/user.class';
import { CollectionReference, DocumentData, Firestore, collection, collectionData, doc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {
  user = new User();
  allUsers: any = Observable<any>;

  constructor(public dialog: MatDialog, private firestore: Firestore) {
    this.ngOnInit();
  }

  ngOnInit() {
    const collectionInstance = collection(this.firestore, 'users');
    collectionData(collectionInstance, { idField: 'id' })
      .subscribe(value => {
        console.log('Received changes from DB:', value);
      })

    this.allUsers = collectionData(collectionInstance, { idField: 'id' });
  }

  updateId(id: string) {
    const docInstance = doc(this.firestore,'users', id);
    const updateId = {
      name: 'updatedName'
    }

    updateDoc(docInstance, updateId)
    .then(() => {
      console.log('Id');  
    })
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }
}

