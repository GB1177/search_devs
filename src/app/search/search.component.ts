import { SearchService } from '../shared/search.service';
import { User } from '../models/user.model';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  username!: string;
  user!: User;
  user$!: Observable<User>;

  constructor(private searchService: SearchService) { }

  ngOnInit() {
  }

  search(username: string) {
    this.searchService.getUser(username).subscribe(resposta => {
      this.user$ = resposta;
    })
    
  }

  errorValidName(){
    if(this.user.invalid){
      return 'Usuário não encontrado!'
    }
    return false;
  }
}
