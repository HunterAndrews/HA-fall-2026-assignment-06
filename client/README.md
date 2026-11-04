## Basic structure for client README.md:

client/
├── src/
│   ├── components/
│   │   ├── Navbar.tsx ✅
│   │   ├── ArticleCard.tsx ✅
│   │   ├── ArticleForm.tsx ✅
│   │   ├── CommentList.tsx ✅
│   │   └── CommentForm.tsx ✅
│   ├── pages/
│   │   ├── ArticlesPage.tsx ✅
│   │   ├── ArticleDetailPage.tsx ✅
│   │   ├── CreateArticlePage.tsx ✅
│   │   └── EditArticlePage.tsx ✅
│   ├── App.tsx ✅
│   ├── main.tsx ✅
│   └── index.css ✅
├── index.html ✅
├── package.json ✅
└── vite.config.ts ✅

## Summary of changes

  1. Shared Types (types.ts)                                                                                                 
      • Created shared TypeScript definitions for Article (articleId, title, contents) and Comment (commentId, articleId,    
      body) to match the backend API schema.                                                                                 
  2. TypeScript & Build Configuration (tsconfig.json)                                                                        
      • Added tsconfig.json with "skipLibCheck": true, "jsx": "react-jsx", and "moduleResolution": "bundler".                
      • npm run build (tsc -b && vite build) now succeeds cleanly.                                                           
  3. Article Navigation & Routing                                                                                            
      • **ArticleCard.tsx:24-29**: Fixed detail link to navigate to /articles/${article.articleId} rather than               
      /articles/undefined.                                                                                                   
      • **CreateArticlePage.tsx:27-31**: Fixed post-creation redirect to /articles/${newArticle.articleId}.                  
      • **EditArticlePage.tsx:85-105**: Fixed the back link to /articles/${article.articleId} and set key={article.articleId}
      on the form.                                                                                                           
      • **ArticleDetailPage.tsx:190-200**: Fixed the "Edit Article" link to /articles/${article.articleId}/edit.             
      • **App.tsx:16-45**: Added route for /articles as well as a 404 fallback page.                                         
  4. Comments State & Inline Editing                                                                                         
      • **CommentList.tsx:38-80**:                                                                                           
          • Replaced all comment.id references with comment.commentId, fixing the bug where clicking "Edit" caused all       
          comments to switch to edit forms.                                                                                  
          • Submissions and deletions now send valid numeric IDs to PUT and DELETE.                                          
          • Made handleEditSubmit await completion before closing the inline editor.                                         
      • **CommentForm.tsx:24-45**:                                                                                           
          • Added async submission handling with disabled states (isSubmitting) to prevent duplicate submissions.            
          • Ensured textarea text is only cleared after a successful submission.                                             
      • **ArticleDetailPage.tsx:125-165**:                                                                                   
          • Updated comment list modification (map and filter) to check against comment.commentId.                           
          • Reset errors between operations to prevent stale error messages.                                                 
                                                                                                                             
  5. Search Input Polish (ArticlesPage.tsx:12-51)                                                                            
      • Added a 250ms debounce and an AbortController to cancel pending in-flight requests, preventing input flicker and race
      conditions when typing.                                                                                                
      • Fixed key={article.articleId} on article cards.                                                                      
  6. Styles & Assets                                                                                                         
      • **index.css:251-289**: Added styling for .article-btn-edit, .article-btn-delete, and disabled button states          
      (button:disabled).
      • **vite.svg**: Created favicon in client/public/ to eliminate browser 404 errors.
      • **package.json:20**: Moved @vitejs/plugin-react to devDependencies.