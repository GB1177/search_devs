import { Repository } from './../models/repository.model';
import { User } from './../models/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from './../shared/search.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  username = '';

  user!: User;
  repository: Repository[] = [];

  constructor(
    private searchService: SearchService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.username = this.route.snapshot.paramMap.get('username')!;
    this.getUser();
    this.getRepository();
  }

  getUser() {
    this.searchService.getUser(this.username).subscribe(response => {
      this.user = response;
    })
  }

  getRepository() {
    this.searchService.getRepository(this.username).subscribe(response => {
      this.repository = response;
      this.repository.sort((a, b) => {
        if (a.stargazers_count > b.stargazers_count) {
          return -1;
        }
        if (a.stargazers_count < b.stargazers_count) {
          return 1;
        }
        return 0;
      });

    })
  }

  getUpdatedAtInDays(updatedAt: String): Number {
    let dataString = updatedAt.substring(0, 10);

    const specificDate = new Date(dataString);

    const today = new Date();
    const differenceInTime = today.getTime() - specificDate.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);

    return Math.round(differenceInDays);
  }

  concatHref(twitterId: String) {
    const url = 'https://twitter.com/' + twitterId;
    console.log(url);
    
    window.open(url, '_blank');
  }

}
