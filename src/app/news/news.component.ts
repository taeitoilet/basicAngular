import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { news } from '../model/class/news';
import { NewsService } from '../services/news.service';
import { APIResponse } from '../model/interface/apiResponse';
declare var bootstrap: any; 
@Component({
  selector: 'app-news',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent implements OnInit {
  currentPage: number = 0;
  totalPages: number = 0;
  pageSize: number = 5;
  newsList : news[] = []
  newsObj : news = new news()
  newsResult : news[] = []
  title : string  = ''
  newsService = inject(NewsService)
  
  ngOnInit(): void {
    this.loadNews()
  }
  loadNews() {
    this.newsService.getAllNews(this.currentPage, this.pageSize).subscribe((res: APIResponse) => {
      this.newsList = res.result.content
      this.totalPages = res.result.totalPages
    })
  }
  changePage(page: number) {
    this.currentPage = page;
    this.loadNews();
  }
  onSave() {
    this.newsService.createNews(this.newsObj).subscribe((res: APIResponse) => {
      if (res.code == 1000) {
        alert("Create successfull")
        this.loadNews()
        const modalElement = document.getElementById('createNew');
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        modalInstance.hide(); 
      } else {
        alert(res.message)
      }
    })
  }

  onDelete(id: number) {
    const isDelete = confirm("Do you want delete this ? ")
    if (isDelete) {
      this.newsService.deleteNews(id).subscribe((res: APIResponse) => {
        if (res.code == 1000) {
          alert("Delete successfull")
          this.loadNews()
        } else {
          alert(res.message)
        }
      })
    }

  }
  onUpdate(id: number) {
    this.newsService.updateNews(this.newsObj, id).subscribe((res: APIResponse) => {
      if (res.code == 1000) {
        alert("Update successfull")
        this.loadNews()
        const modalElement = document.getElementById('editNew');
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        modalInstance.hide();
      } else {
        alert(res.message)
      }
    })
  }
  onEdit(data: news) {
    this.newsObj = data
  }
  onSearch(title : string) {
    this.newsService.searchNews(title).subscribe((res: APIResponse) => {
      if (res.code == 1000) {
        this.newsList = res.result
        if(res.result == null){
          alert("New not found")
          this.loadNews()
        }
      } else {
        alert(res.message)
      }
    })
  }
  onReset(){
    this.newsObj = new news()
  }
}
