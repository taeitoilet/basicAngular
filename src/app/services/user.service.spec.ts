import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { APIResponse } from '../model/interface/apiResponse';
import { environment } from '../../environments/environment.development';
import { userCreateRequest, userUpdateRequest } from '../model/class/user';
import { role } from '../model/class/role';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify();
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  // describe('getAllUser', () => {
  //   it('should fetch all users', () => {
  //     const mockResponse: APIResponse = {
  //       code: 1000,
  //       result: [{ user_id: 1,user_name : 'admin', user_password : 'admin' }],
  //       message: '',
  //     };
  
  //     service.getAllUser().subscribe((res) => {
  //       expect(res).toEqual(mockResponse);
  //     });
  
  //     const req = httpMock.expectOne(environment.API_URL + 'user');
  //     expect(req.request.method).toBe('GET');
  //     req.flush(mockResponse);
  //   });
  // });

  describe('createUser', () => {
    it('should create a user', () => {
      const mockRequest: userCreateRequest = {
        role_id: 1,
        user_name : 'admin',
        user_password: '123456',
        user_fullname: 'abc',
        user_email: 'abc@xyz.com',
        user_phone: '1234567890',
        user_address: 'abc',
        user_citizen_identification: '123456789',
        user_dob: '1990-01-01',
        
      };
      const role : role = {role_id : 1, role_name : 'Admin'}
      const mockResponse: APIResponse = {
        code: 1000,
       
        result:  {
          user_id: 1,
          user_name : 'admin', 
          user_password : '123456', 
          role : role,
          user_fullname: 'abc',
          user_email: 'abc@xyz.com',
          user_phone: '1234567890',
          user_address: 'abc',
          user_citizen_identification: '123456789',
          user_dob: '1990-01-01',
          user_money: 500,},
        message: '',
      };
  
      service.createUser(mockRequest).subscribe((res) => {
        expect(res).toEqual(mockResponse);
      });
  
      const req = httpMock.expectOne(environment.API_URL + 'user/create');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(mockRequest); 
      req.flush(mockResponse);
    });
  });

  describe('updateNews', () => {
    it('should update a user', () => {
      const mockRequest: userUpdateRequest = {
        role_id: 1,
        user_password: '123456',
        user_fullname: 'abc',
        user_email: 'abc@xyz.com',
        user_phone: '1234567890',
        user_address: 'abc',
        user_citizen_identification: '123456789',
        user_dob: '1990-01-01',
        user_money: 500,
      };
      const id = 1;
      const mockResponse: APIResponse = {
        code: 1000,
        result: { 
          user_id: 1,
          user_name : 'admin', 
          user_password : '123456', 
          role,
          user_fullname: 'Jane Doe',
          user_email: 'jane.doe@example.com',
          user_phone: '1234567890',
          user_address: '123 Main St',
          user_citizen_identification: '123456789',
          user_dob: '1990-01-01',
          user_money: 500,
        },
        message: '',
      };
  
      service.updateUser(mockRequest, id).subscribe((res) => {
        expect(res).toEqual(mockResponse);
      });
  
      const req = httpMock.expectOne(environment.API_URL + 'user/update/' + id);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(mockRequest);
      req.flush(mockResponse);
    });
  });

  // describe('deleteNews', () => {
  //   it('should delete a news item', () => {
  //     const mockResponse: APIResponse = {
  //       code: 1000,
  //       result: null,
  //       message: '',
  //     };

  //     service.deleteNews(1).subscribe((res) => {
  //       expect(res).toEqual(mockResponse);
  //     });

  //     const req = httpMock.expectOne(environment.API_URL + 'news/delete/1');
  //     expect(req.request.method).toBe('DELETE');
  //     req.flush(mockResponse);
  //   });
  // });

  describe('searchNews', () => {
    it('should find a user by username', () => {
      const user_name = 'testUser';
      const mockResponse: APIResponse = {
        code: 1000,
        result: [{ user_id: 1, user_fullname: 'Test User' }],
        message: '',
      };
  
      service.findUser(user_name).subscribe((res) => {
        expect(res).toEqual(mockResponse);
      });
  
      const req = httpMock.expectOne(environment.API_URL + 'user/find?username=' + user_name);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });
});
