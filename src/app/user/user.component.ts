import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from '../../models/user.class';
import { Firestore, collection, onSnapshot, doc, collectionData, updateDoc, DocumentData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {
  firestore: Firestore = inject(Firestore);
  user = new User();
  userID: any;
  allUsers: any = Observable<any>;
  // allUsers$;
  // users;
//   userList: any = [];
// unsubList;
// unsubSingle;

  constructor(public dialog: MatDialog, private route: ActivatedRoute) {
    // this.unsubList = onSnapshot(this.getUserRef(), (list) => {
    //   list.forEach(element => {
    //     console.log(this.setUserObject(element.data(), element.id));
    //   });
    // });

    // this.unsubSingle = onSnapshot(this.getSingleDocRef('users'), (element)  =>{
    // });

    
    // this.unsubSingle();

    // this.allUsers$ = collectionData(this.getUserRef());
    // this.users = this.allUsers$.subscribe( (list) => {
    //   list.forEach(element => {
    //     console.log(element);
        
    //   });
    // })
   
  }

  // ngonDestroy() {
  //   this.unsubList();
  //   this.users.unsubscribe();
  // }

  // getUserRef() {
  //   return collection(this.firestore, 'users')
  // }
  // getSingleDocRef(docId: string){
  //   return doc(collection(this.firestore, 'users'), docId);
  // }
  // setUserObject(obj:any, id:string) {
  //   return {
  //     id: id || "",
  //     firstName: obj.firstName || "",
  //     lastName: obj.lastName || "",
  //     birthDate: obj.birthDate || "",
  //     street: obj.street || "",
  //     zipCode: obj.zipCode || "",
  //     city: obj.city || "",
  //     email: obj.email || "",
  //   }
  // }

  ngOnInit() {
    const colInstance = collection(this.firestore, 'users');
    collectionData(colInstance, { idField: 'id' })
    .subscribe(value => {
      console.log('Received changes from DB:', value);
      // value.forEach(doc => {
      //   const id = doc.id;
      //   // const userData = doc.data(); // Zugriff auf die Benutzerdaten
      //   // // Füge hier deine Logik hinzu, um mit den IDs und Daten zu arbeiten
      // });
    });
  
    this.allUsers = collectionData(colInstance, { idField: 'id' });    
  }
  

  updateId(id: string) {
    const docInstance = doc(this.firestore,'users', id);
    const updateData = {
      name: 'updatedName'
    };
  
    updateDoc(docInstance, updateData)
      .then(() => {
        console.log('Id', id, 'updated successfully');  
      })
      .catch(error => {
        console.error('Error updating ID:', id, error);
      });
  }
  

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }
}


