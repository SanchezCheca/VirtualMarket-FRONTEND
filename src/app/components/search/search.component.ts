import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchForm: FormGroup;


  constructor(private searchService: SearchService, private formBuilder: FormBuilder) {
    this.searchForm = this.formBuilder.group({
      search: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

}
