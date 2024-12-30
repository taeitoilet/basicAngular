import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComponent } from './user.component';
import { provideRouter } from '@angular/router';
import { UserService } from '../services/user.service';
import { RoleService } from '../services/role.service';
import { APIResponse } from '../model/interface/apiResponse';
import { role } from '../model/class/role';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { userUpdateRequest } from '../model/class/user';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let mockUserService : jasmine.SpyObj<UserService>
  let mockRoleService: jasmine.SpyObj<RoleService>;
  beforeEach(async () => {
    const spy = jasmine.createSpyObj('UserService', [
      'getAllUser',
      'createUser',
      'updateUser',
      'findUser',
    ]);
    const spy1 = jasmine.createSpyObj('RoleService', ['getAllRole']);
    
    spy.getAllUser.and.returnValue(of({
      code: 1000,
      result: [{ user_id: 1, user_name : 'abc', user_password : '', role}],
      message : ''
    }))
    spy1.getAllRole.and.returnValue(of({
      code: 1000,
      result: [{ role_id : 1, role_name : 'Admin'}],
      message : ''
    }))

    await TestBed.configureTestingModule({
      imports: [UserComponent, FormsModule,CommonModule],
      providers: [
        { provide: UserService, useValue: spy },
        { provide: RoleService, useValue: spy1 },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    mockUserService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>
    mockRoleService = TestBed.inject(RoleService) as jasmine.SpyObj<RoleService>
  });
  describe("getAllUser",()=>{
    it('should return user list', () => {
      const role : role = {role_id : 1, role_name : 'Admin'}
      const mockResponse : APIResponse = {
        code: 1000,
        result: [{ user_id: 1, user_name : 'abc', user_password : '', role}],
        message : ''
      };
      mockUserService.getAllUser.and.returnValue(of(mockResponse));
      
      component.getAllUser();
  
      expect(mockUserService.getAllUser).toHaveBeenCalled();
      expect(component.userList).toEqual(mockResponse.result);
    });
  
  })
  describe('onSave',()=>{
   it('should create user on success ',()=>{
    const mockResponse: APIResponse = { code: 1000, result: {user_id: 1, user_name : 'abc', user_password : '', role},message : '' };
    mockUserService.createUser.and.returnValue(of(mockResponse));

    component.onSave();

    expect(mockUserService.createUser).toHaveBeenCalledWith(component.userCreateRequest);

   })
   it('should create user on failure ',()=>{
    const mockResponse: APIResponse = { code: 2000, result: null,message : 'Error' };
    mockUserService.createUser.and.returnValue(of(mockResponse));
    spyOn(window,"alert")
    component.onSave();

    expect(mockUserService.createUser).toHaveBeenCalledWith(component.userCreateRequest);
    expect(window.alert).toHaveBeenCalledWith('Error')
   })
  })
  describe('onUpdate',()=>{
    it('should update a user successfully', () => {
      const mockResponse: APIResponse = { code: 1000,
        result:  {
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
          user_money: 500,},
        message :'' };
      mockUserService.updateUser.and.returnValue(of(mockResponse));
  
      const mockUserUpdateRequest: userUpdateRequest = {
        role_id: 1,
        user_password: '123456',
        user_fullname: 'Jane Doe',
        user_email: 'jane.doe@example.com',
        user_phone: '1234567890',
        user_address: '123 Main St',
        user_citizen_identification: '123456789',
        user_dob: '1990-01-01',
        user_money: 500,
      };
      component.userUpdateRequset = mockUserUpdateRequest
      spyOn(window,'alert')
      component.onUpdate(1);
  
      expect(mockUserService.updateUser).toHaveBeenCalledWith(component.userUpdateRequset, 1);
      expect(window.alert).toHaveBeenCalledWith('Update successfull')
    });
    it('should update a user on failure',()=>{
      const mockResponse: APIResponse = { code: 2000, result: null, message: 'Error' };
      mockUserService.updateUser.and.returnValue(of(mockResponse));
      spyOn(window,'alert')
      component.onUpdate(1);
      expect(window.alert).toHaveBeenCalledWith('Error')

    })
  
  })
  describe("onSearch",()=>{
    it('should search return user by username', () => {
      const mockResponse: APIResponse = {
        code: 1000,
        result: [{ user_id: 1, user_name: 'John Doe' }],
        message : ''
      };
      mockUserService.findUser.and.returnValue(of(mockResponse));
  
      component.onSearch('John Doe');
      expect(component.userList).toEqual(mockResponse.result);
    });
    it('should search return null', () => {
      const mockResponse: APIResponse = {
        code: 1000,
        result: null,
        message : ''
      };
      mockUserService.findUser.and.returnValue(of(mockResponse));
      spyOn(window,"alert")
      component.onSearch('abc');
      expect(window.alert).toHaveBeenCalledWith('User not found')

    });
  })
});
