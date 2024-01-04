import { Component, OnInit, inject } from '@angular/core';
import { Firestore, collection, doc, getDoc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user.class';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent implements OnInit {
  firestore: Firestore = inject(Firestore);
  userID:any;
  user: User = new User();

  constructor(private route: ActivatedRoute) {
    // this.route.paramMap.subscribe(paramMap => {
    //   this.userID = paramMap.get('id');
    //   console.log('Show Id', this.userID);
      
    // })
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
}




