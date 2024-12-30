import { TestBed } from '@angular/core/testing'

import { LoginService } from './login.service'
import { HttpClientTestingModule, HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing'
import { loginRequest } from '../model/class/loginRequest'
import { APIResponse } from '../model/interface/apiResponse'
import { environment } from '../../environments/environment.development'

describe('LoginService', () => {
  let service: LoginService
  let httpMock: HttpTestingController
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [HttpClientTestingModule],
      providers : [LoginService]
    })
    service = TestBed.inject(LoginService)
    httpMock = TestBed.inject(HttpTestingController)
  })
  afterEach(()=>{
    httpMock.verify()
  })
  it('should be created', () => {
    expect(service).toBeTruthy()
  })
  describe('login', () => {
    it('should send POST request with correct URL, body, and headers', () => {
      const mockRequest: loginRequest = { user_name: 'testUser', user_password: 'testPass' }
      const mockResponse: APIResponse = {
        code: 1000,
        result: { token: 'testToken', validate : true },
        message: '',
      }

      service.login(mockRequest).subscribe((res) => {
        expect(res).toEqual(mockResponse)
      })

      const req = httpMock.expectOne(environment.API_URL + 'login')
      expect(req.request.method).toBe('POST')
      expect(req.request.body).toEqual(mockRequest)
      expect(req.request.headers.get('Content-Type')).toBe('application/json')
      expect(req.request.withCredentials).toBeTrue() 
      req.flush(mockResponse)
    })
  })

  describe('saveToken', () => {
    it('should save token to localStorage', () => {
      const token = 'testAuthToken'
      spyOn(localStorage, 'setItem')

      service.saveToken(token)

      expect(localStorage.setItem).toHaveBeenCalledWith('authToken', token)
    })
  })
})
