import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NewsService } from '../services/news.service';
import { APIResponse } from '../model/interface/apiResponse';
import { news } from '../model/class/news';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search-tab',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './search-tab.component.html',
  styleUrl: './search-tab.component.css'
})
export class SearchTabComponent implements OnInit{
  route = inject(ActivatedRoute)
  router = inject(Router)
  currentPage :number = 0
  totalPages : number = 0
  pageSize : number = 10
  newsService = inject(NewsService)
  searchKey : string  = ''
  category : string = ''
  newsList : news[] = []
  categories : string[] = []
  searchKeysList : string[] = []
  ngOnInit(): void {
    this.loadCategory()
    this.route.queryParams.subscribe(params =>{
      this.searchKey = params['content'] || '';
      this.searchNews()
    })
    const searchKeys = JSON.parse(sessionStorage.getItem("searchKeys") || '[]')
    this.searchKeysList = searchKeys
  }
  onChangeParams(){
    this.router.navigate(['/search'], { queryParams: { content: this.searchKey } });
  }
  searchNews(){
    if(this.searchKey != ''){
      this.newsService.findNews(this.category,this.searchKey,this.currentPage,this.pageSize).subscribe((res : APIResponse) =>{
        this.newsList = res.result.content
        this.totalPages = res.result.totalPages
        this.currentPage = 0
      })
    const searchKeys = JSON.parse(sessionStorage.getItem("searchKeys") || '[]')
    this.searchKeysList = searchKeys
      if(this.searchKeysList.includes(this.searchKey)){

      }
      else{
        this.searchKeysList.push(this.searchKey)
        console.log(this.searchKeysList.toString())
        sessionStorage.setItem("searchKeys",JSON.stringify(this.searchKeysList))
      }
      
    }
  }
  loadCategory(){
    this.newsService.getCategory().subscribe((res:APIResponse) =>{
        this.categories = res.result
    })
  }
  changePage(page : number){
    this.currentPage = page
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.searchNews()
  }
  onInputChange(){

  }
  onReset(){
    this.searchKey = ''
  }
}
