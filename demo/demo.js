(function (window, ElementPagination, undefined) {

  var p1 = new ElementPagination(document.querySelector('.example-1__image-list'));

  var prevPageBtn = document.querySelector('.example-1__controls .prev-page');
  prevPageBtn.style.display = 'none';

  var nextPageBtn = document.querySelector('.example-1__controls .next-page');

  prevPageBtn.addEventListener('click', function () {
    p1.previousPage();
  });

  nextPageBtn.addEventListener('click', function () {
    p1.nextPage();
  });

  p1.on('element-pagination-poc.paginationChanged', function () {
    console.log('p1 changed. Has previous page: %s. Has next page: %s', p1.hasPreviousPage, p1.hasNextPage);
    prevPageBtn.style.display = p1.hasPreviousPage ? '' : 'none';
    nextPageBtn.style.display = p1.hasNextPage ? '' : 'none';
  });

})(window, window.ElementPagination);
