import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsComponent } from './news.component';
import { provideRouter } from '@angular/router';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { NewsService } from '../services/news.service';
import { APIResponse } from '../model/interface/apiResponse';
import { of } from 'rxjs';
import { news } from '../model/class/news';

describe('NewsComponent', () => {
  let component: NewsComponent;
  let fixture: ComponentFixture<NewsComponent>;
  let httpTestingController: HttpTestingController;
  let mockService : jasmine.SpyObj<NewsService>
  
  beforeEach(async () => {
    const spy = jasmine.createSpyObj('NewsService', [
      'getAllNews',
      'createNews',
      'updateNews',
      'deleteNews',
      'searchNews'
    ]);
    spy.getAllNews.and.returnValue(
      of({
        code: 1000,
        message : '',
        result: { content: [{ news_id : 1, news_title : 'abc', news_author: 'abc', news_content : 'abc', news_img : 'abc'  }] }
      })
    );
    
    await TestBed.configureTestingModule({
      imports: [NewsComponent],
      
      providers: [{ provide: NewsService, useValue: spy },provideHttpClientTesting()]
    })
    .compileComponents();

    

    fixture = TestBed.createComponent(NewsComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
    mockService = TestBed.inject(NewsService) as jasmine.SpyObj<NewsService>
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('loadNews',()=>{
    it('should return a news list',()=>{
      
      // component.newsList = [{ news_id : 1, news_title : 'abc', news_author: 'abc', news_content : 'abc', news_img : 'abc'}]
      const mockResponse: APIResponse = {
        code: 1000,
        result: { content: [{ news_id : 1, news_title : 'abc', news_author: 'abc', news_content : 'abc', news_img : 'abc' }] },
        message : ''
      };
      mockService.getAllNews.and.returnValue(of(mockResponse))
      component.loadNews()
      expect(mockService.getAllNews).toHaveBeenCalled();
      expect(component.newsList.length).toBe(1);
    })
  })
  describe("onSave",()=>{
    it('should create news on success', () => {
  
      const mockResponse: APIResponse = { code: 1000, result: {news_id : 1, news_title : 'abc', news_author: 'abc', news_content : 'abc', news_img : 'abc'}, message: '' };
      const mockObj : news = {news_id : 1, news_title : 'abc', news_author: 'abc', news_content : 'abc', news_img : 'abc'}
      mockService.createNews.and.returnValue(of(mockResponse));
      component.newsObj = mockObj;
      component.onSave();

      expect(mockService.createNews).toHaveBeenCalled();
      expect(mockService.createNews).toHaveBeenCalledWith(component.newsObj);
    });
    it('should create news on failure', ()=>{
      const mockResponse: APIResponse = { code: 200, result: null, message: 'Error' };
      mockService.createNews.and.returnValue(of(mockResponse));
      spyOn(window, 'alert');
      component.onSave();
      expect(window.alert).toHaveBeenCalledWith('Error');
    })
  })
  describe("onDelete",()=>{
    it("should delete on success",()=>{
      spyOn(window, 'confirm').and.returnValue(true); 
      const id : number = 1
      const mockResponse: APIResponse = { code: 1000, result: '', message: '' };
      mockService.deleteNews.and.returnValue(of(mockResponse))

      spyOn(window,"alert")
      component.onDelete(id)
      expect(window.alert).toHaveBeenCalledWith('Delete successfull')
    })
    it("should delete on failure",()=>{
      spyOn(window, 'confirm').and.returnValue(false); 
      const id : number = 1
      const mockResponse: APIResponse = { code: 1000, result: '', message: '' };
      mockService.deleteNews.and.returnValue(of(mockResponse))

      spyOn(window,"alert")
      component.onDelete(id)
      expect(window.alert).not.toHaveBeenCalled()
    })
  })
  describe("onUpdate",()=>{
    it('should update news on success', () => {
  
      const mockResponse: APIResponse = { code: 1000, result: {news_id : 1, news_title : 'abc', news_author: 'abc', news_content : 'abc', news_img : 'abc'}, message: '' };
      const mockObj : news = {news_id : 1, news_title : 'abc', news_author: 'abc', news_content : 'abc', news_img : 'abc'}
      mockService.updateNews.and.returnValue(of(mockResponse));
      component.newsObj = mockObj;
      spyOn(window,"alert")
      component.onUpdate(1);
      expect(mockService.updateNews).toHaveBeenCalledWith(component.newsObj, 1);
    });
    it('should update news on failure', ()=>{
      const mockResponse: APIResponse = { code: 2000, result: null, message: 'Error' };
      mockService.updateNews.and.returnValue(of(mockResponse));
      spyOn(window, 'alert');
      component.onUpdate(1);
      expect(window.alert).toHaveBeenCalledWith('Error');
    })
  })
  describe("onSearch",()=>{
    it("should return a new list ",()=>{
      const mockResponse: APIResponse = { code: 1000, result: {news_id : 1, news_title : 'abc', news_author: 'abc', news_content : 'abc', news_img : 'abc'}, message: '' };
      mockService.searchNews.and.returnValue(of(mockResponse))
      component.onSearch('abc')

    })
    it('should reload news if search result is null', () => {
      const mockResponse: APIResponse = { code: 1000, result: null, message: '' };
      mockService.searchNews.and.returnValue(of(mockResponse));

      spyOn(window, 'alert');
      spyOn(component, 'loadNews');
      component.onSearch('abc');

      expect(window.alert).toHaveBeenCalledWith('New not found');
      expect(component.loadNews).toHaveBeenCalled();
    });
  })
});
