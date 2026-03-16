self.addEventListener("install",e=>{
e.waitUntil(
caches.open("verb-app").then(cache=>{
return cache.addAll([
"/",
"/index.html",
"/app.js",
"/verbs.js"
])
})
)
})

self.addEventListener("fetch",e=>{
e.respondWith(
caches.match(e.request).then(res=>{
return res || fetch(e.request)
})
)
})