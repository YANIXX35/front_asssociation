import { Component } from '@angular/core';
import { BureauNav } from '../bureau-nav/bureau-nav';

@Component({
  selector: 'app-finances',
  imports: [BureauNav],
  templateUrl: './finances.html',
  styleUrl: './finances.scss',
})
export class Finances {}
