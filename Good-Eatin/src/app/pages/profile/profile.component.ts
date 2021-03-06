import { Component, OnInit } from '@angular/core';
import {User} from '../../classes/user';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { FileUpload, UploadService } from '../../services/upload.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    currentUser: User;
    targetUser: User;
    file: FileUpload;
    isCurrentUser: boolean;
    userRef: AngularFirestoreCollection<User>;

  constructor(private upload: UploadService, private db: AngularFirestore, private router: Router) {
      this.currentUser = new User();
      this.targetUser = new User();
      this.userRef = db.collection('users');
      this.currentUser.id = localStorage.getItem('userId');
      this.targetUser.id = localStorage.getItem('targetUserId');
      if (this.targetUser.id == null) {
          this.targetUser.id = this.currentUser.id;
      }
      if (this.currentUser.id === this.targetUser.id) {
          this.isCurrentUser = true;
      } else {
          this.isCurrentUser = false;
      }
      this.userRef.doc(this.targetUser.id).ref.get().then( doc => {
        this.targetUser.name = doc.data().name;
        this.targetUser.picture = doc.data().picture;
        this.targetUser.recipes = doc.data().recipes;
        this.targetUser.friends = doc.data().freinds;
        this.targetUser.weeks = doc.data().weeks;
      });

  }

  addPic(e) {
      e.preventDefault();
      const file = e.srcElement.files[0];
      this.file = new FileUpload(file);
      this.upload.pushFileToStorage(this.file, null, 'user', this.currentUser);
  }


  ngOnInit() {
  }

}
