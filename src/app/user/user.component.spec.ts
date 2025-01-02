import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserComponent} from './user.component';
import {UserService} from '../services/user.service';
import {RoleService} from '../services/role.service';
import {APIResponse} from '../model/interface/apiResponse';
import {Role} from '../model/class/role';
import {of} from 'rxjs';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {User, UserCreateRequest, UserUpdateRequest} from '../model/class/user';

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
      result: [{ user_id: 1, user_name : 'abc', user_password : '', role: Role}],
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
      const role : Role = {role_id : 1, role_name : 'Admin'}
      const mockResponse : APIResponse = {
        code: 1000,
        result: [{ user_id: 1, user_name : 'abc', user_password : '', role,user_status:'actived' }],
        message : ''
      };
      mockUserService.getAllUser.and.returnValue(of(mockResponse));

      component.getAllUser();
      expect(mockUserService.getAllUser).toHaveBeenCalled();
    });

  })
  describe('onSave',()=>{
   it('should create user on success ',()=>{
     const role :Role = {role_id : 1, role_name : 'Admin'};
    const mockResponse: APIResponse = { code: 1000, result: {user_id: 1, user_name : 'abc', user_password : '', role,user_money :0,user_status:'',user_address:'',user_email:'',user_fullname:'',user_phone:'',user_dob:'',user_citizen_identification:''},message : '' };
    const mockFormCreate  = { role_name : '',user_name : 'abcd', user_password : '12345678', role_id :1,user_address:'abc',user_email:'abc@xyz.com',user_fullname:'abc',user_phone:'0378932206',user_dob:'abc',user_citizen_identification:'123456789123'}

    mockUserService.createUser.and.returnValue(of(mockResponse));
    component.userCreateForm.setValue(mockFormCreate)
    component.onSave();
    expect(mockUserService.createUser).toHaveBeenCalledWith(component.userCreateRequest);
   })
   it('should create user on failure ',()=>{
    const mockResponse: APIResponse = { code: 2000, result: null,message : 'Error' };
     const mockFormCreate  = { role_name : '',user_name : 'abcd', user_password : '12345678', role_id :1,user_address:'abc',user_email:'abc@xyz.com',user_fullname:'abc',user_phone:'0378932206',user_dob:'abc',user_citizen_identification:'123456789123'}
    mockUserService.createUser.and.returnValue(of(mockResponse));
     component.userCreateForm.setValue(mockFormCreate)

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
          role: Role,
          user_fullname: 'Jane Doe',
          user_email: 'jane.doe@example.com',
          user_phone: '1234567890',
          user_address: '123 Main St',
          user_citizen_identification: '123456789',
          user_dob: '1990-01-01',
          user_money: 500,},
        message :'' };
      mockUserService.updateUser.and.returnValue(of(mockResponse));
      const mockFormUpdate  = { role_name : '', user_password : '12345678', role_id :1,user_address:'abc',user_email:'abc@xyz.com',user_fullname:'abc',user_phone:'0378932206',user_dob:'abc',user_citizen_identification:'123456789123'}
      component.userUpdateForm.setValue(mockFormUpdate)
      spyOn(window,'alert')
      component.onUpdate(1);

      expect(mockUserService.updateUser).toHaveBeenCalledWith(component.userUpdateRequset,1);
      expect(window.alert).toHaveBeenCalledWith('Update successfull')
    });
    it('should update a user on failure',()=>{
      const mockResponse: APIResponse = { code: 2000, result: null, message: 'Error' };
      const mockFormUpdate  = { role_name : '', user_password : '12345678', role_id :1,user_address:'abc',user_email:'abc@xyz.com',user_fullname:'abc',user_phone:'0378932206',user_dob:'abc',user_citizen_identification:'123456789123'}
      component.userUpdateForm.setValue(mockFormUpdate)
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
