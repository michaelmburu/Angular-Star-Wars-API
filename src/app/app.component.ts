import { Component, OnInit } from '@angular/core';
import {StarWarsService} from './star-wars.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'starwars';
  swService: StarWarsService;

  constructor(_swService:StarWarsService){
    this.swService = _swService;
  }
  ngOnInit(){
    this.swService.fetchCharacters();
  }
}
