import { HttpInterceptorFn } from '@angular/common/http';


export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const token = localStorage.getItem('authToken')
  const PUBLIC_ENDPOINT  = ["/login","news/search","/news/category"]

  const isPublicEndpoint = PUBLIC_ENDPOINT.some(ep => req.url.includes(ep) && (req.method == 'POST' || req.method == 'GET') )
  if(isPublicEndpoint){
    return next(req)
  }else{
    const authReq = token ? req.clone({
      setHeaders :{
        Authorization: `Bearer ${token}`
      }
    })
    :req
    return next(authReq);
  }
};
