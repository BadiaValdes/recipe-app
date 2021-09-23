import { Component, OnInit, Input } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

}
