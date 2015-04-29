import {EventEmitter} from 'events';

const CHANGE_EVENT = 'element-pagination-poc.paginationChanged';

export default class Pagination extends EventEmitter {

  constructor(element) {
    super();

    this.element = element;

    this.state = {
      page: 0,
      active: false
    };

    var debouncedUpdatePagination = this._debouncedUpdatePagination = rAFDebounce(updatePagination.bind(this));

    debouncedUpdatePagination();

    window.addEventListener('resize', debouncedUpdatePagination);

    // TODO: revisit this
    // window.addEventListener('load', updatePagination.bind(this));
  }

  destroy() {
    // TODO
    window.removeEventListener('resize', this._debouncedUpdatePagination);
  }

  nextPage() {
    this.changePage(+1);
  }

  previousPage() {
    this.changePage(-1);
  }

  changePage(increment) {
    setPage.call(this, this.state.page + increment);
  }

  get hasPreviousPage() {
    return this.state.hasPrev;
  }

  get hasNextPage() {
    return this.state.hasNext;
  }

}

function emitChange() {
  this.emit(CHANGE_EVENT);
}

function rAFDebounce(callback) {
  var queueArgs, isQueued, queueCallback;

  return () => {
    queueArgs = arguments;
    queueCallback = callback;

    if (!isQueued) {
      isQueued = true;
      requestAnimationFrame(() => {
        queueCallback.apply(this, queueArgs);
        isQueued = false;
      });
    }
  };
}

function updatePagination() {
  var state = this.state;
  var element = this.element;

  if (!element.offsetParent) {
    waitForVisible();
    return;
  }

  var children = element.children;

  disablePagination();

  var sizeData = state.elementData = calculateElementData.call(this);
  var needPagination = state.active = sizeData.pages.length > 1;

  console.log('sizeData:', sizeData);
  console.log('needPagination:', needPagination);

  if (needPagination) {
    enablePagination();
  }

  function enablePagination() {
    element.style.width = '99999px';

    sizeData.elements.forEach((element) => {
      element.element.style['margin-left'] = element.filler + 'px';
    });

    // TODO: set page
  }

  function disablePagination() {
    element.style.width = '';

    for (var i = 0, l = children.length; i < l; i++) {
      children[i].style.width = '';
      children[i].style['margin-left'] = '';
    }

    state.page = null;
    state.active = false;
  }

  function waitForVisible() {
    // TODO
  }
}

function slideElements(x) {
  // TODO: vendor-specific style properties
  this.element.style.transform = 'translate3d(' + x + 'px,0,0)';
}

function calculateElementData(noAdjust) {
  var element = this.element;
  var children = this.element.children;
  var clientWidth = element.parentElement.offsetWidth;
  var elementsWidth = clientWidth;
  // var elementsWidth = clientWidth - {paginator controls width} - 1;
  var totalWidth = 0;
  var max = 0;
  var elementData = [];
  var pages = [];
  var currentPage;

  console.log('clientWidth:', clientWidth);
  console.log('elementsWidth:', elementsWidth);

  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var childWidth = Math.min(elementsWidth, child.offsetWidth);

    console.log('[%d] childWidth:', i, childWidth);

    var data = {
      element: child,
      left: totalWidth,
      width: childWidth,
      right: totalWidth + childWidth,
      filler: 0
    };

    data.page = Math.ceil(data.right / clientWidth) - 1;

    console.log('data', data);

    if (data.page >= pages.length) {
      data.filler = (elementsWidth * data.page) - data.left;
      data.right += data.filler;
      data.left += data.filler;

      currentPage = {
        left: data.left,
        firstElementIndex: i,
        lastElementIndex: i,
        elements: [data]
      };

      pages.push(currentPage);
    } else {
      currentPage.lastElementIndex = i;
      currentPage.elements.push(data);
    }

    totalWidth = data.right;
    max = Math.max(max, childWidth);
    elementData.push(data);
  }

  return {
    width: totalWidth,
    max: max,
    pages: pages,
    elements: elementData
  };
}

function setPage(page) {
  var state = this.state;

  if (page === state.page) return;

  var lastPage = state.elementData.pages.length - 1;

  if (page < 0) page = 0;
  if (page > lastPage) page = lastPage;

  state.hasPrev = page > 0;
  state.hasNext = page < lastPage;

  state.page = page;

  emitChange.call(this);

  return slideElements.call(this, -state.elementData.pages[page].left);
}
