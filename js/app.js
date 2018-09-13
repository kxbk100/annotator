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
  name: '云批',
  // App id
  id: 'com.myapp.test',
  // Enable swipe panel
  panel: {
    swipe: 'left',
  },
  // Add default routes
  routes: [
    {
      path: '/annotator/index/',
      url: '/annotator/index.html',
    },
  ],
  // ... other parameters
  dialog: {
    buttonOk: '确定',
    buttonCancel: '取消',
  },
  picker: {
    toolbarCloseText: '完成'
  },
  calendar: {
    toolbarCloseText: '完成'
  },
  popup: {
    closeByBackdropClick: false,
  }
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

}
);

//下拉刷新
var $ptrContent = $$('.ptr-content');
// Add 'refresh' listener on it
$ptrContent.on('ptr:refresh', function (e) {
  // Emulate 2s loading
  setTimeout(function () {
    index();
    if($$("ul[class=rank]").html() != ""){
      rank();
    }
    app.ptr.done(); // or e.detail();
  }, 300);
});

//打分评语
var pickerDescribe = app.picker.create({
  inputEl: '#demo-picker-describe',
  rotateEffect: true,
  cols: [{
    textAlign: 'left',
    values: ('A B C D').split(' ')
  },
  ]
});

var calendarModal = app.calendar.create({
  inputEl: '#demo-calendar-modal',
  openIn: 'customModal',
  dateFormat: 'yyyy-MM-dd',
});

