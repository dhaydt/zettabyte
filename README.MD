Zettabyte Backend Technical Test

Route:

Get Article:
  Method:     GET  
  Url:        http://localhost:3000/  
  Paginated : http://localhost:3000/?current=2&limit=1  

Post Article:  
  Method: POST  
  Url:    http://localhost:3000/article  

Delete Article:  
  Method: DELETE  
  Url:    http://localhost:3000/article/:id  

Update Article:  
  Method: PUT  
  Url:    http://localhost:3000/article/:id  

Add Comment:  
  Method: POST  
  Url:    http://localhost:3000/article/:id/comment  

Find title:  
  Method: GET  
  Url:    http://localhost:3000/find/:title  
  
Find article:  
  Method: GET  
  Url:    http://localhost:3000/findArticle/:word  