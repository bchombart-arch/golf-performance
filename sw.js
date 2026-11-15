var CACHE="golf-sg-2";
self.addEventListener("install",function(e){ e.waitUntil(caches.open(CACHE).then(function(c){ return c.addAll(["./","./index.html","./manifest.webmanifest","./icon-180.png"]); }).then(function(){ return self.skipWaiting(); })); });
self.addEventListener("activate",function(e){ e.waitUntil(self.clients.claim()); });
// réseau d'abord pour recevoir les mises à jour, cache en secours quand il n'y a pas de réseau
self.addEventListener("fetch",function(e){
  if(e.request.method!=="GET") return;
  e.respondWith(fetch(e.request).then(function(r){ var copy=r.clone(); caches.open(CACHE).then(function(c){ c.put(e.request,copy); }); return r; })
    .catch(function(){ return caches.match(e.request).then(function(m){ return m||caches.match("./index.html"); }); }));
});
