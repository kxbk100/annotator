var plugin = {
  params: {
    theme: 'ios',
    root: '#app',
  }
};
if (Framework7.use) Framework7.use(plugin);
else if (Framework7.Class && Framework7.Class.use) Framework7.Class.use(plugin);
var app = new Framework7({
  // App root element
  root: '#app',
  // App Name
  name: 'My App',
  // App id
  id: 'com.myapp.test',
  // Enable swipe panel
  panel: {
    swipe: 'left',
  },
  // Add default routes
  routes: [
    {
      name: 'about',
      path: '/about/',
      url: 'about.html',
    },
  ],
  // ... other parameters
});
var mainView = app.views.create('.view-main');
var $$ = Dom7;

//搜索栏
var searchbar = app.searchbar.create({
  el: '.searchbar',
  searchContainer: '.list',
  searchIn: '.item-title',
  on: {
    search(sb, query, previousQuery) {
      console.log(query, previousQuery);
    }
  }
});

//无限下拉滚动
// Loading flag
var allowInfinite = true;

// Last loaded index
var lastItemIndex = $$('.list div').length;

// Max items to load
var maxItems = 240;

// Append items per load
var itemsPerLoad = 12;

// Attach 'infinite' event handler
$$('.infinite-scroll-content').on('infinite', function () {
  // Exit, if loading in progress
  if (!allowInfinite) return;

  // Set loading flag
  allowInfinite = false;

  // Emulate 1s loading
  setTimeout(function () {
    // Reset loading flag
    allowInfinite = true;

    if (lastItemIndex >= maxItems) {
      // Nothing more to load, detach infinite scroll events to prevent unnecessary loadings
      app.infiniteScroll.destroy('.infinite-scroll-content');
      // Remove preloader
      $$('.infinite-scroll-preloader').remove();
      return;
    }

    // Generate new items HTML
    var html = '';
    for (var i = lastItemIndex + 1; i <= lastItemIndex + itemsPerLoad; i++) {
      html += 
        '<div class="card demo-card-header-pic">'+
          '<div style="background-image:url(images/timg.jpg)" class="card-header align-items-flex-end">Lorem Ipsum</div>'+
          '<div class="card-content card-content-padding">'+
            '<p class="date">Posted on January 21, 2015</p>'+
            '<p>Quisque eget vestibulum nulla. Quisque quis dui quis ex ultricies efficitur vitae non felis. Phasellus quis nibh hendrerit...</p>'+
          '</div>'+
          '<div class="card-footer"><a href="#" class="link">Like</a><a href="#" class="link">Read more</a></div>'+
        '</div>'
        ;
    }

    // Append new items
    $$('.list ul').append(html);

    // Update last loaded index
    lastItemIndex = $$('.list div').length;
  }, 0);
});