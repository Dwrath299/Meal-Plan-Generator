import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth.Service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    @Input() title: string;
  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

}
