import { TestBed } from '@angular/core/testing';

import { NewsService } from './news.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { APIResponse } from '../model/interface/apiResponse';
import { environment } from '../../environments/environment.development';
import { news } from '../model/class/news';

describe('NewsService', () => {
  let service: NewsService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NewsService],
    });
    service = TestBed.inject(NewsService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify();
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  // describe('getAllNews', () => {
  //   it('should fetch all news', () => {
  //     const mockResponse: APIResponse = {
  //       code: 1000,
  //       result: [{ id: 1, title: 'Test News' }],
  //       message: '',
  //     };

  //     service.getAllNews().subscribe((res) => {
  //       expect(res).toEqual(mockResponse);
  //     });

  //     const req = httpMock.expectOne(environment.API_URL + 'news');
  //     expect(req.request.method).toBe('GET');
  //     req.flush(mockResponse);
  //   });
  // });

  describe('createNews', () => {
    it('should create a news item', () => {
      const mockNews: news = { news_id: 1, news_title: 'New News', news_content : 'New Content', news_img : '', news_author : 'Quy' };
      const mockResponse: APIResponse = {
        code: 1000,
        result: mockNews,
        message: '',
      };

      service.createNews(mockNews).subscribe((res) => {
        expect(res).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(environment.API_URL + 'news/create');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(mockNews);
      req.flush(mockResponse);
    });
  });

  describe('updateNews', () => {
    it('should update a news item', () => {
      const mockNews: news = { news_id: 1, news_title: 'New News', news_content : 'New Content', news_img : '', news_author : 'Quy' };
      const mockResponse: APIResponse = {
        code: 1000,
        result: mockNews,
        message: '',
      };

      service.updateNews(mockNews, 1).subscribe((res) => {
        expect(res).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(environment.API_URL + 'news/update/1');
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(mockNews);
      req.flush(mockResponse);
    });
  });

  describe('deleteNews', () => {
    it('should delete a news item', () => {
      const mockResponse: APIResponse = {
        code: 1000,
        result: null,
        message: '',
      };

      service.deleteNews(1).subscribe((res) => {
        expect(res).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(environment.API_URL + 'news/delete/1');
      expect(req.request.method).toBe('DELETE');
      req.flush(mockResponse);
    });
  });

  describe('searchNews', () => {
    it('should search for news by title', () => {
      const mockResponse: APIResponse = {
        code: 1000,
        result: [{ news_id: 1, news_title: 'New Titles', news_content : 'New Content', news_img : '', news_author : 'Quy' }],
        message: '',
      };

      service.searchNews('New%Titles').subscribe((res) => {
        expect(res).toEqual(mockResponse);
      });
      const req = httpMock.expectOne(environment.API_URL + 'news/findnews?title=New%Titles');
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });
});
