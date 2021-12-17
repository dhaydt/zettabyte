Zettabyte Backend Technical Test

Route:

Get Article:  
  Method:     GET  
  Url:        http://localhost:3000/  
  Paginated : http://localhost:3000/?current=2&limit=1  

Sort Article: 
  Method: GET   
  Sort By : Title Asc =>
  Url     : http://localhost:3000/sort/?key=title&sortBy=1  
  Sort By : Title Desc =>
  Url     : http://localhost:3000/sort/?key=title&sortBy=-1  
  Sort By : Date Asc =>
  Url     : http://localhost:3000/sort/?key=date&sortBy=1  
  Sort By : Date Desc =>
  Url     : http://localhost:3000/sort/?key=date&sortBy=-1  

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

Filter title:  
  Method: GET  
  Url:    http://localhost:3000/find/:title  
  
Filter article:  
  Method: GET  
  Url:    http://localhost:3000/findArticle/:word  