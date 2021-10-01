import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-avatar-image',
  templateUrl: './avatar-image.component.html',
  styleUrls: ['./avatar-image.component.css']
})
export class AvatarImageComponent implements OnInit {

  @Input() avatar: string;
  @Input() height: number = 40;
  @Input() width: number = 40;
  @Input() rounded: boolean = true;
  @Input() border: boolean = false;
  @Input() color: string;
  @Input() borderStroke: number;
  @Input() dropShadow: boolean = false;
  @Input() username: string;
  @Input() hiddenSecret: boolean = false;
  @Input() secondSquare: boolean = true;

  constructor(private _router : Router) { }

  ngOnInit(): void {
  }

  navigateToTheOtherSide()
  {
    if(this.hiddenSecret)
      this._router.navigateByUrl(`/user/${this.username}`)
  }

}
